"use client";

import React from 'react';
import {
    Target,
    TrendingUp,
    Star,
    Award,
    ChevronRight,
    Plus,
    BarChart2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const reviews = [
    { id: 1, name: 'Alex Rivera', period: 'Q1 2024', status: 'Completed', score: 4.8 },
    { id: 2, name: 'Sarah Chen', period: 'Q1 2024', status: 'In Review', score: null },
    { id: 3, name: 'Michael Brown', period: 'Q4 2023', status: 'Completed', score: 4.2 },
];

const goals = [
    { id: 1, title: 'Improve API response time by 20%', progress: 75, category: 'Technical' },
    { id: 2, title: 'Complete Advanced React Certification', progress: 100, category: 'Learning' },
    { id: 3, title: 'Mentor 2 junior developers', progress: 40, category: 'Leadership' },
];

export default function PerformancePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Performance Tracking</h2>
                    <p className="text-slate-400 mt-1">Manage OKRs, KPIs, and employee reviews.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>New Review Cycle</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Core Stats */}
                <div className="p-6 bg-card border border-border rounded-2xl flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400 font-medium">Avg. Performance Score</p>
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-4xl font-bold">4.5</h3>
                        <p className="text-xs text-emerald-500 mt-1 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +0.3 from last quarter
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400 font-medium">Goals Completed</p>
                        <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-4xl font-bold">82%</h3>
                        <div className="w-full bg-slate-800 h-2 mt-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full w-[82%]" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400 font-medium">Pending Reviews</p>
                        <BarChart2 className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-4xl font-bold">12</h3>
                        <p className="text-xs text-slate-500 mt-1">Due by end of month</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Goals Section */}
                <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">Current Goals</h3>
                        <button className="text-sm text-primary font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {goals.map(goal => (
                            <div key={goal.id} className="p-4 bg-slate-900/50 rounded-xl border border-border">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{goal.category}</span>
                                    <span className="text-xs font-bold text-slate-200">{goal.progress}%</span>
                                </div>
                                <h4 className="font-semibold text-slate-200 mt-1">{goal.title}</h4>
                                <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full transition-all duration-500",
                                            goal.progress === 100 ? "bg-emerald-500" : "bg-primary"
                                        )}
                                        style={{ width: `${goal.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">Recent Reviews</h3>
                        <button className="text-sm text-primary font-medium hover:underline">Manage All</button>
                    </div>
                    <div className="divide-y divide-border">
                        {reviews.map(rev => (
                            <div key={rev.id} className="py-4 flex items-center justify-between group cursor-pointer first:pt-0 last:pb-0">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-border flex items-center justify-center font-bold">
                                        {rev.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-200">{rev.name}</p>
                                        <p className="text-xs text-slate-500">{rev.period}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {rev.score && (
                                        <div className="flex items-center space-x-1 px-2 py-1 bg-amber-500/10 rounded-lg">
                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            <span className="text-xs font-bold text-amber-500">{rev.score}</span>
                                        </div>
                                    )}
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                                        rev.status === 'Completed' ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                                    )}>
                                        {rev.status}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
