import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User, Search, ShoppingCart, Menu, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isAuthenticated, logout, isAdmin, user } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-5 border-b border-slate-100 bg-white/80 backdrop-blur-xl transition-all">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group decoration-none">
                <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-600/20">
                    <BookOpen className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tighter text-slate-900 uppercase">
                    Skill<span className="text-indigo-600">Nest</span>
                </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
                <div className="flex items-center gap-8 mr-4">
                    <Link to="/" className="text-slate-500 hover:text-indigo-600 font-bold uppercase text-[10px] tracking-widest transition-all">Home</Link>
                    <Link to="/courses" className="text-slate-500 hover:text-indigo-600 font-bold uppercase text-[10px] tracking-widest transition-all">Learn</Link>
                    {isAuthenticated && (
                        <Link to={isAdmin ? "/admin" : "/dashboard"} className="text-slate-500 hover:text-indigo-600 font-bold uppercase text-[10px] tracking-widest transition-all">
                            {isAdmin ? "Control Centre" : "My Portal"}
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-5 pl-8 border-l border-slate-100">
                    <button className="hidden lg:flex p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all active:scale-95">
                        <Search size={22} />
                    </button>

                    <button className="relative p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all active:scale-95 group">
                        <ShoppingCart size={22} className="group-hover:rotate-12 transition-transform" />
                        <span className="absolute top-2 right-2 flex items-center justify-center text-white bg-indigo-600 w-4 h-4 rounded-full text-[8px] font-bold shadow-lg shadow-indigo-600/30">0</span>
                    </button>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4 ml-2">
                            <div className="hidden xl:flex flex-col items-end">
                                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{user?.name}</span>
                                <span className="text-[8px] text-indigo-500 uppercase font-bold tracking-[0.2em]">{isAdmin ? 'Administrator' : 'Student'}</span>
                            </div>
                            <div className="relative group">
                                <div className="size-11 rounded-2xl bg-slate-100 overflow-hidden ring-4 ring-slate-50 group-hover:ring-indigo-50 transition-all cursor-pointer">
                                    <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`} alt={user?.name} />
                                </div>
                                {/* Dropdown placeholder or just direct buttons for now */}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
                                title="Safe Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="px-8 py-3.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 active:scale-95 transition-all">
                            Access Portal
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="md:hidden p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95">
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed inset-0 top-[89px] z-50 bg-white md:hidden"
                    >
                        <div className="p-8 flex flex-col gap-8">
                            <Link to="/" onClick={() => setOpen(false)} className="text-3xl font-bold text-slate-900 uppercase tracking-tighter hover:text-indigo-600 transition-colors">Home Portal</Link>
                            <Link to="/courses" onClick={() => setOpen(false)} className="text-3xl font-bold text-slate-900 uppercase tracking-tighter hover:text-indigo-600 transition-colors">Learning Hub</Link>
                            {isAuthenticated && (
                                <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setOpen(false)} className="text-3xl font-bold text-slate-900 uppercase tracking-tighter hover:text-indigo-600 transition-colors">
                                    {isAdmin ? "Admin Centre" : "My Dashboard"}
                                </Link>
                            )}

                            <div className="pt-8 border-t border-slate-100 mt-auto">
                                {!isAuthenticated ? (
                                    <Link to="/login" onClick={() => setOpen(false)} className="block w-full text-center py-6 bg-indigo-600 text-white rounded-3xl font-bold text-lg uppercase tracking-widest shadow-2xl shadow-indigo-600/20">
                                        Secure Identity
                                    </Link>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl">
                                            <div className="size-14 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                                                <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`} alt={user?.name} className="w-full h-full" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 tracking-tight">{user?.name}</span>
                                                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{user?.role}</span>
                                            </div>
                                        </div>
                                        <button onClick={handleLogout} className="w-full py-6 bg-red-50 text-red-600 rounded-3xl font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3">
                                            <LogOut size={24} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
