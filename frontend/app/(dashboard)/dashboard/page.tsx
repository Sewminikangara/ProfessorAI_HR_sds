import React from 'react';
import {
    Users,
    UserPlus,
    CalendarCheck,
    TrendingUp,
    Clock,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const stats = [
    { label: 'Total Employees', value: '124', change: '+4%', trend: 'up', icon: Users },
    { label: 'New Hires', value: '12', change: '+2', trend: 'up', icon: UserPlus },
    { label: 'On Leave', value: '8', change: '-1', trend: 'down', icon: CalendarCheck },
    { label: 'Department Count', value: '6', change: '0', trend: 'neutral', icon: TrendingUp },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Good morning, Admin</h2>
                    <p className="text-slate-400 mt-1">ProfessorHR is monitoring your team performance and engagement today.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-slate-800 border border-border rounded-lg hover:bg-slate-700 transition-colors">
                        Download Report
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        Quick Action
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 glass-panel rounded-2xl hover:border-primary/50 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                            <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-primary/10 transition-colors">
                                <stat.icon className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
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
                {/* Recent Activity */}
                <div className="lg:col-span-2 p-6 glass-panel rounded-2xl">
                    <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex items-start space-x-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold">
                                    JS
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-200">Jane Smith requested for Sick Leave</p>
                                    <p className="text-xs text-slate-500 mt-1">2 hours ago • Leave Management</p>
                                </div>
                                <button className="text-xs font-semibold text-primary hover:underline">View</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="p-6 glass-panel rounded-2xl">
                    <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full p-4 bg-slate-800/50 text-left rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-border group">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Add New Employee</span>
                                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-primary" />
                            </div>
                        </button>
                        <button className="w-full p-4 bg-slate-800/50 text-left rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-border group">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Post Job Opening</span>
                                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-primary" />
                            </div>
                        </button>
                        <button className="w-full p-4 bg-slate-800/50 text-left rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-border group">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Run Payroll Preview</span>
                                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-primary" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any) {
    return inputs.filter(Boolean).join(' ');
}
