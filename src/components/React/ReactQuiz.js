import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';

const ReactQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState(720); // 900 seconds for 15 minutes
    const [showPopup, setShowPopup] = useState(false);
    const [showExplanations, setShowExplanations] = useState({});
    const [showSlider, setShowSlider] = useState(false); // State to manage slider visibility
    const [showInitialPopup, setShowInitialPopup] = useState(true); // State to manage initial popup visibility
    const questionsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeRemaining === 120) {
            setShowPopup(true);
        }
    }, [timeRemaining]);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/v1/questions/react-js'); // Update the URL for React quiz
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleAnswerChange = (questionId, value) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    };

    const handleToggleExplanation = (questionId) => {
        setShowExplanations((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const totalPages = Math.ceil(questions.length / questionsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSubmit = () => {
        const correctAnswers = questions.reduce((acc, question) => {
            acc[question._id] = question.correctOption;
            return acc;
        }, {});

        let correctCount = 0;
        let attemptedQuestions = 0;
        const incorrectQuestions = [];

        for (const [questionId, answer] of Object.entries(selectedAnswers)) {
            if (answer) {
                attemptedQuestions++;
                if (correctAnswers[questionId] === answer) {
                    correctCount++;
                } else {
                    const question = questions.find(q => q._id === questionId);
                    incorrectQuestions.push({
                        id: questionId,
                        question: question.question,
                        selectedAnswer: answer,
                        correctAnswer: correctAnswers[questionId],
                    });
                }
            }
        }

        const totalQuestions = questions.length;
        const percentage = (correctCount / totalQuestions) * 100;

        navigate('/quiz/react-results', { state: { totalQuestions, correctCount, incorrectQuestions, percentage, correctAnswers, attemptedQuestions } });
    };

    const startIndex = (currentPage - 1) * questionsPerPage;
    const selectedQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

    const handleToggleSlider = () => {
        setShowSlider(!showSlider);
    };

    const handleQuestionSelect = (pageNumber) => {
        setCurrentPage(pageNumber);
        setShowSlider(false); // Close the slider after selection
    };

    const getSliderItemClass = (questionIndex) => {
        const questionId = questions[questionIndex]._id;
        return selectedAnswers[questionId] ? 'attempted' : 'not-attempted';
    };

    const handleStartQuiz = () => {
        setShowInitialPopup(false); // Hide the initial popup and start the quiz
    };

    return (
        <div className="quiz-content">
            {showInitialPopup && (
                <>
                    <div className="overlay"></div>
                    <div className="initial-popup">
                        <div className="popup-content">
                            <h2>Welcome to the React.js Quiz</h2>
                            <p>Are you ready to start the quiz?</p>
                            <button onClick={handleStartQuiz}>Start Quiz</button>
                        </div>
                    </div>
                </>
            )}

            {!showInitialPopup && (
                <>
                    {/* Existing quiz content goes here */}
                    <h2 className='title-name'>React.js Quiz</h2>

                    <div className="header-controls">
                        <button className="slider-toggle-button" onClick={handleToggleSlider}>
                            Question List
                        </button>
                        <div className="timer">Time Remaining: {formatTime(timeRemaining)}</div>
                    </div>

                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <h2>Time Warning</h2>
                                <p>You have 2 minutes remaining!</p>
                                <button onClick={handleClosePopup}>Close</button>
                            </div>
                        </div>
                    )}

                    {showSlider && (
                        <div className="slider">
                            <h1>Browse Through Your Questions: Select a Number to Navigate Easily</h1>

                            <ul>
                                {questions.map((_, index) => (
                                    <li key={index}>
                                        <button
                                            className={getSliderItemClass(index)}
                                            onClick={() => handleQuestionSelect(Math.floor(index / questionsPerPage) + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {selectedQuestions.map((question, index) => (
                        <div key={question._id} className="question-container">
                            <p>{index + 1 + startIndex}. {question.question}</p>
                            <form>
                                {question.options.map((option, idx) => (
                                    <label key={idx}>
                                        <input
                                            type="radio"
                                            name={`question${question._id}`}
                                            value={option}
                                            checked={selectedAnswers[question._id] === option}
                                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </form>
                            <button onClick={() => handleToggleExplanation(question._id)}>
                                {showExplanations[question._id] ? 'Hide Explanation' : 'Show Explanation'}
                            </button>
                            {showExplanations[question._id] && (
                                <div className="explanation">
                                    <p>{question.explanation}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="quiz-navigation">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                        {currentPage === totalPages && (
                            <button onClick={handleSubmit} className="submit-button">
                                Submit
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(ReactQuiz);
