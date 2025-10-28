import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Umbrella, Eye, EyeOff, Lock, Mail, User, LogIn, UserPlus } from 'lucide-react';

const COLORS = {
  primary: '#d72b1b',
  dark: '#202125',
  light: '#f2f3f5',
  primaryLight: '#e74c3c',
  primaryDark: '#c0392b',
  darkLight: '#2c2e33',
};

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onLogin();
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center gap-3">
            <div
              className="p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Umbrella className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-white text-3xl font-bold leading-tight">Rainco CRM</h1>
              <p className="text-white/80 text-sm">shop.rainco.lk</p>
            </div>
          </div>
          <p className="text-white/60 text-sm tracking-wide">
            Customer Relationship Management Platform
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md">
          <CardHeader className="text-center pb-4 space-y-1">
            <CardTitle className="text-2xl text-gray-900 font-semibold">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-gray-500">
              {activeTab === 'login'
                ? 'Sign in to access your CRM dashboard'
                : 'Join Rainco CRM to manage your customers'}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Tabs */}
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg mb-5">
                <TabsTrigger
                  value="login"
                  onClick={() => handleTabClick('login')}
                  className={`transition-all duration-200 font-medium rounded-md flex items-center justify-center gap-2 py-2.5 ${
                    activeTab === 'login' ? 'shadow-md' : 'border border-transparent'
                  }`}
                  style={{
                    backgroundColor: activeTab === 'login' ? COLORS.primary : 'transparent',
                    color: activeTab === 'login' ? '#fff' : '#374151',
                  }}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </TabsTrigger>

                <TabsTrigger
                  value="signup"
                  onClick={() => handleTabClick('signup')}
                  className={`transition-all duration-200 font-medium rounded-md flex items-center justify-center gap-2 py-2.5 ${
                    activeTab === 'signup' ? 'shadow-md' : 'border border-transparent'
                  }`}
                  style={{
                    backgroundColor: activeTab === 'signup' ? '#16a34a' : 'transparent',
                    color: activeTab === 'signup' ? '#fff' : '#374151',
                  }}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login" className="space-y-4">
                <div className="flex items-center gap-2 mb-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <LogIn className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-blue-700">Sign in to your existing account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@rainco.lk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-gray-700 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked: boolean | "indeterminate") => setRememberMe(Boolean(checked))}
                      />
                      <label htmlFor="remember" className="text-gray-600 cursor-pointer">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-sm hover:underline"
                      style={{ color: COLORS.primary }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 text-base font-medium shadow-sm hover:shadow-md transition-all"
                    style={{
                      backgroundColor: isSubmitting ? COLORS.primaryDark : COLORS.primary,
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing In...
                      </div>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>

                {/* Demo Buttons */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Demo Access</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleDemoLogin('admin@rainco.lk', 'demo123')}
                  >
                    Admin
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDemoLogin('support@rainco.lk', 'demo123')}
                  >
                    Support
                  </Button>
                </div>
              </TabsContent>

              {/* Signup Form */}
              <TabsContent value="signup" className="space-y-4">
                <div className="flex items-center gap-2 mb-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <UserPlus className="h-4 w-4 text-green-600" />
                  <p className="text-sm text-green-700">Create a new account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="signup-name" className="flex items-center gap-2 text-gray-700">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input id="signup-name" type="text" placeholder="John Doe" required />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-email" className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input id="signup-email" type="email" placeholder="your.email@rainco.lk" required />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-password" className="flex items-center gap-2 text-gray-700">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <Input id="signup-password" type="password" placeholder="••••••••" required />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-confirm" className="flex items-center gap-2 text-gray-700">
                      <Lock className="h-4 w-4" />
                      Confirm Password
                    </Label>
                    <Input id="signup-confirm" type="password" placeholder="••••••••" required />
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <button
                        type="button"
                        className="hover:underline"
                        style={{ color: COLORS.primary }}
                      >
                        Terms & Conditions
                      </button>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 text-base font-medium shadow-sm hover:shadow-md transition-all"
                    style={{
                      backgroundColor: isSubmitting ? COLORS.primaryDark : COLORS.primary,
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-white/70 text-sm mt-4">
          © 2025 Rainco. All rights reserved. shop.rainco.lk
        </p>
      </div>
    </div>
  );
}
