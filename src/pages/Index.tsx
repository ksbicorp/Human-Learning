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
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-card border border-border mb-8 animate-fade-in-down opacity-0">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">
              AI-POWERED LEARNING ANALYSIS
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
            Just like AI models are trained with specific formats like ChatML, humans have unique 
            ways of understanding information. Human Learning analyzes your AI conversations to 
            create personalized communication profiles.
          </p>

          <div className="flex flex-wrap gap-5 justify-center animate-fade-in-up opacity-0 animation-delay-300">
            <Link to="/upload">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-sm group"
              >
                <span className="flex items-center gap-2 font-bold tracking-wide">
                  GET STARTED
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-smooth" />
                </span>
              </Button>
            </Link>
            <Link to="/analyze">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-border hover:bg-muted px-8 py-6 text-lg rounded-sm group"
              >
                <span className="flex items-center gap-2 font-bold tracking-wide">
                  VIEW DEMO
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-smooth" />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
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
                description: "Our AI analyzes your communication patterns and learning style",
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
      </div>
    </>
  );
};

export default Index;
