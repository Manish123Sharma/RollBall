import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const { login, register } = useApp();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error('Please fill in all fields');
      return;
    }
    login(loginForm.email, loginForm.password);
    toast.success('Login successful!');
    navigate('/onboarding');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.phone || !registerForm.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!registerForm.agreeToTerms) {
      toast.error('Please agree to Terms & Conditions');
      return;
    }
    register(registerForm.name, registerForm.email, registerForm.phone, registerForm.password);
    toast.success('Registration successful!');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0066CC] to-[#1A73E8] p-12 flex-col justify-center items-center text-white">
        <div className="max-w-md space-y-8">
          <div className="flex justify-center">
            <Shield className="w-24 h-24" />
          </div>
          <h1 className="text-4xl font-bold text-center">Verify Your Documents Securely</h1>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Secure</h3>
                <p className="text-sm text-white/90">Your data is encrypted end-to-end</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Government Approved</h3>
                <p className="text-sm text-white/90">Compliant with Indian regulations</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Fast Verification</h3>
                <p className="text-sm text-white/90">Get verified within 24-48 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-[#0066CC]" />
            </div>
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>Secure document verification platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email / Phone</Label>
                    <Input
                      id="login-email"
                      type="text"
                      placeholder="Enter your email or phone"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-[#0066CC] hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <Button type="submit" className="w-full bg-[#0066CC] hover:bg-[#0052A3]">
                    Login
                  </Button>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">OR</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      className="text-[#0066CC] hover:underline"
                      onClick={() => setActiveTab('register')}
                    >
                      Register
                    </button>
                  </p>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Input className="w-16" value="+91" disabled />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="Phone number"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="register-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, confirmPassword: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={registerForm.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setRegisterForm({ ...registerForm, agreeToTerms: checked as boolean })
                      }
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to{' '}
                      <a href="#" className="text-[#0066CC] hover:underline">
                        Terms & Conditions
                      </a>
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-[#0066CC] hover:bg-[#0052A3]">
                    Create Account
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="text-[#0066CC] hover:underline"
                      onClick={() => setActiveTab('login')}
                    >
                      Login
                    </button>
                  </p>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-center text-gray-500">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>{' '}
                •{' '}
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
