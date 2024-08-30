import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                {/* About Our Quiz Platform Section */}
                <div className="footer-section">
                    <h4>About Our Quiz Platform</h4>
                    <p>We are passionate about empowering learners with engaging and interactive quizzes. Since our inception, we've been dedicated to creating a diverse range of quizzes that challenge, educate, and inspire. Our platform is constantly evolving to provide users with the best possible experience, whether you're a beginner or an expert. Join us on this journey to knowledge and discovery!</p>
                </div>
                {/* Our Company Section */}
                <div className="footer-section">
                    <h4>Our Quiz System</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/quiz/current-affairs">Current Affair</Link></li>
                        <li><Link to="/quiz/computer-fundamentals">Computer Fundamentals</Link></li>
                        <li><Link to="/quiz/react">React.js</Link></li>
                        <li><Link to="/quiz/seo">Seo</Link></li>

                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer-section">
                    <h4>Get in Touch</h4>
                    <p><i className="fas fa-phone"></i> +91 8445150766</p>
                    <p><i className="fas fa-phone"></i> +91 8445541691</p>
                    <p><i className="fas fa-envelope"></i> <a href="mailto:datastringneeraj@gmail.com">Quiz@system.com</a></p>
                    <p><i className="fas fa-map-marker-alt"></i> A- 23, IT Park, Dehradun, Uttarakhand, India, PIN - 248001.</p>
                </div>

                {/* Social Media Section */}
                <div className="footer-section footer-social">
                    <h4>Follow Us On</h4>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube"></i>
                    </a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
