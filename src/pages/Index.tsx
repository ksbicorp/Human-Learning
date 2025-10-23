import { Link } from "react-router-dom";
import { Brain, Upload, BarChart3, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Index = () => {
  const features = [
    {
      icon: Upload,
      title: "Import Chat History",
      description: "Upload conversations from ChatGPT, Claude, and other AI platforms",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Powered by Google Gemini 2.5 Flash Lite for deep pattern recognition",
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

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Learning Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Unique Learning
            </span>
            {" "}Profile
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Just like AI models are trained with specific formats like ChatML, humans have unique 
            ways of understanding information. Human Learning analyzes your AI conversations to 
            create personalized communication profiles.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="bg-primary hover:bg-primary/90 glow group">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
            <Link to="/analyze">
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="glass-card hover:glow transition-smooth group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Data",
                description: "Export and upload your chat conversations from any AI platform",
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our AI analyzes your communication patterns and learning style",
              },
              {
                step: "3",
                title: "Get Your Profile",
                description: "Receive a personalized prompt to use with any AI assistant",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary glow">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
