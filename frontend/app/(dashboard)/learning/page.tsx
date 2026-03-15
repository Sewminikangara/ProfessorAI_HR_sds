"use client";

import React from 'react';
import {
    GraduationCap,
    Play,
    BookOpen,
    Clock,
    Search,
    CheckCircle,
    BarChart,
    Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

const courses = [
    {
        id: 1,
        title: 'Advanced React patterns & Performance',
        instructor: 'Jane Smith',
        duration: '6h 30m',
        students: 154,
        progress: 45,
        thumbnail: '⚛️'
    },
    {
        id: 2,
        title: 'Leadership in Engineering Teams',
        instructor: 'Mark Wilson',
        duration: '4h 15m',
        students: 89,
        progress: 90,
        thumbnail: '🚀'
    },
    {
        id: 3,
        title: 'Cybersecurity Awareness 2024',
        instructor: 'ProfessorHR',
        duration: '1h 00m',
        students: 1205,
        progress: 0,
        thumbnail: '🛡️'
    },
];

export default function LearningPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold flex items-center space-x-3">
                        <span>Learning & Development</span>
                        <GraduationCap className="w-8 h-8 text-primary" />
                    </h2>
                    <p className="text-slate-400 mt-1">Upskill your team with curated courses and certifications.</p>
                </div>
                <div className="flex space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-64"
                        />
                    </div>
                    <button className="px-4 py-2 bg-slate-800 border border-border rounded-lg hover:bg-slate-700 transition-colors">
                        Manage Library
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    {/* Featured Courses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map(course => (
                            <div key={course.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all group">
                                <div className="h-32 bg-slate-900 flex items-center justify-center text-4xl relative">
                                    {course.thumbnail}
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button className="p-3 bg-primary rounded-full text-white shadow-xl shadow-primary/40 transform scale-75 group-hover:scale-100 transition-transform">
                                            <Play className="w-6 h-6 fill-current" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-slate-200 line-clamp-1">{course.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">by {course.instructor}</p>

                                    <div className="flex items-center space-x-4 mt-4 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                                        <div className="flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {course.duration}
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-3 h-3 mr-1" />
                                            {course.students}
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <div className="flex items-center justify-between text-[10px] font-bold mb-1.5 uppercase tracking-widest">
                                            <span className="text-slate-500">Progress</span>
                                            <span className="text-primary">{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full transition-all" style={{ width: `${course.progress}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* New Courses Table/List */}
                    <div className="p-6 bg-card border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-6">Course Catalog</h3>
                        <div className="divide-y divide-border">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="py-4 flex items-center justify-between group cursor-pointer first:pt-0">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-border flex items-center justify-center font-bold">
                                            <BookOpen className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-200">Diversity and Inclusion at Work</p>
                                            <p className="text-xs text-slate-500">Soft Skills • 2h 45m • 5 Modules</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-all">
                                        Enroll Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar / Stats */}
                <div className="space-y-6">
                    <div className="p-6 bg-card border border-border rounded-2xl">
                        <h3 className="font-bold mb-4">Your Learning</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Certifications</span>
                                <span className="font-bold">12</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Total Hours</span>
                                <span className="font-bold">48h</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Courses In Progress</span>
                                <span className="font-bold text-primary">3</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2 bg-slate-800 border border-border rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors">
                            View Transcripts
                        </button>
                    </div>

                    <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl">
                        <div className="flex items-center space-x-3 text-primary">
                            <BarChart className="w-5 h-5" />
                            <h3 className="font-bold">Team Progress</h3>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Engineering team completion rate is up by 15% this month.</p>
                        <div className="mt-4 flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-800" />
                            ))}
                            <div className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold">
                                +42
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
