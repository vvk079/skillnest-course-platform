import { Link } from 'react-router-dom';
import { BookOpen, Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-20 w-full text-slate-500 bg-white border-t border-slate-100">
            <div className="flex flex-col lg:flex-row justify-between w-full gap-20 border-b border-slate-100 pb-16">
                <div className="lg:max-w-md space-y-8">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-600/20">
                            <BookOpen className="text-white" size={28} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
                            Skill<span className="text-indigo-600">Nest</span>
                        </span>
                    </Link>
                    <p className="text-lg leading-relaxed text-slate-500 font-medium">
                        Empowering the next generation of tech leaders through industry-validated learning paths. Join SkillNest and bridge the gap between education and your dream career.
                    </p>
                    <div className="flex items-center gap-4">
                        {[
                            { icon: Twitter, href: "#" },
                            { icon: Instagram, href: "#" },
                            { icon: Linkedin, href: "#" },
                            { icon: Facebook, href: "#" }
                        ].map((social, i) => (
                            <a key={i} href={social.href} className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl border border-slate-100 transition-all shadow-sm active:scale-95">
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-wrap items-start lg:justify-end gap-16 lg:gap-32">
                    <div className="space-y-8">
                        <h2 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">Ecosystem</h2>
                        <ul className="space-y-5">
                            <li><Link to="/" className="text-slate-900 font-bold hover:text-indigo-600 transition-colors uppercase text-sm tracking-widest">Home Portal</Link></li>
                            <li><Link to="/courses" className="text-slate-900 font-bold hover:text-indigo-600 transition-colors uppercase text-sm tracking-widest">Learning Hub</Link></li>
                            <li><Link to="/register" className="text-slate-900 font-bold hover:text-indigo-600 transition-colors uppercase text-sm tracking-widest">Register</Link></li>
                            <li><Link to="/login" className="text-slate-900 font-bold hover:text-indigo-600 transition-colors uppercase text-sm tracking-widest">Student Login</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h2 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">Headquarters</h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <Phone size={18} />
                                </div>
                                <span className="font-bold text-slate-900 text-sm tracking-widest">+91 98765 410</span>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <Mail size={18} />
                                </div>
                                <span className="font-bold text-slate-900 text-sm tracking-widest uppercase">contact@skillnest.edu</span>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl flex-shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                    123 Learning Street, Tech Hub<br />
                                    Bangalore, India 560001
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                <p>© {new Date().getFullYear()} SkillNest EdTech Global. All Rights Reserved.</p>
                <div className="flex gap-10">
                    <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Shield</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
