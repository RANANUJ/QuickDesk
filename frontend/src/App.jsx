import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import CreateTicket from './components/CreateTicket';
import TicketDetail from './components/TicketDetail';
import AdminPanel from './components/AdminPanel';
import Spinner from './components/Spinner';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
    const [user, setUser] = useState(null);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading
        setTimeout(() => setIsLoading(false), 500);
        
        // Check for saved user in localStorage
        const savedUser = localStorage.getItem('quickdesk_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error('Failed to parse saved user');
                localStorage.removeItem('quickdesk_user');
            }
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('quickdesk_user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('quickdesk_user');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <Header user={user} onLogout={handleLogout} />
                <main>
                    <Routes>
                        <Route path="/login" element={
                            user ? <Navigate to="/dashboard" /> : <Auth onLoginSuccess={handleLogin} />
                        } />
                        <Route path="/register" element={
                            user ? <Navigate to="/dashboard" /> : <Auth isRegister={true} onLoginSuccess={handleLogin} />
                        } />
                        <Route path="/dashboard" element={
                            user ? <Dashboard user={user} setSelectedTicketId={setSelectedTicketId} /> : <Navigate to="/login" />
                        } />
                        <Route path="/create-ticket" element={
                            user ? <CreateTicket user={user} /> : <Navigate to="/login" />
                        } />
                        <Route path="/ticket/:ticketId" element={
                            user ? <TicketDetail user={user} /> : <Navigate to="/login" />
                        } />
                        <Route path="/admin" element={
                            user && user.role === 'admin' ? <AdminPanel /> : <Navigate to="/dashboard" />
                        } />
                        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
                        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
