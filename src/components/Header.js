import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const authObj = JSON.parse(auth);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const logout = () => {
        localStorage.clear();
        navigate('/admin/login');
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header className="header">
            <div className="header-content">
                <button className="nav-toggle" onClick={toggleNav}>
                    ☰
                </button>
            </div>
            <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={toggleNav}>Home</Link></li>
                    <li><Link to="/quiz/current-affairs" onClick={toggleNav}>Current Affairs</Link></li>
                    <li><Link to="/quiz/computer-fundamentals" onClick={toggleNav}>Computer Fundamentals</Link></li>
                    <li><Link to="/quiz/react" onClick={toggleNav}>React.js</Link></li>
                    <li><Link to="/quiz/seo" onClick={toggleNav}>SEO</Link></li>
                    {auth ? (
                        <li><Link onClick={() => { logout(); toggleNav(); }} to="/admin/login">Logout ({authObj.name})</Link></li>
                    ) : (
                        <li><Link to="/admin/login" onClick={toggleNav}>Admin Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;