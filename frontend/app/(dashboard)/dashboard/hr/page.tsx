import React from 'react';
import {
    Users,
    UserPlus,
    CalendarCheck,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
    { label: 'Total Employees', value: '124', change: '+4%', trend: 'up', icon: Users },
    { label: 'Pending Leaves', value: '12', change: '+2', trend: 'up', icon: CalendarCheck },
    { label: 'Open Positions', value: '8', change: '-1', trend: 'down', icon: UserPlus },
    { label: 'Offer Accept Rate', value: '92%', change: '+1%', trend: 'up', icon: TrendingUp },
];

export default function HRDashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Good morning, HR Manager</h2>
                    <p className="text-slate-400 mt-1">Here is your workforce overview for today.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 glass-panel hover:bg-slate-800 transition-colors">
                        Generate Report
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        Post Job
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 glass-panel rounded-2xl hover:border-primary/50 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                            <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-primary/10 transition-colors text-primary">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={cn(
                                "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                                stat.trend === 'up' ? "bg-emerald-500/10 text-emerald-500" :
                                    stat.trend === 'down' ? "bg-rose-500/10 text-rose-500" : "bg-slate-800 text-slate-400"
                            )}>
                                {stat.change}
                                {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3 ml-1" />}
                                {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3 ml-1" />}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-slate-400">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 glass-panel rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Pending Approvals</h3>
                        <button className="text-sm text-primary hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Emma Wilson', request: 'Annual Leave (3 Days)', date: 'Oct 15 - Oct 18' },
                            { name: 'Michael Brown', request: 'Timesheet Approval', date: 'Week 42' },
                            { name: 'Sarah Chen', request: 'Course Enrollment: Leadership', date: 'Pending Budget Approval' },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-slate-900/40 rounded-xl border border-white/5">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-200">{item.name}</p>
                                        <p className="text-sm text-slate-400">{item.request}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 bg-rose-500/10 text-rose-500 rounded-lg text-xs font-semibold hover:bg-rose-500/20">Reject</button>
                                    <button className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-xs font-semibold hover:bg-emerald-500/20">Approve</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 glass-panel rounded-2xl">
                    <h3 className="text-xl font-bold mb-6">Candidate Pipeline</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-900/40 rounded-xl flex items-center justify-between border-l-4 border-indigo-500">
                            <div>
                                <p className="font-medium">Total Applicants</p>
                                <p className="text-2xl font-bold text-slate-300">452</p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-900/40 rounded-xl flex items-center justify-between border-l-4 border-blue-500">
                            <div>
                                <p className="font-medium">AI Screened</p>
                                <p className="text-2xl font-bold text-slate-300">128</p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-900/40 rounded-xl flex items-center justify-between border-l-4 border-emerald-500">
                            <div>
                                <p className="font-medium">Interviewing</p>
                                <p className="text-2xl font-bold text-slate-300">24</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
