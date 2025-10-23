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
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-8 glow-primary backdrop-blur-xl animate-fade-in-down opacity-0">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI-Powered Learning Analysis
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[1.1] animate-fade-in-up opacity-0 animation-delay-100">
            Discover Your{" "}
            <span className="relative inline-block">
              <span className="gradient-text animate-pulse-glow">
                Unique Learning
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur-2xl opacity-30 -z-10" />
            </span>
            {" "}Profile
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up opacity-0 animation-delay-200">
            Just like AI models are trained with specific formats like ChatML, humans have unique 
            ways of understanding information. Human Learning analyzes your AI conversations to 
            create personalized communication profiles.
          </p>

          <div className="flex flex-wrap gap-5 justify-center animate-fade-in-up opacity-0 animation-delay-300">
            <Link to="/upload">
              <Button 
                size="lg" 
                className="relative bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg rounded-2xl glow-primary group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 blur-xl opacity-0 group-hover:opacity-100 transition-smooth" />
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-smooth" />
                </span>
              </Button>
            </Link>
            <Link to="/analyze">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-accent/40 hover:bg-accent/20 hover:border-accent/60 px-8 py-6 text-lg rounded-2xl backdrop-blur-xl group"
              >
                <span className="flex items-center gap-2">
                  View Demo
                  <Sparkles className="w-4 h-4 text-accent group-hover:scale-110 transition-smooth" />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const glowColors = [
              'glow-primary',
              'glow-secondary', 
              'glow-accent',
              'glow-primary'
            ];
            return (
              <Card 
                key={index} 
                className={`glass-card hover:scale-105 transition-smooth group cursor-pointer relative overflow-hidden border border-primary/10 hover:border-primary/30 animate-scale-in opacity-0 animation-delay-${(index + 4) * 100}`}
              >
                <div className={`absolute inset-0 ${glowColors[index]} opacity-0 group-hover:opacity-100 transition-smooth -z-10`} />
                <CardHeader className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mb-5 group-hover:scale-125 transition-smooth backdrop-blur-xl border border-primary/30">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text animate-fade-in-up opacity-0">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "1",
                title: "Upload Your Data",
                description: "Export and upload your chat conversations from any AI platform",
                gradient: "from-primary to-secondary",
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our AI analyzes your communication patterns and learning style",
                gradient: "from-secondary to-accent",
              },
              {
                step: "3",
                title: "Get Your Profile",
                description: "Receive a personalized prompt to use with any AI assistant",
                gradient: "from-accent to-primary",
              },
            ].map((item, index) => (
              <div key={item.step} className={`text-center group animate-fade-in-up opacity-0 animation-delay-${(index + 2) * 100}`}>
                <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 text-3xl font-black text-white animate-glow-pulse group-hover:scale-125 transition-smooth`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                  <span className="relative z-10">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 right-0 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform translate-x-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
