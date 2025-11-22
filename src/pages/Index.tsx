import { useState } from "react";
import { Brain, Upload, BarChart3, Sparkles, Copy, Check, ArrowRight, Zap, Shield, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { generativeModel } from "@/integrations/gemini/client";

interface Profile {
  learning_style: string;
  complexity_level: string;
  preferred_format: string;
  key_traits: string[];
}

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const features = [
    {
      icon: Upload,
      title: "Import Chat History",
      description: "Upload conversations from ChatGPT, Claude, and other AI platforms",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Powered by Gemini 3.0 Pro for advanced reasoning and deep pattern recognition",
    },
    {
      icon: BarChart3,
      title: "Learning Profile",
      description: "Discover your unique communication style and cognitive patterns",
    },
    {
      icon: Sparkles,
      title: "Personalized Prompts",
      description: "Get custom AI prompts optimized for how you learn best",
    },
  ];

  const geminiFeatures = [
    {
      icon: Zap,
      title: "Advanced Reasoning",
      description: "State-of-the-art thinking with Gemini 3.0 Pro's dynamic reasoning capabilities",
    },
    {
      icon: Shield,
      title: "1M Token Context",
      description: "Massive context window for comprehensive conversation analysis",
    },
    {
      icon: Code,
      title: "Structured Output",
      description: "Reliable JSON responses for consistent learning profile generation",
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/json" || selectedFile.name.endsWith(".txt")) {
        setFile(selectedFile);
        toast({
          title: "File selected",
          description: `${selectedFile.name} ready to analyze`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a JSON or TXT file",
          variant: "destructive",
        });
      }
    }
  };

  const analyzeChat = async () => {
    if (!file) return;

    setAnalyzing(true);
    try {
      const content = await file.text();
      const result = await generativeModel.generateContent(content);
      const response = await result.response;
      const text = await response.text();

      // NOTE: This assumes the Gemini API returns a JSON object with the expected structure.
      //       If the API returns a different structure, this will need to be adjusted.
      const { profile, personalized_prompt } = JSON.parse(text);

      setProfile(profile);
      setPrompt(personalized_prompt);

      toast({
        title: "Analysis complete!",
        description: "Your learning profile is ready",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-card border border-border mb-8 animate-fade-in-down opacity-0">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">
              POWERED BY GEMINI 3.0 PRO
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[1.1] animate-fade-in-up opacity-0 animation-delay-100 tracking-tighter">
            Discover Your{" "}
            <span className="relative inline-block border-b-4 border-primary">
              Unique Learning
            </span>
            {" "}Profile
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up opacity-0 animation-delay-200">
            Analyze your AI conversations with advanced reasoning capabilities to understand your unique learning patterns and communication style. Powered by Google's most intelligent AI model.
          </p>
        </div>

        {/* Upload Section */}
        {!profile && (
          <Card className="glass-card max-w-2xl mx-auto mb-16 animate-scale-in opacity-0 animation-delay-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tight">Upload Chat Data</CardTitle>
              <CardDescription>
                Upload your exported conversations from ChatGPT, Claude, or other AI platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative border-2 border-dashed border-border rounded-sm p-12 text-center hover:border-primary hover:bg-muted/50 transition-smooth cursor-pointer group">
                <input
                  type="file"
                  accept=".json,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {file ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-sm bg-card border border-border flex items-center justify-center">
                        <Check className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-sm bg-muted border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-smooth">
                        <Upload className="w-8 h-8 group-hover:text-primary-foreground transition-smooth" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-2">Click to upload</p>
                        <p className="text-sm text-muted-foreground">JSON or TXT files only</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {file && (
                <Button
                  onClick={analyzeChat}
                  disabled={analyzing}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg rounded-sm font-bold tracking-wide"
                  size="lg"
                >
                  {analyzing ? (
                    "ANALYZING..."
                  ) : (
                    <span className="flex items-center gap-2">
                      ANALYZE CHAT DATA
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {profile && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <Card className="glass-card border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold tracking-tight">
                  <div className="w-12 h-12 rounded-sm bg-muted border border-border flex items-center justify-center">
                    <Brain className="w-6 h-6" />
                  </div>
                  Your Learning Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-sm bg-muted border border-border hover:border-primary transition-smooth">
                    <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Style</p>
                    <p className="font-bold text-lg">{profile.learning_style}</p>
                  </div>
                  <div className="p-6 rounded-sm bg-muted border border-border hover:border-primary transition-smooth">
                    <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Complexity</p>
                    <p className="font-bold text-lg">{profile.complexity_level}</p>
                  </div>
                  <div className="p-6 rounded-sm bg-muted border border-border hover:border-primary transition-smooth">
                    <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Format</p>
                    <p className="font-bold text-lg">{profile.preferred_format}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Key Learning Traits
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {profile.key_traits.map((trait: string, index: number) => (
                      <Badge
                        key={index}
                        className="px-4 py-2 text-sm font-semibold rounded-sm bg-muted border border-border hover:border-primary hover:bg-card transition-smooth"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight">Personalized Prompt</CardTitle>
                <CardDescription>
                  Use this as a system prompt when chatting with AI models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <pre className="bg-muted p-6 rounded-sm overflow-x-auto text-sm border border-border leading-relaxed font-mono">
                    {prompt}
                  </pre>
                  <Button
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        COPIED
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        COPY
                      </>
                    )}
                  </Button>
                </div>

                <Button
                  onClick={() => {
                    setProfile(null);
                    setPrompt("");
                    setFile(null);
                  }}
                  variant="outline"
                  className="w-full border-2 border-border hover:bg-muted rounded-sm py-6 font-bold tracking-wide"
                >
                  ANALYZE ANOTHER FILE
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Grid - Only show when no results */}
        {!profile && (
          <>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className={`glass-card hover:border-primary transition-smooth group cursor-pointer relative overflow-hidden animate-scale-in opacity-0 animation-delay-${(index + 4) * 100}`}
                  >
                    <CardHeader className="relative z-10">
                      <div className="w-14 h-14 rounded-sm bg-muted flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth border border-border">
                        <Icon className="w-7 h-7" />
                      </div>
                      <CardTitle className="text-xl mb-3 font-bold tracking-tight">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {/* Gemini 3.0 Features Section */}
            <div className="max-w-5xl mx-auto mb-20">
              <h2 className="text-4xl font-bold text-center mb-4 tracking-tighter animate-fade-in-up opacity-0">GEMINI 3.0 PRO POWERED</h2>
              <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
                Experience the most advanced AI reasoning capabilities for unprecedented learning analysis
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {geminiFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card
                      key={index}
                      className="glass-card border border-border hover:border-primary transition-smooth group"
                    >
                      <CardHeader>
                        <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth border border-primary/20">
                          <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-smooth" />
                        </div>
                        <CardTitle className="text-lg mb-2 font-bold tracking-tight">{feature.title}</CardTitle>
                        <CardDescription className="text-sm">{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* How It Works */}
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 tracking-tighter animate-fade-in-up opacity-0">HOW IT WORKS</h2>
              <div className="grid md:grid-cols-3 gap-10">
                {[
                  {
                    step: "1",
                    title: "Upload Your Data",
                    description: "Export and upload your chat conversations from any AI platform",
                  },
                  {
                    step: "2",
                    title: "AI Analysis",
                    description: "Gemini 3.0 Pro analyzes your communication patterns with advanced reasoning",
                  },
                  {
                    step: "3",
                    title: "Get Your Profile",
                    description: "Receive a personalized prompt to use with any AI assistant",
                  },
                ].map((item, index) => (
                  <div key={item.step} className={`text-center group animate-fade-in-up opacity-0 animation-delay-${(index + 2) * 100}`}>
                    <div className="relative w-20 h-20 rounded-sm bg-card border-2 border-border flex items-center justify-center mx-auto mb-6 text-3xl font-black group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth">
                      <span className="relative z-10">{item.step}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 right-0 w-8 h-0.5 bg-border transform translate-x-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Human Learning
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI-powered learning profile analysis using Google's Gemini 3.0 Pro
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Technology</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Gemini 3.0 Pro Preview</li>
                  <li>• React & TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Vite Build Tool</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <a href="https://ai.google.dev/gemini-api/docs" className="hover:text-primary transition-colors">Gemini API Docs</a></li>
                  <li>• <a href="https://github.com/ksbicorp/Human-Learning" className="hover:text-primary transition-colors">GitHub Repository</a></li>
                  <li>• <a href="https://ai.google.dev/" className="hover:text-primary transition-colors">Get API Key</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>Built with ❤️ using Google Gemini 3.0 Pro • Open Source • MIT License</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;