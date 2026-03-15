"use client";

import React, { useState } from 'react';
import {
    Zap,
    CheckCircle2,
    Circle,
    Play,
    Settings,
    UserPlus,
    ArrowRight,
    Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const workflows = [
    {
        id: 1,
        name: 'New Employee Onboarding',
        type: 'Onboarding',
        status: 'In Progress',
        steps: [
            { id: 1, title: 'Contract Generation', status: 'completed' },
            { id: 2, title: 'IT Account Setup', status: 'completed' },
            { id: 3, title: 'Orientation Scheduling', status: 'current' },
            { id: 4, title: 'Assign Mentor', status: 'pending' },
        ]
    },
    {
        id: 2,
        name: 'Senior Dev Promotion',
        type: 'Promotion',
        status: 'Completed',
        steps: [
            { id: 1, title: 'Performance Review', status: 'completed' },
            { id: 2, title: 'Budget Approval', status: 'completed' },
            { id: 3, title: 'Final Interview', status: 'completed' },
        ]
    }
];

export default function WorkflowsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold flex items-center space-x-3">
                        <span>Autonomous Workflows</span>
                        <Zap className="w-6 h-6 text-indigo-500 fill-indigo-500/20" />
                    </h2>
                    <p className="text-slate-400 mt-1">Automate multi-step HR processes with AI triggers.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>New Workflow</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {workflows.map(wf => (
                    <div key={wf.id} className="p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all group">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{wf.type}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                                    <span className="text-xs text-slate-500">ID: WRK-{wf.id}032</span>
                                </div>
                                <h3 className="text-xl font-bold mt-1 text-slate-200">{wf.name}</h3>
                            </div>
                            <div className={cn(
                                "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                                wf.status === 'Completed' ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                            )}>
                                {wf.status}
                            </div>
                        </div>

                        <div className="mt-8 space-y-6">
                            {wf.steps.map((step, i) => (
                                <div key={step.id} className="flex items-center space-x-4">
                                    <div className="relative">
                                        {step.status === 'completed' ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        ) : step.status === 'current' ? (
                                            <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-slate-700" />
                                        )}
                                        {i !== wf.steps.length - 1 && (
                                            <div className="absolute top-5 left-2.5 w-[2px] h-6 bg-slate-800" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className={cn(
                                            "text-sm font-medium",
                                            step.status === 'completed' ? "text-slate-200" :
                                                step.status === 'current' ? "text-primary" : "text-slate-500"
                                        )}>
                                            {step.title}
                                        </p>
                                    </div>
                                    {step.status === 'current' && (
                                        <span className="text-[10px] text-slate-500 italic">Processing...</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-card bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                        JS
                                    </div>
                                ))}
                            </div>
                            <button className="text-sm font-semibold text-primary hover:underline flex items-center space-x-1">
                                <span>View Details</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Plus({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
    )
}
