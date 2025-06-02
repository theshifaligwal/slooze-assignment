"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { RedirectHandler } from "@/components/redirect-handler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agreeToTerms: false,
  });

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <RedirectHandler />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) {
      clearError();
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign In
    console.log("Google Sign In clicked");
  };

  const handleFacebookSignIn = () => {
    // TODO: Implement Facebook Sign In
    console.log("Facebook Sign In clicked");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-black">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Sign Up For Free
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-600 dark:text-red-400">
                {error}
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full h-12 px-4 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black dark:text-white">
                Password
              </label>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full h-12 px-4 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700"
                required
              />
            </div>

            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Demo Credentials:
              </h4>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <div>
                  <strong>Manager:</strong> manager@slooze.com / manager123
                </div>
                <div>
                  <strong>Store Keeper:</strong> keeper@slooze.com / keeper123
                </div>
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeToTerms", checked as boolean)
                }
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
              />
              <label
                htmlFor="terms"
                className="text-sm text-black dark:text-white cursor-pointer"
              >
                I agree to all Term, Privacy Policy and fees
              </label>
            </div>

            {/* Get Started Button */}
            <Button
              type="submit"
              disabled={isLoading || !formData.agreeToTerms}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? "Signing in..." : "Get Started"}
            </Button>
          </form>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-black text-gray-500 dark:text-gray-400">
                OR
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full h-12 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg flex items-center justify-center space-x-3 transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google</span>
            </Button>

            <Button
              type="button"
              onClick={handleFacebookSignIn}
              className="w-full h-12 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg flex items-center justify-center space-x-3 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Sign in with Google</span>
            </Button>
          </div>

          {/* Already have account link */}
          <div className="text-center">
            <p className="text-sm text-black dark:text-white">
              Already have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - 3D Illustration */}
      <div className="flex-1 relative overflow-hidden">
        {/* Light Mode Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:hidden">
          {/* 3D Geometric Elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-96 h-96">
              {/* Main 3D Cube Stack */}
              <div className="absolute inset-0 transform rotate-12">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-2xl transform rotate-12 translate-x-8 translate-y-8 opacity-90"></div>
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-2xl transform -rotate-6 translate-x-24 translate-y-16 opacity-80"></div>
                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl shadow-2xl transform rotate-3 translate-x-16 translate-y-32 opacity-70"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute top-8 -right-16 w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-lg"></div>
            </div>
          </div>

          {/* Background Dots */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="absolute top-40 right-32 w-3 h-3 bg-purple-500 rounded-full"></div>
            <div className="absolute bottom-32 left-16 w-2 h-2 bg-pink-500 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-2 h-2 bg-indigo-500 rounded-full"></div>
          </div>
        </div>

        {/* Dark Mode Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 hidden dark:block">
          {/* 3D Geometric Elements for Dark Mode */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-96 h-96">
              {/* Main 3D Cube Stack - Dark Mode */}
              <div className="absolute inset-0 transform rotate-12">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl transform rotate-12 translate-x-8 translate-y-8 opacity-90 shadow-blue-500/25"></div>
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl transform -rotate-6 translate-x-24 translate-y-16 opacity-80 shadow-purple-500/25"></div>
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-2xl transform rotate-3 translate-x-16 translate-y-32 opacity-70 shadow-orange-500/25"></div>
              </div>

              {/* Floating Elements - Dark Mode */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/25 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-400/25 animate-bounce"></div>
              <div className="absolute top-8 -right-16 w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-lg shadow-indigo-400/25"></div>
            </div>
          </div>

          {/* Glowing Particles */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
            <div className="absolute bottom-32 left-16 w-2 h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"></div>
            <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          </div>

          {/* Animated Background Lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
