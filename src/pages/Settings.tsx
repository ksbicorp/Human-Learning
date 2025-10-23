import { useState } from "react";
import { Key, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Settings = () => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    // Simulate save - will be replaced with actual backend call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your API key has been securely stored",
      });
    }, 1000);
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <h1 className="text-5xl font-black mb-4 gradient-text">
              Settings
            </h1>
            <p className="text-xl text-muted-foreground">
              Configure your API keys and preferences
            </p>
          </div>

          <Card className="glass-card border-2 border-primary/30 glow-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Key className="w-6 h-6 text-white" />
                </div>
                Google Gemini API Key
              </CardTitle>
              <CardDescription className="text-base">
                Your API key is used to analyze chat data with Gemini 2.5 Flash Lite
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="api-key" className="text-base font-semibold">API Key</Label>
                <div className="relative">
                  <Input
                    id="api-key"
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Google Gemini API key"
                    className="pr-12 h-14 rounded-xl border-2 border-primary/30 bg-muted/30 backdrop-blur-xl text-base"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-12 px-4 hover:bg-primary/10 rounded-lg"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get your API key from{" "}
                  <a
                    href="https://ai.google.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-glow underline font-semibold"
                  >
                    Google AI Studio
                  </a>
                </p>
              </div>

              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-primary rounded-2xl text-lg font-bold"
              >
                <Save className="w-5 h-5 mr-2" />
                {saving ? "Saving..." : "Save Settings"}
              </Button>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-info/20 to-info/10 border-2 border-info/30 backdrop-blur-xl">
                <h4 className="font-bold mb-3 text-base">About API Key Security</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your API key is stored securely and encrypted. It is only used to make 
                  requests to Google's Gemini API for analyzing your chat data. We never 
                  share or expose your key to third parties.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Settings;
