import { useState, useEffect } from 'react';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import { Search, SlidersHorizontal, Loader2, Sparkles } from 'lucide-react';

const CourseListing = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await api.get('/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course =>
        (course.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                <div className="space-y-4 max-md:text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                        <Sparkles size={14} className="animate-pulse" />
                        Explore Our Platform
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                        Master New <span className="text-indigo-600">Skills</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-xl">
                        Discover your next favorite skill from our curated collection of industry-leading programs.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-96 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search courses or categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm font-medium placeholder:text-slate-400"
                        />
                    </div>
                    <button className="p-4 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm active:scale-95">
                        <SlidersHorizontal size={24} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="min-h-[500px] flex flex-col items-center justify-center gap-6 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                    <div className="relative">
                        <Loader2 className="animate-spin text-indigo-600" size={64} />
                        <div className="absolute inset-0 blur-xl bg-indigo-500/20 rounded-full animate-pulse" />
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm">Building learning paths...</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredCourses.map((course, index) => (
                                <div key={course._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <CourseCard course={{ ...course, id: course._id }} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200 space-y-8 animate-fade-in">
                            <div className="mx-auto w-24 h-24 bg-white text-indigo-500 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/10 ring-8 ring-indigo-50/50">
                                <Search size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">No courses found</h3>
                                <p className="text-slate-500 font-medium">We couldn't find any courses matching your search criteria.</p>
                            </div>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 active:scale-95"
                            >
                                Clear all search filters
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CourseListing;
