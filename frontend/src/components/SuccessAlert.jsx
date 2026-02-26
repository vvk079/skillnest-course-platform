import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessAlert = ({ message, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -20, x: '-50%' }}
                    className="fixed top-24 left-1/2 z-[100] flex items-center justify-between text-indigo-600 max-w-sm w-full shadow-2xl bg-white h-14 rounded-xl border border-indigo-100 overflow-hidden"
                >
                    <div className="h-full w-1.5 bg-indigo-600"></div>
                    <div className="flex items-center flex-1 px-4">
                        <div className="bg-indigo-50 p-1.5 rounded-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.95 16.5h.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 12a9 9 0 0 1 9-9h0a9 9 0 0 1 9 9h0a9 9 0 0 1-9 9h0a9 9 0 0 1-9-9m9 0V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className="text-sm font-bold ml-3 text-slate-800 tracking-tight">{message || "Success! Task completed."}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="active:scale-90 transition-all mr-4 text-slate-400 hover:text-indigo-600 p-1 hover:bg-slate-50 rounded-lg"
                    >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SuccessAlert;
