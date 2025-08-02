import React, { useState } from 'react';
import { LogIn, LogOut, ChevronsUpDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex-shrink-0 text-2xl font-bold text-blue-600 dark:text-blue-400">QuickDesk</Link>
                        <nav className="hidden md:flex md:ml-10 md:space-x-8">
                            <Link to="/dashboard" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Dashboard</Link>
                            {user && (
                                <Link to="/create-ticket" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">New Ticket</Link>
                            )}
                            {user?.role === 'admin' && (
                                <Link to="/admin" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Admin</Link>
                            )}
                        </nav>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, {user.email} ({user.role})</span>
                                    <button onClick={handleLogout} className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                        <LogOut className="mr-2 h-5 w-5" /> Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    <LogIn className="mr-2 h-5 w-5" /> Login
                                </Link>
                            )}
                        </div>
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 dark:text-gray-300">
                                <ChevronsUpDown size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Dashboard</Link>
                        {user && (
                            <Link to="/create-ticket" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">New Ticket</Link>
                        )}
                        {user?.role === 'admin' && (
                            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Admin</Link>
                        )}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                        {user ? (
                            <div className="px-5">
                                <p className="text-base font-medium text-gray-800 dark:text-white">{user.email}</p>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.role}</p>
                                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="mt-3 flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <LogOut className="mr-2 h-5 w-5" /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="px-2">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <LogIn className="mr-2 h-5 w-5" /> Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;