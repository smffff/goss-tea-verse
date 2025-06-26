import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useSecurityAudit } from '@/components/security/SecurityAuditProvider';
import { EnhancedAuthValidation } from '@/services/security/enhancedAuthValidation';
import AccessLevelIndicator from '../AccessLevelIndicator';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface EnhancedAuthTabProps {
  onAccessGranted: (level: 'guest' | 'authenticated' | 'beta' | 'admin') => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

const EnhancedAuthTab: React.FC<EnhancedAuthTabProps> = ({ 
  onAccessGranted, 
  isProcessing, 
  setIsProcessing, 
  error, 
  setError 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailValidation, setEmailValidation] = useState<any>(null);
  const [passwordValidation, setPasswordValidation] = useState<any>(null);
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();
  const { logSecurityEvent } = useSecurityAudit();

  const validateEmail = (emailValue: string) => {
    const validation = EnhancedAuthValidation.validateEmail(emailValue);
    setEmailValidation(validation);
    return validation.isValid;
  };

  const validatePassword = (passwordValue: string) => {
    const validation = EnhancedAuthValidation.validatePassword(passwordValue);
    setPasswordValidation(validation);
    return validation.isValid;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length > 3) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0) {
      validatePassword(value);
    }
  };

  const getErrorMessage = (error: string | { message: string } | null | undefined): string => {
    if (!error) return 'Unknown error occurred';
    if (typeof error === 'string') return error;
    if (typeof error === 'object' && error.message) return error.message;
    return 'Unknown error occurred';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      // Enhanced validation
      const emailValid = validateEmail(email);
      const sessionValid = EnhancedAuthValidation.validateAuthSession();

      if (!emailValid) {
        logSecurityEvent('login_invalid_email', { email: email.substring(0, 3) + '***' }, 'medium');
        setError('Please enter a valid email address');
        return;
      }

      if (!sessionValid.isValid) {
        logSecurityEvent('login_session_security_failure', sessionValid.threats, 'high');
        setError('Session security validation failed. Please refresh and try again.');
        return;
      }

      const result = await signIn(email, password);
      
      if (result.success) {
        logSecurityEvent('login_successful', { email: email.substring(0, 3) + '***' }, 'low');
        localStorage.setItem('ctea-access-level', 'authenticated');
        toast({
          title: "Welcome back! ☕",
          description: "You're now logged into CTea Newsroom",
        });
        onAccessGranted('authenticated');
      } else {
        logSecurityEvent('login_failed', { 
          email: email.substring(0, 3) + '***',
          error: getErrorMessage(result.error)
        }, 'medium');
        const errorMessage = getErrorMessage(result.error);
        setError(errorMessage);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      logSecurityEvent('login_system_error', { error: error.message }, 'high');
      setError('Login failed - system error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      // Enhanced validation
      const emailValid = validateEmail(email);
      const passwordValid = validatePassword(password);
      const sessionValid = EnhancedAuthValidation.validateAuthSession();

      if (!emailValid) {
        logSecurityEvent('signup_invalid_email', { 
          email: email.substring(0, 3) + '***',
          validation: emailValidation 
        }, 'medium');
        setError('Please enter a valid email address');
        return;
      }

      if (!passwordValid) {
        logSecurityEvent('signup_weak_password', { 
          email: email.substring(0, 3) + '***',
          passwordScore: passwordValidation?.score 
        }, 'medium');
        setError('Password does not meet security requirements');
        return;
      }

      if (!sessionValid.isValid) {
        logSecurityEvent('signup_session_security_failure', sessionValid.threats, 'high');
        setError('Session security validation failed. Please refresh and try again.');
        return;
      }

      const result = await signUp(email, password);
      
      if (result.success) {
        logSecurityEvent('signup_successful', { email: email.substring(0, 3) + '***' }, 'low');
        toast({
          title: "Account Created! 🎉",
          description: "Welcome to CTea! Check your email to verify your account.",
        });
        localStorage.setItem('ctea-access-level', 'authenticated');
        onAccessGranted('authenticated');
      } else {
        logSecurityEvent('signup_failed', { 
          email: email.substring(0, 3) + '***',
          error: getErrorMessage(result.error)
        }, 'medium');
        const errorMessage = getErrorMessage(result.error);
        setError(errorMessage);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      logSecurityEvent('signup_system_error', { error: error.message }, 'high');
      setError('Signup failed - system error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const getValidationIcon = (validation: any, isValid: boolean) => {
    if (!validation) return null;
    return isValid ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="space-y-4">
      <AccessLevelIndicator level="authenticated" />
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-ctea-darker/50">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-ctea-darker border-ctea-teal/30 text-white pr-10"
                  required
                />
                <div className="absolute right-3 top-3">
                  {getValidationIcon(emailValidation, emailValidation?.isValid)}
                </div>
              </div>
              
              {emailValidation && !emailValidation.isValid && (
                <div className="text-xs text-red-400 space-y-1">
                  {!emailValidation.format && <div>• Invalid email format</div>}
                  {emailValidation.disposable && <div>• Disposable email not allowed</div>}
                  {emailValidation.suspicious && <div>• Suspicious email pattern</div>}
                </div>
              )}

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-ctea-darker border-ctea-teal/30 text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isProcessing || (emailValidation && !emailValidation.isValid)}
              className="w-full bg-ctea-teal hover:bg-ctea-teal/80"
            >
              {isProcessing ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-ctea-darker border-ctea-teal/30 text-white pr-10"
                  required
                />
                <div className="absolute right-3 top-3">
                  {getValidationIcon(emailValidation, emailValidation?.isValid)}
                </div>
              </div>
              
              {emailValidation && !emailValidation.isValid && (
                <div className="text-xs text-red-400 space-y-1">
                  {!emailValidation.format && <div>• Invalid email format</div>}
                  {emailValidation.disposable && <div>• Disposable email not allowed</div>}
                  {emailValidation.suspicious && <div>• Suspicious email pattern</div>}
                </div>
              )}

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-ctea-darker border-ctea-teal/30 text-white pr-10"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordValidation && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-full h-2 rounded-full bg-gray-700`}>
                      <div 
                        className={`h-full rounded-full transition-all ${
                          passwordValidation.strength === 'strong' ? 'bg-green-500 w-full' :
                          passwordValidation.strength === 'good' ? 'bg-blue-500 w-3/4' :
                          passwordValidation.strength === 'fair' ? 'bg-yellow-500 w-1/2' :
                          'bg-red-500 w-1/4'
                        }`}
                      />
                    </div>
                    <span className={`text-xs ${
                      passwordValidation.strength === 'strong' ? 'text-green-500' :
                      passwordValidation.strength === 'good' ? 'text-blue-500' :
                      passwordValidation.strength === 'fair' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {passwordValidation.strength}
                    </span>
                  </div>
                  
                  {passwordValidation.feedback.length > 0 && (
                    <div className="text-xs text-gray-400 space-y-1">
                      {passwordValidation.feedback.map((feedback: string, index: number) => (
                        <div key={index}>• {feedback}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              disabled={isProcessing || (passwordValidation && !passwordValidation.isValid)}
              className="w-full bg-ctea-purple hover:bg-ctea-purple/80"
            >
              {isProcessing ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAuthTab;
