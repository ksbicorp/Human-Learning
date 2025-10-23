import { Link, useLocation } from "react-router-dom";
import { Brain, Upload, Settings, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Brain, label: "Dashboard" },
    { path: "/upload", icon: Upload, label: "Upload Data" },
    { path: "/analyze", icon: BarChart3, label: "Analyze" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/10 animate-fade-in-down">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group animate-slide-in-left">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow-pulse group-hover:scale-110 transition-smooth">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              Human Learning
            </span>
          </Link>

          <div className="flex items-center gap-2 animate-slide-in-right">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-smooth relative overflow-hidden group hover:scale-105",
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg animate-glow-pulse"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-primary/20"
                  )}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 blur-xl -z-10" />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="hidden sm:inline relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
