"use client";

import React, { useState, useEffect } from 'react';
import {
    Users,
    Search,
    Plus,
    MoreVertical,
    Filter,
    Mail,
    Phone,
    Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EmployeesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [employeesList, setEmployeesList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:3001/employees', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setEmployeesList(data);
            }
        } catch (error) {
            console.error("Failed to fetch employees", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleAddMockEmployee = async () => {
        const mockNames = ['Alex Rivera', 'Sarah Chen', 'Michael Brown', 'Emma Wilson', 'James Taylor'];
        const mockRoles = ['Senior Developer', 'HR Manager', 'UI Designer', 'Product Manager', 'Intern'];
        const randomPrefix = Math.floor(Math.random() * 1000);

        try {
            const token = localStorage.getItem('accessToken');
            await fetch('http://localhost:3001/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName: mockNames[Math.floor(Math.random() * mockNames.length)].split(' ')[0],
                    lastName: `User${randomPrefix}`,
                    email: `employee${randomPrefix}@sphiria.hr`,
                    phone: `555-01${randomPrefix}`,
                    status: 'ACTIVE',
                })
            });
            fetchEmployees();
        } catch (error) {
            console.error("Failed to add mock employee", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Employees</h2>
                    <p className="text-slate-400 mt-1">Manage your workforce and view employee details.</p>
                </div>
                <button onClick={handleAddMockEmployee} className="flex items-center space-x-2 px-4 py-2 bg-primary/80 backdrop-blur-md text-white border border-white/20 rounded-lg hover:bg-primary transition-colors shadow-xl shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    <span>Add Mock Employee</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="p-2 bg-card border border-border rounded-xl hover:bg-slate-800 transition-colors">
                    <Filter className="w-5 h-5 text-slate-400" />
                </button>
            </div>

            {/* Employee List */}
            <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 bg-slate-900/40">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading employees...</td></tr>
                        ) : employeesList.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No employees found. Click "Add Mock Employee" to generate data.</td></tr>
                        ) : employeesList.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-sm font-bold border border-white/10 shadow-inner">
                                            {emp.firstName[0]}{emp.lastName[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-200">{emp.firstName} {emp.lastName}</p>
                                            <p className="text-xs text-slate-500">{emp.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-400">{emp.department?.name || 'Unassigned'}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-400">{emp.position?.title || 'Unassigned'}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                        emp.status === 'ACTIVE' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" :
                                            emp.status === 'ON LEAVE' ? "bg-rose-500/20 text-rose-400 border border-rose-500/20" : "bg-amber-500/20 text-amber-400 border border-amber-500/20"
                                    )}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-1 hover:bg-slate-700/50 rounded transition-colors">
                                        <MoreVertical className="w-4 h-4 text-slate-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
