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
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Your Learning Profile
            </h1>
            <p className="text-muted-foreground">
              AI-generated insights based on your conversation patterns
            </p>
          </div>

          <div className="grid gap-6 mb-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Profile Overview
                </CardTitle>
                <CardDescription>
                  How you naturally communicate and learn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Style</p>
                    <p className="font-semibold">{mockProfile.style}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                    <p className="text-sm text-muted-foreground mb-1">Complexity</p>
                    <p className="font-semibold">{mockProfile.complexity}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-sm text-muted-foreground mb-1">Format</p>
                    <p className="font-semibold">{mockProfile.preferredFormat}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Key Learning Traits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mockProfile.keyTraits.map((trait, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Personalized Prompt</CardTitle>
                <CardDescription>
                  Use this as a system prompt when chatting with AI models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm border border-border">
                    {mockPrompt}
                  </pre>
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    className="absolute top-2 right-2 bg-primary/20 hover:bg-primary/30"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                  <p className="text-sm">
                    <strong>How to use:</strong> Copy this prompt and paste it as a "system message" or 
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
