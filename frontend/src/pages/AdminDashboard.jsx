import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import SuccessAlert from '../components/SuccessAlert';
import api from '../services/api';
import { Plus, Edit2, Trash2, Search, Filter, Loader2, Users, LayoutDashboard, Settings, PieChart, ArrowUpRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CourseForm = ({ formData, handleChange, handleFileChange, handleSubmit, setIsModalOpen, editingCourse }) => (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Course Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                    placeholder="e.g. Advanced Python 2026"
                    required
                />
            </div>
            <div className="col-span-full space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                    placeholder="Course description..."
                    rows={3}
                    required
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Instructor</label>
                <input
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Price (₹)</label>
                <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Duration</label>
                <input
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                    placeholder="e.g. 12h 30m"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                    placeholder="e.g. Development"
                />
            </div>
            <div className="col-span-full space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Course Thumbnail</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
            </div>
        </div>
        <div className="pt-4 flex gap-4">
            <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl border border-slate-200"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="flex-1 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 shadow-lg shadow-primary-500/20"
            >
                {editingCourse ? 'Save Changes' : 'Create Course'}
            </button>
        </div>
    </form>
);

const AdminDashboard = () => {
    const location = useLocation();
    const path = location.pathname;

    const isOverview = path === '/admin';
    const isCoursesView = path === '/admin/courses';
    const isStudentsView = path === '/admin/students';
    const isStatsView = path === '/admin/stats';
    const isSettingsView = path === '/admin/settings';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        price: '',
        category: '',
        image: null,
    });

    const enrollmentCounts = useMemo(() => {
        const counts = {};
        students.forEach(student => {
            student.enrolledCourses?.forEach(course => {
                const courseId = course._id || course;
                counts[courseId] = (counts[courseId] || 0) + 1;
            });
        });
        return counts;
    }, [students]);

    const totalRevenue = useMemo(() => {
        let total = 0;
        students.forEach(student => {
            student.enrolledCourses?.forEach(course => {
                total += (course.price || 0);
            });
        });
        return total.toLocaleString('en-IN');
    }, [students]);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            await Promise.all([fetchCourses(), fetchStudents()]);
            setLoading(false);
        };
        loadInitialData();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await api.get('/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await api.get('/enroll/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const openModal = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({
                title: course.title || '',
                description: course.description || '',
                instructor: course.instructor || '',
                duration: course.duration || '',
                price: course.price || '',
                category: course.category || '',
            });
        } else {
            setEditingCourse(null);
            setFormData({ title: '', description: '', instructor: '', duration: '', price: '', category: '', image: null });
        }
        setIsModalOpen(true);
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null) {
                    data.append(key, formData[key]);
                }
            });

            if (editingCourse) {
                await api.put(`/courses/${editingCourse._id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setSuccessMsg('Course updated successfully!');
            } else {
                await api.post('/courses', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setSuccessMsg('New course created successfully!');
            }
            setIsModalOpen(false);
            setShowSuccess(true);
            fetchCourses();
        } catch (error) {
            console.error('Error saving course:', error);
            alert(error.response?.data?.message || 'Failed to save course');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await api.delete(`/courses/${id}`);
                fetchCourses();
            } catch (error) {
                console.error('Error deleting course:', error);
                alert(error.response?.data?.message || 'Failed to delete course');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={path}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-7xl mx-auto space-y-8"
                    >
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="space-y-2"
                            >
                                <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                                    {isCoursesView ? 'Course Management' :
                                        isStudentsView ? 'Student Directory' :
                                            isStatsView ? 'Advanced Analytics' :
                                                isSettingsView ? 'System Settings' :
                                                    'System Overview'}
                                </h1>
                                <p className="text-slate-500 text-lg font-medium">
                                    {isCoursesView ? 'Create, update and organize your educational content.' :
                                        isStudentsView ? 'Monitor student enrollment and progress across courses.' :
                                            isStatsView ? 'In-depth performance metrics and revenue tracking.' :
                                                isSettingsView ? 'Configure API keys, branding, and system preferences.' :
                                                    'Manage your students, courses and system settings.'}
                                </p>
                            </motion.div>
                            {(isOverview || isCoursesView) && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => openModal()}
                                    className="px-8 py-4 bg-primary-600 text-white font-bold rounded-2xl flex items-center gap-3 hover:bg-primary-700 transition-all shadow-2xl shadow-primary-500/30"
                                >
                                    <Plus size={24} /> Add New Course
                                </motion.button>
                            )}
                        </div>

                        {/* Content Logic */}
                        {isOverview && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { label: 'Total Courses', value: courses.length, growth: 'Live', icon: BookOpen, color: 'blue' },
                                    { label: 'Total Students', value: students.length, growth: '+12%', icon: Users, color: 'purple' },
                                    { label: 'Avg Rating', value: '4.8', growth: 'Elite', icon: PieChart, color: 'amber' },
                                    { label: 'Revenue', value: `₹${totalRevenue}`, growth: '+8%', icon: ArrowUpRight, color: 'green' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white px-6 py-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-primary-500/10 transition-all group lg:min-h-[140px] flex flex-col justify-between"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-primary-50 transition-colors">
                                                <stat.icon size={20} className="text-slate-400 group-hover:text-primary-600 transition-colors" />
                                            </div>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${i % 2 === 0 ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {stat.growth}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-bold text-slate-900 tracking-tight">{stat.value}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Table Section */}
                        {(isOverview || isCoursesView) && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/90 backdrop-blur-2xl rounded-[3rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden"
                            >
                                <div className="px-10 py-8 border-b border-slate-100/60 flex flex-col sm:flex-row justify-between items-center gap-6">
                                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                                        {isCoursesView ? 'Course Archive' : 'Active Curriculums'}
                                    </h2>
                                    <div className="flex items-center gap-3">
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={18} />
                                            <input className="pl-11 pr-6 py-3 bg-slate-50/50 border border-slate-200/60 rounded-2xl text-sm focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all w-64" placeholder="Deep search..." />
                                        </div>
                                        <button className="p-3 bg-slate-50/50 text-slate-400 rounded-2xl border border-slate-200/60 hover:text-slate-600 hover:bg-slate-100 transition-all"><Filter size={20} /></button>
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="py-32 flex items-center justify-center">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        >
                                            <Loader2 size={48} className="text-primary-600" />
                                        </motion.div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-slate-50/50 uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400">
                                                <tr>
                                                    <th className="px-10 py-6">Course Identity</th>
                                                    <th className="px-8 py-6">Lead Instructor</th>
                                                    <th className="px-8 py-6">Segment</th>
                                                    <th className="px-8 py-6">Investment (₹)</th>
                                                    <th className="px-10 py-6 text-right">Operations</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                <AnimatePresence>
                                                    {courses.map((course, idx) => (
                                                        <motion.tr
                                                            key={course._id}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 * idx }}
                                                            className="hover:bg-primary-50/30 transition-all group cursor-default"
                                                        >
                                                            <td className="px-10 py-8">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 font-bold shrink-0">
                                                                        {course.title.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-bold text-slate-900 leading-tight mb-1">{course.title}</p>
                                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{course.duration || 'Session Based'}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-8">
                                                                <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{course.instructor || 'Staff'}</span>
                                                            </td>
                                                            <td className="px-8 py-8">
                                                                <span className="px-3 py-1.5 rounded-xl text-[10px] font-bold bg-primary-100/50 text-primary-700 tracking-widest uppercase">
                                                                    {course.category || 'General'}
                                                                </span>
                                                            </td>
                                                            <td className="px-8 py-8">
                                                                <span className="text-sm font-bold text-slate-900">₹{course.price || 0}</span>
                                                            </td>
                                                            <td className="px-10 py-8 text-right">
                                                                <div className="flex items-center justify-end gap-6">
                                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 transition-all group-hover:bg-primary-50 group-hover:border-primary-100 group-hover:text-primary-600">
                                                                        <Users size={14} className="group-hover:scale-110 transition-transform" />
                                                                        <span className="text-xs font-bold tracking-tight whitespace-nowrap">
                                                                            {enrollmentCounts[course._id] || 0} Students
                                                                        </span>
                                                                    </div>

                                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-3 group-hover:translate-x-0">
                                                                        <motion.button
                                                                            whileHover={{ scale: 1.1 }}
                                                                            whileTap={{ scale: 0.9 }}
                                                                            onClick={() => openModal(course)}
                                                                            className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all"
                                                                        >
                                                                            <Edit2 size={16} />
                                                                        </motion.button>
                                                                        <motion.button
                                                                            whileHover={{ scale: 1.1, color: '#ef4444' }}
                                                                            whileTap={{ scale: 0.9 }}
                                                                            onClick={() => handleDelete(course._id)}
                                                                            className="p-2.5 text-slate-400 hover:bg-red-50 rounded-xl shadow-sm border border-transparent hover:border-red-100 transition-all"
                                                                        >
                                                                            <Trash2 size={16} />
                                                                        </motion.button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    ))}
                                                </AnimatePresence>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {isStudentsView && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/90 backdrop-blur-2xl rounded-[3rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden"
                            >
                                <div className="px-10 py-8 border-b border-slate-100/60 flex flex-col sm:flex-row justify-between items-center gap-6">
                                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Registered Talent</h2>
                                    <div className="relative group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input className="pl-11 pr-6 py-3 bg-slate-50/50 border border-slate-200/60 rounded-2xl text-sm outline-none w-64" placeholder="Track students..." />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50/50 uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400">
                                            <tr>
                                                <th className="px-10 py-6">Student Profile</th>
                                                <th className="px-8 py-6">Communication</th>
                                                <th className="px-8 py-6">Active Enrollments</th>
                                                <th className="px-10 py-6 text-right">Registration Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {students.map((student, idx) => (
                                                <motion.tr
                                                    key={student._id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.05 * idx }}
                                                    className="hover:bg-primary-50/30 transition-all group"
                                                >
                                                    <td className="px-10 py-8">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/20">
                                                                {student.name.charAt(0)}
                                                            </div>
                                                            <span className="font-extrabold text-slate-900 text-base">{student.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-8">
                                                        <span className="text-sm font-semibold text-slate-500 hover:text-primary-600 cursor-pointer transition-colors">{student.email}</span>
                                                    </td>
                                                    <td className="px-8 py-8">
                                                        <div className="flex flex-wrap gap-2 max-w-sm">
                                                            {student.enrolledCourses?.length > 0 ? student.enrolledCourses.map(course => (
                                                                <span key={course._id} className="px-3 py-1.5 rounded-xl text-[10px] font-black bg-white border border-slate-100 shadow-sm text-slate-600 uppercase tracking-tighter">
                                                                    {course.title}
                                                                </span>
                                                            )) : <span className="text-xs text-slate-400 italic font-bold">In-Transit Enrollment</span>}
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8 text-sm font-black text-slate-400 text-right">
                                                        {new Date(student.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {!(isOverview || isCoursesView || isStudentsView) && (
                            /* Placeholder for other views */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/70 backdrop-blur-3xl rounded-[4rem] border border-white shadow-2xl p-32 flex flex-col items-center justify-center text-center space-y-8"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="p-10 bg-slate-50 rounded-[3rem] text-slate-300 shadow-inner"
                                >
                                    {isStatsView ? <PieChart size={80} /> :
                                        isSettingsView ? <Settings size={80} /> :
                                            <LayoutDashboard size={80} />}
                                </motion.div>
                                <div className="space-y-3">
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Developing Module</h3>
                                    <p className="text-slate-500 text-lg font-medium max-w-md mx-auto">This engineering space is currently being optimized for high-performance administration.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-3 h-3 rounded-full bg-primary-200 animate-pulse" />
                                    <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse [animation-delay:200ms]" />
                                    <div className="w-3 h-3 rounded-full bg-primary-600 animate-pulse [animation-delay:400ms]" />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingCourse ? 'Edit Course' : 'Create New Course'}
            >
                <CourseForm
                    formData={formData}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                    setIsModalOpen={setIsModalOpen}
                    editingCourse={editingCourse}
                />
            </Modal>

            <SuccessAlert
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                message={successMsg}
            />
        </div>
    );
};

export default AdminDashboard;
