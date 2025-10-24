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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border animate-fade-in-down">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group animate-slide-in-left">
            <div className="relative w-10 h-10 rounded-sm bg-card border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-smooth">
              <Brain className="w-6 h-6 group-hover:text-primary-foreground transition-smooth" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              HUMAN LEARNING
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
                    "flex items-center gap-2 px-4 py-2.5 rounded-sm transition-smooth relative overflow-hidden group",
                    isActive
                      ? "bg-primary text-primary-foreground border border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent hover:border-border"
                  )}
                >
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="hidden sm:inline relative z-10 font-medium tracking-wide">{item.label}</span>
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
