"use client";

import React from 'react';
import {
    FilePlus,
    FileCheck,
    Signature,
    Send,
    Download,
    MoreVertical,
    Wand2,
    FileBadge
} from 'lucide-react';
import { cn } from '@/lib/utils';

const documents = [
    { id: 1, title: 'Offer Letter - John Doe', type: 'Offer Letter', status: 'Draft', date: 'Mar 13, 2024' },
    { id: 2, title: 'Employment Contract - Alice Smith', type: 'Contract', status: 'Sent', date: 'Mar 12, 2024' },
    { id: 3, title: 'NDA - Michael Brown', type: 'NDA', status: 'Signed', date: 'Mar 10, 2024' },
    { id: 4, title: 'Termination Letter - Bob Gray', type: 'Official', status: 'Draft', date: 'Mar 08, 2024' },
];

export default function DocumentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold flex items-center space-x-3">
                        <span>Documents</span>
                        <FileBadge className="w-8 h-8 text-indigo-500" />
                    </h2>
                    <p className="text-slate-400 mt-1">Generate and manage official letters, contracts, and NDAs.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center space-x-2 font-bold uppercase tracking-wider text-xs">
                    <Wand2 className="w-4 h-4" />
                    <span>AI Generator</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Templates Sidebar */}
                <div className="p-6 bg-card border border-border rounded-2xl h-fit">
                    <h3 className="font-bold mb-4 uppercase tracking-widest text-[10px] text-slate-500">Templates</h3>
                    <div className="space-y-2">
                        {[
                            { label: 'Offer Letter', icon: FilePlus },
                            { label: 'Contract', icon: FileCheck },
                            { label: 'NDA', icon: Signature },
                            { label: 'Appraisal Letter', icon: FileText },
                        ].map(tmp => (
                            <button key={tmp.label} className="w-full text-left p-3 rounded-xl text-sm bg-slate-900 border border-border hover:border-primary transition-all flex items-center space-x-3 group">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:text-primary transition-colors">
                                    <tmp.icon className="w-4 h-4" />
                                </div>
                                <span className="font-medium">{tmp.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Documents Table */}
                <div className="lg:col-span-3 bg-card border border-border rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border bg-slate-900/50">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Document</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Created</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {documents.map(doc => (
                                <tr key={doc.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-slate-200">{doc.title}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-slate-400">{doc.type}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                                            doc.status === 'Signed' ? "bg-emerald-500/10 text-emerald-500" :
                                                doc.status === 'Sent' ? "bg-blue-500/10 text-blue-500" : "bg-slate-800 text-slate-400"
                                        )}>
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500">
                                        {doc.date}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                                                <Download className="w-4 h-4 text-slate-500 hover:text-white" />
                                            </button>
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                                                <Send className="w-4 h-4 text-slate-500 hover:text-white" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function FileText({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
    )
}
