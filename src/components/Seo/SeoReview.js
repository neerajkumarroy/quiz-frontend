import React, { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';


const SeoReview = ({ location }) => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const Navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/v1/questions/seo');
            const text = await response.text();
            if (!response.ok) {
                throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
            }
            const data = JSON.parse(text);
            setQuestions(data);

            // If the selected answers are passed via the location state, use them
            if (location?.state?.selectedAnswers) {
                setSelectedAnswers(location.state.selectedAnswers);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const getOptionClass = (question, option) => {
        const userAnswer = selectedAnswers[question._id];
        const correctAnswer = question.correctOption;

        if (userAnswer === option) {
            if (userAnswer === correctAnswer) {
                return 'option correct'; // User selected correct option
            } else {
                return 'option incorrect'; // User selected incorrect option
            }
        } else if (option === correctAnswer) {
            return 'option correct'; // Correct option
        }
        return 'option'; // Unselected option
    };

    // Function to handle navigation back to the home page
    const handleBackToHome = () => {
        Navigate('/');
    };

    return (
        <div className="review-content">
            <h2>SEO Quiz Review</h2>
            {questions.length > 0 ? (
                questions.map((question, index) => (
                    <div key={question._id} className="question-container">
                        <p>{index + 1}. {question.question}</p>
                        <ul>
                            {question.options.map((option, idx) => (
                                <li key={idx} className={getOptionClass(question, option)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No questions available for review.</p>
            )}
            {/* Back to Home Button */}
            <button className="back-to-home-btn" onClick={handleBackToHome}>Back to Home</button>
        </div>
    );
};

export default memo(SeoReview);
