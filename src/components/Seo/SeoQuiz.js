import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
const base_Url = 'https://quiz-backend-90jn.onrender.com';


const SeoQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState(840); // 660 seconds for 11 minutes
    const [showExplanations, setShowExplanations] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [showInitialPopup, setShowInitialPopup] = useState(true); // State to manage initial popup visibility

    const [showSlider, setShowSlider] = useState(false); // State to manage slider visibility
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
            const response = await fetch(`${base_Url}/api/v1/questions/seo`);

            const text = await response.text();
            console.log('Response text:', text);

            if (!response.ok) {
                throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
            }

            const data = JSON.parse(text);
            console.log('Parsed data:', data);
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
        let correctCount = 0;
        let attemptedQuestions = 0;
        const incorrectQuestions = [];

        questions.forEach((question) => {
            const selectedAnswer = selectedAnswers[question._id];
            if (selectedAnswer) {
                attemptedQuestions++;
                if (selectedAnswer === question.correctOption) {
                    correctCount++;
                } else {
                    incorrectQuestions.push({
                        id: question._id,
                        question: question.question,
                        selectedAnswer: selectedAnswer,
                        correctAnswer: question.correctOption,
                    });
                }
            }
        });

        const totalQuestions = questions.length;
        const percentage = (correctCount / totalQuestions) * 100;

        navigate('/quiz/seo-result', { state: { totalQuestions, correctCount, incorrectQuestions, percentage, attemptedQuestions } });
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
    // hnadle Start Quiz Popup
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
                            <h2>Welcome to the SEO Quiz</h2>
                            <p>Are you ready to start the quiz?</p>
                            <button onClick={handleStartQuiz}>Start Quiz</button>
                        </div>
                    </div>
                </>
            )}

            {!showInitialPopup && (
                <>
                    {/* Existing quiz content goes here */}
                    <h2 className='title-name'>Search Engine Optimization Quiz</h2>            <div className="header-controls">
                        <button className="slider-toggle-button" onClick={handleToggleSlider}>
                            Question List
                        </button>
                        <div className="timer">Time: {formatTime(timeRemaining)}</div>
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

export default memo(SeoQuiz);
