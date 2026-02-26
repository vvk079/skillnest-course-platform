import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MoveLeft, Ghost } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-fade-in">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-indigo-500 blur-[80px] opacity-20 rounded-full animate-pulse" />
                <div className="relative bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl backdrop-blur-sm">
                    <Ghost size={80} className="text-indigo-600 animate-float" />
                </div>
            </div>

            <p className="font-bold text-sm text-indigo-500 uppercase tracking-[0.3em] mb-4">404 Error</p>
            <h1 className="md:text-6xl text-4xl font-bold text-slate-900 tracking-tighter leading-tight mb-6">
                Lost in the <span className="text-indigo-600">Nest?</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-md mx-auto mb-10 leading-relaxed">
                The page you're searching for seems to have flown away. Check the URL or return to safety.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold rounded-[2rem] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 group"
                >
                    <MoveLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Go back home
                </Link>
                <Link
                    to="/courses"
                    className="flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-bold rounded-[2rem] border border-slate-200 hover:border-indigo-100 hover:bg-slate-50 transition-all shadow-sm active:scale-95 group"
                >
                    Explore Courses
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-indigo-600" />
                </Link>
            </div>

            <div className="mt-20 pt-8 border-t border-slate-100 w-full max-w-xs flex flex-col items-center gap-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Still stuck?</span>
                <button type="button" className="text-sm font-bold text-indigo-600 hover:underline">
                    Contact SkillNest Support
                </button>
            </div>
        </div>
    );
};

export default NotFound;
