import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/cricket-stadium.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authApi.login({ email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('ndca_token', token);
      localStorage.setItem('ndca_user', JSON.stringify(user));
      
      setIsLoading(false);
      
      if (user.role === 'SUPER_ADMIN') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      setIsLoading(false);
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Image with heavy blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Background"
          className="w-full h-full object-cover scale-110 blur-xl opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/80 to-primary/20" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <Card className="w-full max-w-md z-10 glass border-white/10 shadow-2xl animate-fade-up">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 shadow-inner">
            <ShieldCheck className="text-primary w-6 h-6" />
          </div>
          <CardTitle className="text-3xl font-display font-extrabold uppercase tracking-tight text-foreground">
            NDCA Portal
          </CardTitle>
          <CardDescription className="text-muted-foreground uppercase text-[10px] tracking-[0.25em] font-bold">
            Cricket Management System
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-foreground/70">Username / Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-foreground/70">Password</Label>
                <a href="#" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
            </div>
            <Button 
                type="submit" 
                className="w-full mt-2 font-display uppercase tracking-widest font-bold h-11" 
                disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t border-white/5 pt-6 text-center">
            <p className="text-[10px] text-muted-foreground uppercase font-medium">
                Protected by NDCA Security Protocol v2.0
            </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
