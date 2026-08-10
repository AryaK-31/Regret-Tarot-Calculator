'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Eye, EyeOff, Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        await register(formData.name, formData.email, formData.password);
        router.push('/onboarding');
      } else {
        await login(formData.email, formData.password);
        router.push('/');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A090D] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      
      {/* Dynamic Mystical Background Glow Spheres */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 ${
          mode === 'signup' ? 'bg-[#8B0000]/30 scale-110' : 'bg-[#7C3AED]/20 scale-100'
        }`}
      />
      <div
        className={`absolute bottom-10 right-10 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-all duration-700 ${
          mode === 'signup' ? 'bg-[#FF0055]/15 scale-125' : 'bg-[#7C3AED]/15 scale-100'
        }`}
      />
      <div
        className={`absolute top-10 left-10 w-64 h-64 rounded-full blur-[90px] pointer-events-none transition-all duration-700 ${
          mode === 'signup' ? 'bg-[#8B0000]/20' : 'bg-[#00F0FF]/10'
        }`}
      />

      <div className="w-full max-w-md relative z-10">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border transition-all duration-500 mb-4 ${
              mode === 'signup'
                ? 'border-[#8B0000]/60 bg-[#8B0000]/20 shadow-[0_0_20px_rgba(139,0,0,0.4)]'
                : 'border-[#7C3AED]/40 bg-[#7C3AED]/10 shadow-[0_0_20px_rgba(124,58,237,0.3)]'
            }`}
          >
            <Sparkles
              className={`w-4 h-4 animate-pulse transition-colors duration-500 ${
                mode === 'signup' ? 'text-[#FF4D4D] fill-[#FF4D4D]' : 'text-[#00F0FF] fill-[#00F0FF]'
              }`}
            />
            <span className="text-xs uppercase tracking-widest text-[#E2E8F0] font-semibold">
              Sanctum Entry
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            {mode === 'login' ? 'Re-enter the Void' : 'Begin Your Initiate Journey'}
          </h1>
          <p className="text-sm text-[#E2E8F0]/60 mt-2">
            {mode === 'login'
              ? 'Provide your credentials to access saved readings and grimoires.'
              : 'Join the covenant to reveal your natal charts and personalized spread analysis.'}
          </p>
        </div>

        {/* Dynamic Auth Card Container */}
        <div
          className={`bg-[#0A090D]/80 backdrop-blur-xl border rounded-2xl p-6 md:p-8 relative transition-all duration-500 ${
            mode === 'signup'
              ? 'border-[#8B0000]/50 shadow-[0_0_50px_rgba(139,0,0,0.25)]'
              : 'border-[#7C3AED]/30 shadow-[0_0_50px_rgba(124,58,237,0.2)]'
          }`}
        >
          {/* Mode Switcher Buttons */}
          <div className="grid grid-cols-2 p-1 bg-[#0A090D] rounded-xl border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                mode === 'login'
                  ? 'bg-[#7C3AED]/25 text-white border border-[#7C3AED]/60 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                  : 'text-[#E2E8F0]/60 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); }}
              className={`py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                mode === 'signup'
                  ? 'bg-[#8B0000]/40 text-white border border-[#8B0000]/80 shadow-[0_0_15px_rgba(139,0,0,0.4)]'
                  : 'text-[#E2E8F0]/60 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-[#8B0000]/20 border border-[#8B0000] text-[#FF6B6B] text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Sign Up Name Field */}
            {mode === 'signup' && (
              <div className="space-y-1.5 animate-in fade-in duration-300">
                <label className="text-xs font-medium text-[#E2E8F0]/80 tracking-wider uppercase">
                  Initiate Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#FF4D4D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Morgana Raven"
                    className="w-full bg-[#0A090D] border border-[#8B0000]/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#E2E8F0]/30 focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#E2E8F0]/80 tracking-wider uppercase">
                Astral Address (Email)
              </label>
              <div className="relative">
                <Mail
                  className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    mode === 'signup' ? 'text-[#FF4D4D]' : 'text-[#7C3AED]'
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seeker@orakle.realm"
                  className={`w-full bg-[#0A090D] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#E2E8F0]/30 focus:outline-none transition-all ${
                    mode === 'signup'
                      ? 'border-[#8B0000]/40 focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]'
                      : 'border-[#7C3AED]/30 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#E2E8F0]/80 tracking-wider uppercase">
                Cipher Word (Password)
              </label>
              <div className="relative">
                <Lock
                  className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    mode === 'signup' ? 'text-[#FF4D4D]' : 'text-[#7C3AED]'
                  }`}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  className={`w-full bg-[#0A090D] border rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-[#E2E8F0]/30 focus:outline-none transition-all ${
                    mode === 'signup'
                      ? 'border-[#8B0000]/40 focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]'
                      : 'border-[#7C3AED]/30 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#E2E8F0]/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Form Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 mt-6 shadow-lg disabled:opacity-50 ${
                mode === 'signup'
                  ? 'bg-[#8B0000] hover:bg-[#8B0000]/80 border border-[#8B0000] shadow-[0_0_20px_rgba(139,0,0,0.5)] hover:scale-[1.01]'
                  : 'bg-[#7C3AED] hover:bg-[#7C3AED]/80 border border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-[1.01]'
              }`}
            >
              <span>
                {isSubmitting
                  ? 'Invoking Realm...'
                  : mode === 'login'
                  ? 'Enter Sanctuary'
                  : 'Proceed to Onboarding Quiz'}
              </span>
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Bottom Switcher CTA */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-[#E2E8F0]/60">
            {mode === 'login' ? (
              <p>
                First time seeking answers?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(''); }}
                  className="text-[#FF4D4D] font-semibold hover:underline ml-1"
                >
                  Create a Covenant
                </button>
              </p>
            ) : (
              <p>
                Already initiated?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-[#7C3AED] font-semibold hover:underline ml-1"
                >
                  Sign In Here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}