import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                        className="relative bg-white/95 backdrop-blur-2xl w-full max-w-xl rounded-[3rem] shadow-2xl border border-white overflow-hidden"
                    >
                        <div className="px-10 py-8 border-b border-slate-100/60 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h3>
                            <button
                                onClick={onClose}
                                className="w-12 h-12 flex items-center justify-center bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-primary-600 hover:rotate-90 rounded-2xl transition-all"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-10">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
