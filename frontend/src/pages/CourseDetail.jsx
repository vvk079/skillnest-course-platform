import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

import { Clock, User, Users, CheckCircle2, Share2, Heart, ShieldCheck, ChevronLeft, Loader2, ArrowRight, PlayCircle, Star, Calendar, Globe, BookOpen } from 'lucide-react';
const API = import.meta.env.VITE_API_URL;

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [enrolled, setEnrolled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/courses/${id}`);
                setCourse(response.data);
            } catch (err) {
                console.error('Error:', err);
                setError('Course not found');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/courses/${id}` } });
            return;
        }

        setIsEnrolling(true);
        try {
            await api.post(`/enroll/${id}`);
            setEnrolled(true);
        } catch (err) {
            const msg = err.response?.data?.message || 'Enrollment failed';
            setError(msg);
            console.error('Enrollment failed:', err);
        } finally {
            setIsEnrolling(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 animate-fade-in bg-slate-50/50">
            <div className="relative">
                <Loader2 className="animate-spin text-indigo-600" size={64} />
                <div className="absolute inset-0 blur-xl bg-indigo-500/20 rounded-full animate-pulse" />
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm">Mapping course data...</p>
        </div>
    );

    if (error && !course) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-xl shadow-red-500/10">
                <ShieldCheck size={48} />
            </div>
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Access Denied or Unknown Error</h1>
                <p className="text-slate-500 font-medium max-w-md mx-auto">{error || "We couldn't find the course you're looking for."}</p>
            </div>
            <button onClick={() => navigate('/courses')} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 active:scale-95">
                Return to Course Hub
            </button>
        </div>
    );

    const highlights = [
        "Full lifetime access to curriculum",
        "High-definition video library",
        "Practical projects and assignments",
        "Private community mentorship",
        "Professional certification of merit"
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
                {/* Header Navigation */}
                <button
                    onClick={() => navigate(-1)}
                    className="group inline-flex items-center gap-3 text-slate-500 hover:text-indigo-600 font-bold uppercase tracking-widest text-[10px] transition-all mb-12"
                >
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-50 transition-colors">
                        <ChevronLeft size={16} />
                    </div>
                    Back to Learning Hub
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Course Information (Left Side) - 8 columns */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-[0.15em] rounded-full ring-1 ring-indigo-100 shadow-sm">
                                    {course.category || 'SkillNest Course'}
                                </span>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest rounded-full ring-1 ring-amber-100">
                                    <Star size={12} className="fill-amber-500 stroke-amber-500" />
                                    <span>4.9 Perfect Rating</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                                {course.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 py-4 border-b border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-slate-100 overflow-hidden ring-4 ring-slate-50">
                                        <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=6366f1&color=fff`} alt={course.instructor} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Master Instructor</span>
                                        <span className="font-bold text-slate-900">{course.instructor}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                        <Clock size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</span>
                                        <span className="font-bold text-slate-700">{course.duration}</span>
                                    </div>
                                </div>

                                <div className="max-md:hidden flex items-center gap-3">
                                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                        <Globe size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Language</span>
                                        <span className="font-bold text-slate-700">English / Hindi</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Video Preview */}
                        <div className="relative aspect-video rounded-[3.5rem] overflow-hidden group shadow-2xl">
                            <img
                                src={`${API}${course.image}`}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <button className="absolute inset-0 m-auto size-24 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 hover:bg-white/30 border border-white/30">
                                <div className="size-16 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-xl">
                                    <div className="translate-x-0.5" style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid currentColor' }} />
                                </div>
                            </button>
                            <div className="absolute top-6 right-6 flex gap-2">
                                <div className="bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="size-2 bg-red-500 rounded-full animate-pulse" />
                                    Live Preview Available
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-1 bg-indigo-600 rounded-full" />
                                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Course Synopsis</h2>
                                </div>
                                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium italic">
                                    "{course.description}"
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                    <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                                        <BookOpen size={18} className="text-indigo-600" />
                                        What you'll master
                                    </h3>
                                    <div className="space-y-4">
                                        {highlights.map((h, i) => (
                                            <div key={i} className="flex items-start gap-4 group">
                                                <div className="mt-1 flex items-center justify-center size-5 bg-white border border-slate-200 rounded-lg group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                                                    <CheckCircle2 size={14} className="text-emerald-500 group-hover:text-white transition-colors" />
                                                </div>
                                                <span className="text-slate-600 font-medium text-sm leading-tight">{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl shadow-indigo-600/20">
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-xs uppercase tracking-widest opacity-70">Enrollment Status</h3>
                                        <p className="text-2xl font-bold flex items-center gap-2">
                                            <Users size={28} />
                                            {enrolled ? "You're at the Top" : "Join 15,000+ Students"}
                                        </p>
                                    </div>
                                    <div className="pt-8 border-t border-white/10 uppercase tracking-[0.2em] font-bold text-[10px] opacity-60">
                                        Ranked #1 in {course.category || 'Technical'} Skills
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enrollment Sidebar (Right Side) - 4 columns */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-24 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.06)] space-y-8 animate-fade-in-up">
                            <div className="flex flex-col space-y-2">
                                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Lifetime Access</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-slate-900 tracking-tight">₹{course.price || 0}</span>
                                    <span className="text-slate-400 font-bold line-through text-lg">₹{Math.floor((course.price || 999) * 1.5)}</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 py-4 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 rounded-2xl border border-slate-100 transition-all flex items-center justify-center gap-2 group">
                                    <Heart size={20} className="group-hover:fill-red-500 transition-all" />
                                    <span className="font-bold text-sm uppercase tracking-wider">Save</span>
                                </button>
                                <button className="flex-1 py-4 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 rounded-2xl border border-slate-100 transition-all flex items-center justify-center gap-2 group">
                                    <Share2 size={20} />
                                    <span className="font-bold text-sm uppercase tracking-wider">Share</span>
                                </button>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 flex items-center gap-3">
                                    <ShieldCheck size={18} />
                                    {error}
                                </div>
                            )}

                            {enrolled ? (
                                <div className="p-8 bg-emerald-50 text-emerald-700 rounded-[2rem] border border-emerald-100 flex flex-col items-center gap-6 text-center animate-fade-in">
                                    <div className="size-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-600/10 ring-8 ring-emerald-100/50">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-xl uppercase tracking-tight">Active Enrollment</h4>
                                        <p className="text-sm font-medium opacity-80">You have full access to this course's curriculum.</p>
                                    </div>
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/30 active:scale-95"
                                    >
                                        Go to Learning Portal
                                    </button>
                                </div>
                            ) : (
                                <button
                                    disabled={isEnrolling}
                                    onClick={handleEnroll}
                                    className="w-full py-6 bg-slate-900 group-hover:bg-slate-800 text-white text-xl font-bold rounded-[2rem] shadow-2xl relative overflow-hidden group/btn hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                        {isEnrolling ? <Loader2 className="animate-spin" size={24} /> : (
                                            <>
                                                Secure Purchase <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            )}

                            <div className="space-y-6 pt-4">
                                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] relative">
                                    <span className="relative z-10 px-4 bg-white">Guaranteed Excellence</span>
                                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-0" />
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-slate-50 rounded-2xl flex flex-col items-center gap-3 text-center border border-slate-100 group transition-all">
                                        <ShieldCheck size={24} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Elite Secure <br /> Transaction</span>
                                    </div>
                                    <div className="p-5 bg-slate-50 rounded-2xl flex flex-col items-center gap-3 text-center border border-slate-100 group transition-all">
                                        <Calendar size={24} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">30-Day Elite <br /> Guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
