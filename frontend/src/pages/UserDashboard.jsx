import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Book, Clock, GraduationCap, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const { user } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get('/user/dashboard');
                setEnrolledCourses(response.data.enrolledCourses || []);
            } catch (error) {
                console.error('Error fetching dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-600" size={40} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
            <header className="mb-10 animate-fade-in-up stagger-1">
                <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
                <p className="text-slate-500 mt-2">Track your progress and continue where you left off.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content: Course Progress */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-slate-800">My Enrolled Courses</h2>
                    <div className="space-y-4">
                        {enrolledCourses.length > 0 ? (
                            enrolledCourses.map(course => (
                                <div key={course._id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                                        <Book size={32} />
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-slate-900">{course.title}</h3>
                                                <p className="text-sm text-slate-500">Instructor: {course.instructor || 'N/A'}</p>
                                            </div>
                                            <span className="text-sm font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                                                {course.category || 'General'}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-xs text-slate-400">
                                                Duration: <span className="text-slate-600 font-medium">{course.duration || 'N/A'}</span>
                                            </p>
                                            <Link to={`/courses/${course._id}`} className="text-sm font-bold text-slate-900 flex items-center gap-1 hover:text-primary-600 transition-colors">
                                                Continue <ChevronRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                                <Book className="mx-auto text-slate-300 mb-4" size={48} />
                                <h3 className="text-lg font-bold text-slate-900">No courses yet</h3>
                                <p className="text-slate-500 mt-1">Explore courses and enroll to get started!</p>
                                <Link to="/courses" className="mt-4 inline-block px-6 py-2 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all">
                                    Browse Courses
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar: Stats */}
                <div className="space-y-6">
                    <div className="bg-primary-600 rounded-3xl p-6 text-white shadow-lg shadow-primary-500/20">
                        <h3 className="font-bold text-lg mb-4">Learning Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-2 rounded-lg"><Clock size={20} /></div>
                                <div>
                                    <p className="text-xs text-primary-100 opacity-80">Enrolled Courses</p>
                                    <p className="font-bold">{enrolledCourses.length}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-2 rounded-lg"><GraduationCap size={20} /></div>
                                <div>
                                    <p className="text-xs text-primary-100 opacity-80">Keep Learning!</p>
                                    <p className="font-bold">🚀</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">New For You</h3>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            <p className="text-sm text-slate-500 text-center italic">
                                Explore new courses to earn more badges!
                            </p>
                            <Link to="/courses" className="mt-4 block w-full text-center py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                                Explore
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
