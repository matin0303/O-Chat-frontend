"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle, XCircle } from "lucide-react";
import { login as apiLogin, register as apiRegister } from "@/lib/auth";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { loadUser , setAccessToken } = useAuth();

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
  
    // Validation
    if (!email.trim()) {
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }
  
    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }
  
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
  
    if (!isLogin && password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
  
    try {
      if (isLogin) {
        // Login process
        const res = await apiLogin({ email, password });
        const access_token = res.refreshToken;
        await fetch("/next-api/auth/session", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token }),
        });
        setAccessToken(access_token)
        setSuccess("Login successful! Redirecting...");
        setEmail("");
        setPassword("");
        router.push('/chat');
        
  
      } else {
        // Registration process
        await apiRegister({ 
          email, 
          password,
        });
        
        setSuccess("Check your email for verification.");
        
        // Clear form
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
        // Switch to login mode after 3 seconds
        setTimeout(() => {
          setIsLogin(true);
          setSuccess(null);
        }, 3000);
      }
    } catch (err: any) {
      // Handle API errors
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
     

      {/* Main auth card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Glassmorphism container */}
        <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Floating orbs inside card */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-2"
            >
              <h1 className="text-white mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-white/60">
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Sign up to get started with your new account"}
              </p>
            </motion.div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-2"
            >
              <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <p className="text-green-300 text-sm">{success}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500/50 to-pink-500/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                <div className="flex items-center px-4 py-4 gap-3">
                  <Mail className="w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/50 to-purple-500/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                <div className="flex items-center px-4 py-4 gap-3">
                  <Lock className="w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-white/40 hover:text-white/80 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Password Input */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-500/50 to-purple-500/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center px-4 py-4 gap-3">
                      <Lock className="w-5 h-5 text-white/40" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-white/40 hover:text-white/80 transition-colors disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              disabled={isLoading}
              className="w-full relative group overflow-hidden rounded-2xl p-[2px] mt-6 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <div className="relative bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl px-6 py-4 flex items-center justify-center gap-2 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                    <span className="text-white">
                      {isLogin ? "Signing In..." : "Creating Account..."}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-white">
                      {isLogin ? "Sign In" : "Create Account"}
                    </span>
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Toggle between login/signup */}
          <div className="mt-8 text-center">
            <p className="text-white/60">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={handleToggleMode}
                disabled={isLoading}
                className="ml-2 text-white hover:text-purple-400 transition-colors underline decoration-purple-500/50 underline-offset-4 disabled:opacity-50"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Additional info for signup */}
          {!isLogin && (
            <div className="mt-6 p-3 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-orange-400 text-sm text-center">
                check your email for verification link after registration
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}