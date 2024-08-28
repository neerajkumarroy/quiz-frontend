import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PreviewPage = () => {
    const [questions, setQuestions] = useState([]);
    const location = useLocation();
    const { selectedAnswers } = location.state || {};

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/v1/questions/react-js');
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    return (
        <div className="preview-page">
            <h2>Preview Your Answers</h2>
            {questions.map((question, index) => (
                <div key={question._id} className="question-container">
                    <p>{index + 1}. {question.question}</p>
                    <form>
                        {question.options.map((option, idx) => (
                            <label key={idx}>
                                <input
                                    type="radio"
                                    name={`question${question._id}`}
                                    value={option}
                                    checked={selectedAnswers && selectedAnswers[question._id] === option} // Radio button is filled if the option is selected
                                    readOnly // Make the radio button non-interactive
                                />
                                {option}
                            </label>
                        ))}
                    </form>
                </div>
            ))}
        </div>
    );
};

export default PreviewPage;
