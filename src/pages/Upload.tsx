import { useState } from "react";
import { Upload as UploadIcon, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/json" || selectedFile.name.endsWith(".txt")) {
        setFile(selectedFile);
        toast({
          title: "File selected",
          description: `${selectedFile.name} ready to upload`,
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

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    // Simulate upload - will be replaced with actual backend call
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Upload successful",
        description: "Your chat data has been processed",
      });
    }, 2000);
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <h1 className="text-5xl font-black mb-4 gradient-text">
              Upload Chat Data
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload your exported chat conversations from AI platforms (ChatGPT, Claude, etc.)
            </p>
          </div>

          <Card className="glass-card border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl">Select Chat Export</CardTitle>
              <CardDescription className="text-base">
                Supported formats: JSON, TXT
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="relative border-2 border-dashed border-primary/40 rounded-2xl p-16 text-center hover:border-primary hover:bg-primary/5 transition-smooth cursor-pointer group backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth" />
                <input
                  type="file"
                  accept=".json,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer relative z-10">
                  {file ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-success to-success/70 flex items-center justify-center glow-accent shadow-2xl">
                        <Check className="w-10 h-10 text-white" />
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
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary group-hover:scale-110 transition-smooth shadow-2xl">
                        <UploadIcon className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-2">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">
                          JSON or TXT files only
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {file && (
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-primary rounded-2xl py-7 text-lg font-bold"
                  size="lg"
                >
                  {uploading ? "Processing..." : "Analyze Chat Data"}
                </Button>
              )}

              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  How to export your chats
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>ChatGPT:</strong> Settings → Data Controls → Export Data</p>
                  <p><strong>Claude:</strong> Chat Settings → Export Conversations</p>
                  <p><strong>Other platforms:</strong> Look for "Export" or "Download" options in settings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Upload;
