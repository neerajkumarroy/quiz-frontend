import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const base_Url = 'https://quiz-backend-90jn.onrender.com';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async () => {
        if (!email || !password) {
            setError(true);
            toast.error("Please enter both email and password.");
            return;
        }

        try {
            let response = await fetch(`${base_Url}/api/v1/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseText = await response.text();
            console.log('Server response:', responseText);

            let result;
            try {
                result = JSON.parse(responseText);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                toast.error('Server response is not valid JSON');
                return;
            }

            if (result.auth) {
                toast.success('Login Successful...');
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem("token", JSON.stringify(result.auth));
                toast.success('Login Successful...');
                navigate("/admin");
            } else {
                toast.error('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('An error occurred while logging in. Please try again later.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='admin-login-container'>
            <ToastContainer /> {/* Ensure this is included in the component */}
            <div className='admin-login-box'>
                <h1 className='admin-login-heading'>Admin Login</h1>
                <p className='admin-login-subheading'>
                    Welcome back! Please log in with your credentials to access the admin dashboard.
                </p>

                <div className='admin-login-form'>
                    <input
                        className='admin-login-input'
                        type='text'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && !email && <span className='admin-login-error'>*Please enter a valid email.</span>}

                    <div className='password-container'>
                        <input
                            className='admin-login-input'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className='password-toggle-icon' onClick={togglePasswordVisibility}>
                            {showPassword ? '👁️' : '🙈'}
                        </span>
                    </div>
                    {error && !password && <span className='admin-login-error'>*Please enter a valid password.</span>}

                    <button className='admin-login-btn' type='button' onClick={handleLogin}>Log In</button>
                </div>

                <div className='admin-login-info'>
                    <p>If you are experiencing issues logging in, please contact the system administrator.</p>
                    <p>New to the admin panel? <a href="/signup-error">Sign up here</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
