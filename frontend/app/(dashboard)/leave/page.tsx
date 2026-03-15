"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LeavePage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:3001/leave', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            }
        } catch (error) {
            console.error("Failed to fetch leave requests", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleApplyLeave = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await fetch('http://localhost:3001/leave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    type: 'Annual Leave',
                    startDate: new Date().toISOString(),
                    endDate: new Date(Date.now() + 86400000 * 3).toISOString(), // +3 days
                    reason: 'Family Vacation',
                })
            });
            fetchRequests();
        } catch (error) {
            console.error("Failed to apply for leave", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Leave Management</h2>
                    <p className="text-slate-400 mt-1">Track leave requests and balances.</p>
                </div>
                <button onClick={handleApplyLeave} className="px-4 py-2 bg-primary/80 backdrop-blur-md text-white border border-white/20 rounded-lg hover:bg-primary transition-colors shadow-xl shadow-primary/20">
                    Apply Mock Leave
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 glass-panel rounded-2xl">
                    <p className="text-sm text-slate-400">Annual Leave</p>
                    <h3 className="text-2xl font-bold mt-1">12 / 20 Days</h3>
                </div>
                <div className="p-6 glass-panel rounded-2xl">
                    <p className="text-sm text-slate-400">Sick Leave</p>
                    <h3 className="text-2xl font-bold mt-1">5 / 10 Days</h3>
                </div>
                <div className="p-6 glass-panel rounded-2xl">
                    <p className="text-sm text-slate-400">Pending Requests</p>
                    <h3 className="text-2xl font-bold mt-1">{requests.filter(r => r.status === 'PENDING').length}</h3>
                </div>
            </div>

            <div className="p-6 glass-panel rounded-2xl">
                <h3 className="text-xl font-bold mb-6">Recent Requests</h3>
                <div className="space-y-4">
                    {loading ? (
                        <p className="text-slate-400 px-4 py-2">Loading requests...</p>
                    ) : requests.length === 0 ? (
                        <p className="text-slate-400 px-4 py-2">No leave requests found.</p>
                    ) : requests.map((req, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-white/5 transition-all hover:bg-slate-900/60">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-slate-800/80 rounded-lg text-primary border border-white/10 shadow-inner">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-200">{req.type} <span className="text-slate-400 font-normal text-sm">- {req.employee?.firstName} {req.employee?.lastName}</span></p>
                                    <p className="text-xs text-slate-500">
                                        {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                req.status === 'APPROVED' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" :
                                    req.status === 'REJECTED' ? "bg-rose-500/20 text-rose-400 border border-rose-500/20" :
                                        "bg-amber-500/20 text-amber-400 border border-amber-500/20"
                            )}>
                                {req.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
