import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const base_Url = 'https://quiz-backend-90jn.onrender.com';


const AddQuestion = () => {
    const { category } = useParams(); // get category from the URL
    const navigate = useNavigate(); // use navigate hook for navigation
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState('');
    const [explanation, setExplanation] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const newQuestion = {
            category,
            question,
            options,
            correctOption,
            explanation
        };

        try {
            const response = await fetch(`${base_Url}/api/v1/add-question`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuestion)
            });
            const result = await response.json();
            console.log(result);
            // Handle success (e.g., navigate to another page or show a success message)
            navigate('/admin'); // Navigate back to the admin dashboard after successful submission
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    const handleBackToAdmin = () => {
        navigate('/admin'); // Navigate back to the admin dashboard
    };

    return (
        <div className="add-question-container">
            <div className="add-question-overlay"></div>
            <div className="add-question">
                <h2>Add Question to {category.replace('-', ' ').toUpperCase()}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Question:</label>
                    <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />

                    <label>Options:</label>
                    {options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                        />
                    ))}

                    <label>Correct Option:</label>
                    <input type="text" value={correctOption} onChange={(e) => setCorrectOption(e.target.value)} />

                    <label>Explanation:</label>
                    <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} />

                    <button type="submit">Add Question</button>
                </form>
                <button onClick={handleBackToAdmin} className="back-button">Select Another Category</button>
            </div>
        </div>
    );
};

export default AddQuestion;
