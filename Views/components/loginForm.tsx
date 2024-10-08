import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';
import { User, Lock, Mail, LogOut, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
    const { login, user, logout } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(email, password);
            alert('Login berhasil');
        } catch (error) {
            alert('Login gagal');
        }
    };

    const handleLogout = () => {
        logout();
        alert('Logout berhasil');
    };

    const handleCreateAccountClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        navigate('/FormData');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 hover:scale-105">
                {user ? (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                            Selamat Datang, {user.username}!
                        </h1>
                        <div className="flex justify-center">
                            <User size={48} className="text-blue-500" />
                        </div>
                        <button
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center space-x-2"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            <span>Keluar</span>
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Selamat Datang!</h1>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="email">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Masukkan email Anda"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9 text-sm"
                                />
                                <Mail className="absolute left-2 top-2.5 text-gray-400" size={18} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="password">
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan kata sandi Anda"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9 pr-10 text-sm"
                                />
                                <Lock className="absolute left-2 top-2.5 text-gray-400" size={18} />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-xs mb-4">
                            <a
                                className="text-blue-600 hover:text-blue-800 transition duration-300"
                                href="#"
                                onClick={handleCreateAccountClick}
                            >
                                Buat Akun Baru
                            </a>
                            {/* <a
                                className="text-blue-600 hover:text-blue-800 transition duration-300"
                                href="#"
                            >
                                Lupa Kata Sandi?
                            </a> */}
                        </div>
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2"
                            onClick={handleLogin}
                        >
                            <User size={18} />
                            <span>Masuk</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;