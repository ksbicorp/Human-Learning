import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { chatContent, fileName, fileSize } = await req.json();
    
    if (!chatContent) {
      return new Response(
        JSON.stringify({ error: 'Chat content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from auth
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing chat for user:', user.id);

    // Save chat history
    const { error: insertError } = await supabase
      .from('chat_histories')
      .insert({
        user_id: user.id,
        file_name: fileName,
        file_content: chatContent,
        file_size: fileSize,
      });

    if (insertError) {
      console.error('Error saving chat history:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save chat history' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call Lovable AI for analysis
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an AI learning style analyzer. Analyze the provided chat conversations and extract:
1. Learning Style (e.g., "Technical & Detailed", "Visual & Conceptual", "Practical & Example-Based")
2. Complexity Level (e.g., "High", "Medium", "Low")
3. Preferred Format (e.g., "Structured explanations with examples", "Step-by-step breakdowns", "Visual diagrams")
4. Key Traits (array of 4-6 specific learning characteristics)

Return ONLY a valid JSON object with this structure:
{
  "learning_style": "string",
  "complexity_level": "string",
  "preferred_format": "string",
  "key_traits": ["trait1", "trait2", "trait3", "trait4"]
}`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze these chat conversations:\n\n${chatContent.slice(0, 8000)}` }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error('AI analysis failed');
    }

    const aiData = await aiResponse.json();
    const analysisText = aiData.choices[0].message.content;
    
    console.log('AI Analysis result:', analysisText);

    // Parse AI response
    let analysis;
    try {
      // Try to extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI analysis' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate personalized prompt
    const personalizedPrompt = `You are communicating with someone who has the following learning profile:

- **Communication Style**: ${analysis.learning_style}
- **Complexity Level**: ${analysis.complexity_level}
- **Preferred Format**: ${analysis.preferred_format}

**Key Learning Traits**:
${analysis.key_traits.map((trait: string) => `- ${trait}`).join('\n')}

Please adapt your responses to match this learning profile. Tailor your explanations, examples, and communication style to align with how this person learns best.`;

    // Save or update user profile
    const { error: upsertError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        learning_style: analysis.learning_style,
        complexity_level: analysis.complexity_level,
        preferred_format: analysis.preferred_format,
        key_traits: analysis.key_traits,
        personalized_prompt: personalizedPrompt,
      }, {
        onConflict: 'user_id'
      });

    if (upsertError) {
      console.error('Error saving profile:', upsertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save analysis results' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        profile: {
          learning_style: analysis.learning_style,
          complexity_level: analysis.complexity_level,
          preferred_format: analysis.preferred_format,
          key_traits: analysis.key_traits,
        },
        personalized_prompt: personalizedPrompt,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-chat function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});