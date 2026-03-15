import React, { useState, useEffect } from 'react';
import {
    Clock,
    CalendarCheck,
    Briefcase,
    BookOpen,
    ArrowUpRight,
    Star,
    Bot
} from 'lucide-react';

export default function EmployeeDashboardPage() {
    const [timesheets, setTimesheets] = useState<any[]>([]);
    const [totalHours, setTotalHours] = useState(0);

    const fetchTimesheets = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:3001/timesheets/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setTimesheets(data);
                const sum = data.reduce((acc: number, cur: any) => acc + (cur.hours || 0), 0);
                setTotalHours(sum);
            }
        } catch (error) {
            console.error("Failed to fetch timesheets", error);
        }
    };

    useEffect(() => {
        fetchTimesheets();
    }, []);

    const handleClockIn = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await fetch('http://localhost:3001/timesheets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    date: new Date().toISOString(),
                    hours: 8,
                    task: "Daily Operations"
                })
            });
            fetchTimesheets(); // refresh hours
        } catch (error) {
            console.error("Failed to clock in", error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Good morning, Sarah</h2>
                    <p className="text-slate-400 mt-1">Here is what's happening today in your workspace.</p>
                </div>
                <button
                    onClick={handleClockIn}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    Clock In (8 hrs)
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 glass-panel rounded-2xl">
                    <div className="p-2 bg-slate-800/50 rounded-lg w-10 mb-4">
                        <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-400">Total Hours (All Time)</p>
                    <h3 className="text-2xl font-bold mt-1">{totalHours}h</h3>
                </div>
                <div className="p-6 glass-panel rounded-2xl">
                    <div className="p-2 bg-slate-800/50 rounded-lg w-10 mb-4">
                        <CalendarCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-sm text-slate-400">Available Leave</p>
                    <h3 className="text-2xl font-bold mt-1">14 Days</h3>
                </div>
                <div className="p-6 glass-panel rounded-2xl">
                    <div className="p-2 bg-slate-800/50 rounded-lg w-10 mb-4">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-sm text-slate-400">Pending Courses</p>
                    <h3 className="text-2xl font-bold mt-1">2</h3>
                </div>
                <div className="p-6 glass-panel rounded-2xl border border-primary/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="p-2 bg-primary/20 rounded-lg w-10 mb-4">
                        <Star className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-slate-400">Performance Rating</p>
                    <h3 className="text-2xl font-bold mt-1">Exceeds Exps</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 glass-panel rounded-2xl">
                    <h3 className="text-xl font-bold mb-6">Upcoming Tasks & Workflows</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 flex justify-between items-center">
                            <div>
                                <p className="font-medium">Complete Security Training 2026</p>
                                <p className="text-xs text-slate-400 mt-1">Due in 3 days</p>
                            </div>
                            <button className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">Start</button>
                        </div>
                        <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 flex justify-between items-center">
                            <div>
                                <p className="font-medium">Sign Updated NDA</p>
                                <p className="text-xs text-slate-400 mt-1">HR Request • Due Tomorrow</p>
                            </div>
                            <button className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">Review</button>
                        </div>
                    </div>
                </div>

                <div className="p-6 glass-panel rounded-2xl">
                    <h3 className="text-xl font-bold mb-6">Ask ProfessorHR</h3>
                    <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 h-[80%] flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <Bot className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <p className="font-medium">I'm your AI HR Assistant.</p>
                            <p className="text-sm text-slate-400 mt-2">Try asking: "What is my remaining PTO?" or "Apply for sick leave today."</p>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors w-full border border-white/10">
                            Open Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
