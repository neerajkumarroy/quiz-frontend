import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Welcome to the Quiz System</h1>
                <p>Select a quiz topic to get started</p>
            </header>
            <div className="quiz-categories">
                <div className="home-category-card">
                    <h2>React.js Quiz</h2>
                    <Link to="/quiz/react" className="start-quiz-button">Start Quiz</Link>
                </div>
                <div className="home-category-card">
                    <h2>Computer Fundamentals</h2>
                    <Link to="/quiz/computer-fundamentals" className="start-quiz-button">Start Quiz</Link>
                </div>
                <div className="home-category-card">
                    <h2>SEO Quiz</h2>
                    <Link to="/quiz/seo" className="start-quiz-button">Start Quiz</Link>
                </div>
                <div className="home-category-card">
                    <h2>Current Affairs</h2>
                    <Link to="/quiz/current-affairs" className="start-quiz-button">Start Quiz</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
