"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Clock,
    Calendar,
    Briefcase,
    GraduationCap,
    FileText,
    BarChart3,
    Settings,
    LogOut,
    Bot,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Employees', icon: Users, href: '/employees' },
    { label: 'Attendance', icon: Clock, href: '/attendance' },
    { label: 'Leave', icon: Calendar, href: '/leave' },
    { label: 'Workflows', icon: Zap, href: '/workflows' },
    { label: 'Recruitment', icon: Briefcase, href: '/recruitment' },
    { label: 'Learning', icon: GraduationCap, href: '/learning' },
    { label: 'Documents', icon: FileText, href: '/documents' },
    { label: 'Performance', icon: BarChart3, href: '/performance' },
    { label: 'Knowledge Base', icon: Bot, href: '/knowledge-base' },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [currentRole, setCurrentRole] = useState('Admin');

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole') || 'Admin';
        setCurrentRole(storedRole);

        const handleRoleChange = () => {
            setCurrentRole(localStorage.getItem('userRole') || 'Admin');
        };

        window.addEventListener('roleChange', handleRoleChange);
        return () => window.removeEventListener('roleChange', handleRoleChange);
    }, []);

    const getDashboardLink = () => {
        if (currentRole === 'Employee') return '/dashboard/employee';
        if (currentRole === 'HR Manager') return '/dashboard/hr';
        return '/dashboard'; // Admin
    };

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('isAuthenticated');
        router.push('/login');
    };

    // Replace the generic /dashboard with the role-specific one
    const visibleNavItems = navItems.map(item =>
        item.href === '/dashboard' ? { ...item, href: getDashboardLink() } : item
    );

    return (
        <div className="w-64 h-screen glass border-r border-border flex flex-col fixed left-0 top-0 z-20">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-6">
                    ProfessorHR
                </h1>

                {/* Active User Profile Badge */}
                <div className="glass-panel rounded-xl p-3 border border-white/10 flex items-center space-x-3 shadow-lg shadow-black/20">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Logged in as</p>
                        <p className={cn(
                            "text-sm font-bold mt-0.5",
                            currentRole === 'Admin' ? 'text-rose-400' :
                                currentRole === 'HR Manager' ? 'text-amber-400' : 'text-emerald-400'
                        )}>
                            {currentRole}
                        </p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {visibleNavItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                            pathname === item.href || (item.label === 'Dashboard' && pathname.startsWith('/dashboard'))
                                ? "bg-primary/20 text-primary border-r-4 border-primary shadow-inner glass"
                                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                        )}
                    >
                        <item.icon className={cn(
                            "w-5 h-5",
                            pathname === item.href || (item.label === 'Dashboard' && pathname.startsWith('/dashboard')) ? "text-primary" : "group-hover:text-slate-200"
                        )} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-border mt-auto">
                <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-slate-200"
                >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors rounded-lg mt-2"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};
