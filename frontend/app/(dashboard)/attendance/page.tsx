"use client";

import React from 'react';
import { Clock, Download, Filter } from 'lucide-react';

export default function AttendancePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Attendance</h2>
                    <p className="text-slate-400 mt-1">Clock-in, clock-out and track work hours.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-slate-800 border border-border rounded-lg hover:bg-slate-700 transition-colors">
                        Export Logs
                    </button>
                    <button className="px-8 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20 font-bold">
                        Clock In
                    </button>
                </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">History</h3>
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                        <Filter className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
                <div className="space-y-4">
                    {[
                        { date: 'Today, Mar 13', in: '09:00 AM', out: '06:00 PM', total: '9h' },
                        { date: 'Yesterday, Mar 12', in: '08:55 AM', out: '06:05 PM', total: '9h 10m' },
                        { date: 'Mar 11', in: '09:05 AM', out: '05:55 PM', total: '8h 50m' },
                    ].map((log, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 p-4 bg-slate-900/50 rounded-xl border border-border items-center">
                            <p className="font-medium">{log.date}</p>
                            <div className="flex items-center space-x-2 text-slate-400 text-sm">
                                <Clock className="w-4 h-4 text-emerald-500" />
                                <span>{log.in}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-400 text-sm">
                                <Clock className="w-4 h-4 text-rose-500" />
                                <span>{log.out}</span>
                            </div>
                            <p className="text-right font-bold text-primary">{log.total}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
