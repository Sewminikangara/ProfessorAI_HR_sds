"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Lock, Mail, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const router = useRouter();
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [domainHint, setDomainHint] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const endpoint = isRegistering ? 'http://localhost:3001/auth/register' : 'http://localhost:3001/auth/login';
            const payload = isRegistering
                ? { email, password, companyName }
                : { email, password };

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Authentication failed');
            }

            const data = await res.json();

            // Store real auth data
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('userRole', data.user.role === 'ADMIN' ? 'Admin' : data.user.role === 'HR_MANAGER' ? 'HR Manager' : 'Employee');
            localStorage.setItem('companyId', data.user.companyId);
            localStorage.setItem('isAuthenticated', 'true');

            // Dispatch event so Sidebar updates immediately
            window.dispatchEvent(new Event('roleChange'));

            const role = data.user.role;
            if (role === 'EMPLOYEE') {
                router.push('/dashboard/employee');
            } else if (role === 'HR_MANAGER') {
                router.push('/dashboard/hr');
            } else {
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to authenticate');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md p-8 glass-panel rounded-3xl relative z-10 border border-white/10 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                        <Bot className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        ProfessorHR
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm text-center">
                        Intelligent Workforce Management SaaS
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    {/* Error Display */}
                    {error && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {isRegistering && (
                            <div className="relative">
                                <Bot className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    required={isRegistering}
                                    value={companyName}
                                    onChange={(e) => {
                                        setCompanyName(e.target.value);
                                        setDomainHint(e.target.value.toLowerCase().replace(/\s+/g, ''));
                                    }}
                                    placeholder="Company Name"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-slate-500 transition-all"
                                />
                            </div>
                        )}
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-slate-500 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-slate-500 transition-all"
                            />
                        </div>
                    </div>

                    {isRegistering && domainHint && (
                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mt-4">
                            <p className="text-sm font-medium text-emerald-400 mb-2">3 Accounts will be created:</p>
                            <ul className="text-xs text-slate-400 space-y-1 ml-4 list-disc">
                                <li><span className="text-slate-200">Admin:</span> The email above</li>
                                <li><span className="text-slate-200">HR Manager:</span> hr@{domainHint}.com</li>
                                <li><span className="text-slate-200">Employee:</span> employee@{domainHint}.com</li>
                            </ul>
                            <p className="text-[10px] text-slate-500 mt-2 italic">All accounts will share the password you enter above for this demo.</p>
                        </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
                            <input type="checkbox" className="rounded border-slate-700 bg-slate-900/50 text-primary focus:ring-primary/50" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-primary hover:text-primary/80 transition-colors">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        <span>{isLoading ? 'Authenticating...' : isRegistering ? 'Register Company' : 'Sign In to Workspace'}</span>
                        {!isLoading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-slate-400 text-sm">
                        {isRegistering ? 'Already have an account? ' : "Don't have a company account? "}
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError('');
                            }}
                            className="text-primary font-medium hover:underline"
                        >
                            {isRegistering ? 'Sign In' : 'Register your business'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
