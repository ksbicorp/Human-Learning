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
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Upload Chat Data
            </h1>
            <p className="text-muted-foreground">
              Upload your exported chat conversations from AI platforms (ChatGPT, Claude, etc.)
            </p>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Select Chat Export</CardTitle>
              <CardDescription>
                Supported formats: JSON, TXT
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-smooth cursor-pointer">
                <input
                  type="file"
                  accept=".json,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {file ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="w-8 h-8 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center glow">
                        <UploadIcon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Click to upload or drag and drop</p>
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
                  className="w-full bg-primary hover:bg-primary/90 glow"
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
