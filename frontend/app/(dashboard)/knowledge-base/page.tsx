"use client";

import React, { useState } from 'react';
import {
    FileSearch,
    Upload,
    FileText,
    Search,
    ExternalLink,
    Shield,
    Clock,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const documents = [
    { id: 1, title: 'Employee Handbook 2024', type: 'PDF', category: 'Policy', updated: '2 days ago' },
    { id: 2, title: 'Health Insurance Benefits', type: 'PDF', category: 'Benefits', updated: '1 week ago' },
    { id: 3, title: 'Remote Work Policy', type: 'DOCX', category: 'Policy', updated: 'Mar 01, 2024' },
    { id: 4, title: 'Company OKRs - Q1', type: 'PDF', category: 'General', updated: 'Jan 15, 2024' },
];

export default function KnowledgeBasePage() {
    const [query, setQuery] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold flex items-center space-x-3">
                        <span>Knowledge Base</span>
                        <FileSearch className="w-8 h-8 text-primary" />
                    </h2>
                    <p className="text-slate-400 mt-1">Search through company policies and HR documents.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Document</span>
                </button>
            </div>

            {/* AI Search Box */}
            <div className="p-8 bg-card border border-border rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <div className="flex items-center justify-center space-x-2 text-primary mb-4">
                        <Sparkles className="w-5 h-5 fill-current" />
                        <span className="font-bold uppercase tracking-widest text-xs">AI-Powered Semantic Search</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-6 italic">"How many days of maternity leave am I entitled to?"</h3>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Ask anything about company policy..."
                            className="w-full pl-12 pr-12 py-4 bg-slate-900 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-lg transition-all shadow-2xl shadow-black/50"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-xl text-white">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-lg mb-2 px-2">Recent Documents</h3>
                    <div className="divide-y divide-border bg-card border border-border rounded-2xl overflow-hidden">
                        {documents.map(doc => (
                            <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors group cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-primary transition-colors">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-200">{doc.title}</p>
                                        <div className="flex items-center space-x-2 mt-0.5">
                                            <span className="text-[10px] font-bold uppercase text-slate-500">{doc.category}</span>
                                            <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                            <span className="text-[10px] text-slate-500">{doc.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Updated</p>
                                        <p className="text-xs text-slate-400">{doc.updated}</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-600" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 bg-card border border-border rounded-2xl">
                        <h3 className="font-bold mb-4 flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-emerald-500" />
                            <span>Security Guidelines</span>
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            All HR documents are encrypted and only accessible by authorized roles based on the company policy.
                        </p>
                        <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
                            View Access Logs
                        </button>
                    </div>

                    <div className="p-6 bg-slate-900 border border-border rounded-2xl">
                        <h3 className="font-bold mb-4">Categories</h3>
                        <div className="space-y-2">
                            {['Policy', 'Benefits', 'Legal', 'Payroll', 'Onboarding', 'Templates'].map(cat => (
                                <button key={cat} className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors flex items-center justify-between group">
                                    <span>{cat}</span>
                                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded-md group-hover:bg-primary/20 group-hover:text-primary transition-colors">12</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
