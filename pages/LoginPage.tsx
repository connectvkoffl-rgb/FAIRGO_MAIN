import React, { useState } from 'react';
import { login } from '../services/authService';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { Logo } from '../components/Logo';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);
        if (!success) {
            setError('Invalid username or password.');
        }
        // The App component will handle the redirect on auth state change
    };

    return (
        <div className="bg-[#01010c] text-gray-300 min-h-screen flex items-center justify-center font-sans">
            <BackgroundAnimation />
            <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm">
                <div className="text-center">
                    <Logo className="h-14 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white">Admin Login</h1>
                </div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-400">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            placeholder="admin"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-400">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            placeholder="password"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-white text-black px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;