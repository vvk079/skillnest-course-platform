import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const result = await login(email, password);

        if (result.success) {
            navigate(result.role === 'admin' ? '/admin' : from, { replace: true });
        } else {
            setError(result.error);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 bg-slate-50/50">
            <form onSubmit={handleSubmit} className="sm:w-[400px] w-full text-center border border-gray-300/60 rounded-[2.5rem] px-8 bg-white shadow-2xl shadow-slate-200/50 py-10 animate-fade-in-up">
                <h1 className="text-gray-900 text-4xl font-bold tracking-tight mb-2">Login</h1>
                <p className="text-gray-500 text-sm font-medium mb-8">Please sign in to continue</p>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm animate-shake">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex items-center w-full bg-slate-50 border border-gray-300/80 h-14 rounded-full overflow-hidden pl-6 gap-3 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="bg-transparent border-none outline-none ring-0 w-full text-slate-700 font-medium placeholder:text-slate-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center w-full bg-slate-50 border border-gray-300/80 h-14 rounded-full overflow-hidden pl-6 gap-3 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="bg-transparent border-none outline-none ring-0 w-full text-slate-700 font-medium placeholder:text-slate-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mt-4 text-right">
                    <button className="text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors" type="button">Forget password?</button>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-8 w-full h-14 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 font-bold text-lg shadow-lg shadow-indigo-500/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Processing...' : 'Login'}
                </button>

                <p className="text-gray-500 text-sm mt-8 mb-4 font-medium">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-500 font-bold hover:underline ml-1">click here</Link>
                </p>

                {/* Admin Hint */}
                <div className="mt-6 p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl text-center">
                    <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">
                        Admin Login: admin@skillnest.com
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
