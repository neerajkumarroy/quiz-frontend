import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ComputerFundamentalsResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalQuestions, correctCount, incorrectQuestions, percentage, correctAnswers, attemptedQuestions } = location.state || {};

    // Function to calculate dropped questions
    const calculateDroppedQuestions = () => {
        return totalQuestions - attemptedQuestions;
    };

    // Function to navigate back to the Computer Fundamentals quiz review page with correct answers highlighted
    const handleReviewQuiz = () => {
        navigate('/quiz/computer-fundamentals-review', { state: { correctAnswers } }); // Ensure the path matches your route configuration
    };

    return (
        <div className="results-page">
            <div className="results-card">
                <h2>Computer Fundamentals Quiz Results</h2>
                <p>Total Questions: <span>{totalQuestions}</span></p>
                <p style={{ color: 'green' }}>Correct Answers: <span>{correctCount}</span></p>
                <p style={{ color: 'red' }}>Incorrect Answers: <span>{incorrectQuestions.length}</span></p>
                <p>Attempted Questions: <span>{attemptedQuestions}</span></p>
                <p style={{ color: 'red' }}>Dropped Questions: <span>{calculateDroppedQuestions()}</span></p>
                <p style={{ color: 'green' }}>Percentage: <span>{percentage.toFixed(2)}%</span></p>
                <button
                    onClick={() => navigate('/quiz/computer-fundamentals')}
                    className="previous-button"
                >
                    Back to Quiz
                </button>
                <button
                    onClick={handleReviewQuiz}
                    className="review-quiz-button"
                >
                    Review Quiz
                </button>
            </div>
        </div>
    );
};

export default ComputerFundamentalsResultsPage;
