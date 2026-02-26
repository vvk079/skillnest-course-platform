import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight, Star } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

const CourseCard = ({ course }) => {
    const { id, title, instructor, duration, price, thumbnail, image, category } = course;
    const displayImage = image ? (image.startsWith('http') ? image : `${API}${image}`) : thumbnail;

    return (
        <div className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] hover:-translate-y-2 transition-all duration-500 ease-out">
            {/* Thumbnail */}
            <div className="aspect-[16/10] w-full bg-slate-100 relative overflow-hidden">
                {displayImage ? (
                    <img
                        src={displayImage}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 group-hover:bg-indigo-50 transition-colors">
                        <span className="text-indigo-300 font-bold text-5xl opacity-30 capitalize group-hover:scale-110 transition-transform duration-500">{title.charAt(0)}</span>
                    </div>
                )}

                <div className="absolute top-4 left-4 flex gap-2">
                    {category && (
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-600 rounded-lg shadow-sm">
                            {category}
                        </span>
                    )}
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-[10px] font-bold text-slate-700">4.8</span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight min-h-[3rem]">
                    {title}
                </h3>

                <div className="mt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            <User size={14} className="text-indigo-500" />
                        </div>
                        <span className="text-slate-500">{instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            <Clock size={14} className="text-indigo-500" />
                        </div>
                        <span className="text-slate-500">{duration}</span>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-0.5">Price</span>
                        <span className="text-2xl font-bold text-slate-900 leading-none">
                            {price === 0 ? 'Free' : `₹${price}`}
                        </span>
                    </div>
                    <Link
                        to={`/courses/${id}`}
                        className="flex items-center justify-center w-12 h-12 bg-slate-900 group-hover:bg-indigo-600 text-white rounded-2xl transition-all duration-500 group-hover:w-32 overflow-hidden relative"
                    >
                        <div className="flex items-center justify-center font-bold text-sm">
                            <span className="max-w-0 opacity-0 group-hover:max-w-[4rem] group-hover:opacity-100 transition-all duration-500 overflow-hidden whitespace-nowrap group-hover:mr-2">Enroll</span>
                            <ArrowRight size={20} className="flex-shrink-0" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
