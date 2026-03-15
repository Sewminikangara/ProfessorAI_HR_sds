"use client";

import React, { useState } from 'react';
import {
    Users,
    Search,
    Plus,
    Sparkles,
    Trophy,
    FileText,
    ChevronRight,
    Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';

const candidates = [
    { id: 1, name: 'John Doe', score: 92, match: 'React, Node.js, AWS', status: 'Screening', analysis: 'Exceptional technical alignment and cloud experience.' },
    { id: 2, name: 'Alice Smith', score: 88, match: 'React, TypeScript, Redux', status: 'Screening', analysis: 'Strong frontend focus with clean code patterns.' },
    { id: 3, name: 'Bob Wilson', score: 45, match: 'Java, Spring Boot', status: 'Pending', analysis: 'Tech stack mismatch; backend focused on Java.' },
    { id: 4, name: 'Emma Davis', score: 79, match: 'React, Node.js', status: 'Screening', analysis: 'Good fullstack base, slightly less experience in AWS.' },
];

export default function RecruitmentPage() {
    const [selectedJob, setSelectedJob] = useState('Senior Frontend Developer');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold flex items-center space-x-3">
                        <span>AI Talent Intelligence</span>
                        <Sparkles className="w-6 h-6 text-amber-500 fill-amber-500/20" />
                    </h2>
                    <p className="text-slate-400 mt-1">AI-powered candidate ranking and skill matching.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-slate-800 border border-border rounded-lg hover:bg-slate-700 transition-colors">
                        Upload Resumes (Bulk)
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Create Job</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card border border-border rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-400">Total Applications</p>
                        <h3 className="text-2xl font-bold mt-1">458</h3>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                        <Users className="w-6 h-6 text-blue-500" />
                    </div>
                </div>
                <div className="p-6 bg-card border border-border rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-400">AI Screened</p>
                        <h3 className="text-2xl font-bold mt-1">458</h3>
                    </div>
                    <div className="p-3 bg-amber-500/10 rounded-xl">
                        <Brain className="w-6 h-6 text-amber-500" />
                    </div>
                </div>
                <div className="p-6 bg-card border border-border rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-400">Shortlisted</p>
                        <h3 className="text-2xl font-bold mt-1">24</h3>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-xl">
                        <Trophy className="w-6 h-6 text-emerald-500" />
                    </div>
                </div>
            </div>

            {/* Candidate List */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="font-bold text-lg">Ranked Candidates for {selectedJob}</h3>
                    <button className="text-sm text-primary hover:underline font-medium">View Job Description</button>
                </div>
                <div className="divide-y divide-border">
                    {candidates.map((can) => (
                        <div key={can.id} className="p-6 hover:bg-slate-800/30 transition-colors group cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold border border-border">
                                        {can.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-200">{can.name}</h4>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <FileText className="w-3 h-3 text-slate-500" />
                                            <span className="text-xs text-slate-500">resume_v2.pdf</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {can.match.split(', ').map(skill => (
                                                <span key={skill} className="px-2 py-0.5 rounded-full bg-slate-900 border border-border text-[10px] text-slate-400">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <span className={cn(
                                            "text-2xl font-bold",
                                            can.score >= 80 ? "text-emerald-500" : can.score >= 60 ? "text-amber-500" : "text-rose-500"
                                        )}>
                                            {can.score}%
                                        </span>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">AI Match</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2 italic max-w-xs">{can.analysis}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
