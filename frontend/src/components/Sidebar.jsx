import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Settings, PieChart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const links = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Courses', icon: BookOpen, path: '/admin/courses' },
        { name: 'Students', icon: Users, path: '/admin/students' },
        { name: 'Analytics', icon: PieChart, path: '/admin/stats' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="w-64 bg-slate-950 min-h-screen text-slate-500 p-6 flex flex-col hidden lg:flex border-r border-slate-900"
        >
            <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="bg-primary-600/10 p-2 rounded-xl border border-primary-500/20"
                >
                    <BookOpen className="text-primary-500" size={20} />
                </motion.div>
                <span className="text-xl font-bold text-white tracking-tight">Skill<span className="text-primary-500">Nest</span></span>
            </div>

            <nav className="flex-1 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold group"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute left-0 w-1 h-6 bg-primary-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon
                                size={18}
                                className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'group-hover:text-white group-hover:translate-x-1 transition-transform'}`}
                            />
                            <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'group-hover:text-white group-hover:translate-x-1 transition-transform'}`}>
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-900/50">
                <motion.button
                    whileHover={{ x: 4, color: '#ef4444' }}
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/5 transition-all text-slate-600 font-bold text-sm uppercase tracking-wider"
                >
                    <LogOut size={18} />
                    Sign Out
                </motion.button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
