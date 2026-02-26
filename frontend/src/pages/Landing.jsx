import { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, PlayCircle, Loader2 } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const { isAuthenticated } = useAuth();
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses');
                // Get first 3 as featured, map _id to id
                const formatted = response.data.slice(0, 3).map(c => ({
                    ...c,
                    id: c._id
                }));
                setFeaturedCourses(formatted);
            } catch (error) {
                console.error('Error fetching featured courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const Feature = ({ icon: Icon, title, desc }) => (
        <div className="flex flex-col items-start text-left p-8 space-y-5 bg-white rounded-[2rem] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 group">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                <Icon size={28} />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-24 md:space-y-40">
            {/* Hero Section */}
            <section className="pb-20 md:pb-32 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat text-slate-800 animate-fade-in relative overflow-hidden">
                <div className="flex flex-col-reverse gap-10 md:flex-row px-4 md:px-16 lg:px-24 xl:px-32 mt-12 md:mt-24 items-center">
                    <div className="max-md:text-center flex-1 space-y-8 animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-600 text-transparent bg-clip-text">
                            Build Skills That <br /> Get You Hired
                        </h1>

                        <p className="text-base md:text-lg max-w-lg mt-6 text-slate-600 leading-relaxed font-medium">
                            Join a world-class learning journey built to turn you into a high-performing professional. Master in-demand tech skills and get noticed by top companies.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-8 max-md:justify-center">
                            {!isAuthenticated && (
                                <Link to="/register" className="px-10 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
                                    Get Started
                                </Link>
                            )}
                            <Link to="/courses" className="px-8 py-4 rounded-2xl bg-white text-indigo-600 border-2 border-indigo-100 flex items-center gap-2 hover:bg-indigo-50 active:scale-95 transition-all font-bold text-lg shadow-lg">
                                <span>Our courses</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>

                        <div className="flex items-center gap-4 mt-12 max-md:justify-center">
                            <div className="flex -space-x-4 pr-2">
                                {[
                                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
                                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
                                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
                                    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200",
                                    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200"
                                ].map((url, i) => (
                                    <img key={i} src={url} alt="User" className="size-11 border-4 border-white rounded-full hover:-translate-y-1 transition duration-300 shadow-sm" style={{ zIndex: 10 - i }} />
                                ))}
                            </div>
                            <div className="space-y-1 text-left">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} width="16" height="16" viewBox="0 0 13 12" fill="#FF8F20"><path d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z" /></svg>
                                    ))}
                                </div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Joined by 10,000+ students</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full flex justify-center md:justify-end animate-float">
                        <img className="w-full max-w-2xl h-auto drop-shadow-[0_20px_50px_rgba(99,102,241,0.2)]" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/users-group.png" alt="Students Group" />
                    </div>
                </div>
            </section>

            {/* Stats/Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center space-y-4 mb-20 animate-fade-in-up">
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-[0.2em] rounded-full">Why SkillNest?</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">The smarter way to learn</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Feature
                        icon={BookOpen}
                        title="Expert-Led Content"
                        desc="Learn from real-world practitioners with years of industry experience and deep subject knowledge."
                    />
                    <Feature
                        icon={Users}
                        title="Active Community"
                        desc="Connect with thousands of fellow learners in our dedicated forums and live Q&A sessions."
                    />
                    <Feature
                        icon={Award}
                        title="Certified Completion"
                        desc="Earn industry-recognized certificates that showcase your expertise to potential employers."
                    />
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
                    <div className="space-y-4 max-md:text-center">
                        <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-[0.2em] rounded-full">Explore Platform</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Our Best Programs</h2>
                    </div>
                    <Link to="/courses" className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-2xl border-2 border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 transition-all flex items-center gap-2 shadow-sm text-sm">
                        View all learning paths <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-20">
                            <Loader2 className="animate-spin text-indigo-600" size={48} />
                        </div>
                    ) : featuredCourses.length > 0 ? (
                        featuredCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No courses featured yet</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-[0_40px_100px_rgba(99,102,241,0.15)]">
                    <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                            Ready to accelerate your <span className="text-indigo-400">career journey?</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Join thousands of students building their futures on SkillNest. Start your learning path today and get hired by world-class companies.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            {!isAuthenticated && (
                                <Link
                                    to="/register"
                                    className="px-12 py-5 bg-white text-slate-900 text-xl font-bold rounded-[2rem] hover:bg-indigo-50 hover:scale-105 transition-all shadow-2xl"
                                >
                                    Get Started for Free
                                </Link>
                            )}
                            <Link
                                to="/courses"
                                className="px-12 py-5 bg-slate-800 text-white text-xl font-bold rounded-[2rem] border border-slate-700 hover:bg-slate-700 transition-all shadow-xl"
                            >
                                Explore Courses
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-transparent to-transparent opacity-50" />
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[40rem] h-[40rem] bg-indigo-600 opacity-20 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-blue-600 opacity-10 blur-[100px] rounded-full" />
                </div>
            </section>
        </div>
    );
};

export default Landing;
