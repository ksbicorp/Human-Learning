import { useState } from "react";
import { Brain, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

const Analyze = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Mock data - will be replaced with actual analysis
  const mockProfile = {
    style: "Technical & Detailed",
    complexity: "High",
    preferredFormat: "Structured explanations with examples",
    keyTraits: [
      "Prefers code examples",
      "Values step-by-step breakdowns",
      "Appreciates technical depth",
      "Responds well to analogies"
    ]
  };

  const mockPrompt = `You are communicating with someone who has the following learning profile:

- **Communication Style**: Technical and detailed
- **Complexity Level**: High - comfortable with advanced concepts
- **Preferred Format**: Structured explanations with practical examples

**Key Traits**:
- Appreciates code examples and hands-on demonstrations
- Values step-by-step breakdowns of complex topics
- Responds well to technical depth and precision
- Benefits from analogies that connect new concepts to familiar ones

Please adapt your responses to match this learning profile. Provide detailed technical explanations with concrete examples, break down complex ideas into logical steps, and use analogies when introducing new concepts.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mockPrompt);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Your personalized prompt is ready to use",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-5xl font-black mb-4 gradient-text">
              Your Learning Profile
            </h1>
            <p className="text-xl text-muted-foreground">
              AI-generated insights based on your conversation patterns
            </p>
          </div>

          <div className="grid gap-8 mb-8">
            <Card className="glass-card border-2 border-primary/30 glow-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  Profile Overview
                </CardTitle>
                <CardDescription className="text-base">
                  How you naturally communicate and learn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 hover:scale-105 transition-smooth backdrop-blur-xl">
                    <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Style</p>
                    <p className="font-bold text-lg">{mockProfile.style}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-info/20 to-info/10 border-2 border-info/30 hover:scale-105 transition-smooth backdrop-blur-xl">
                    <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Complexity</p>
                    <p className="font-bold text-lg">{mockProfile.complexity}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 border-2 border-success/30 hover:scale-105 transition-smooth backdrop-blur-xl">
                    <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Format</p>
                    <p className="font-bold text-lg">{mockProfile.preferredFormat}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Key Learning Traits
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {mockProfile.keyTraits.map((trait, index) => (
                      <Badge 
                        key={index} 
                        className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-secondary/20 to-accent/20 border-2 border-secondary/30 hover:scale-110 transition-smooth backdrop-blur-xl"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-2 border-accent/30 glow-accent">
              <CardHeader>
                <CardTitle className="text-2xl">Personalized Prompt</CardTitle>
                <CardDescription className="text-base">
                  Use this as a system prompt when chatting with AI models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative group">
                  <pre className="bg-muted/30 p-6 rounded-2xl overflow-x-auto text-sm border-2 border-accent/30 backdrop-blur-xl leading-relaxed">
                    {mockPrompt}
                  </pre>
                  <Button
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 bg-gradient-to-r from-accent to-info hover:from-accent/90 hover:to-info/90 text-white glow-accent rounded-xl"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Prompt
                      </>
                    )}
                  </Button>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-info/20 to-info/10 border-2 border-info/30 backdrop-blur-xl">
                  <p className="text-sm leading-relaxed">
                    <strong className="text-base">How to use:</strong> Copy this prompt and paste it as a "system message" or 
                    "custom instruction" in your AI chat interface. This will help the AI tailor its 
                    responses to your unique learning style.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analyze;
