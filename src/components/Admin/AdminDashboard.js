import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
const base_Url = 'https://quiz-backend-90jn.onrender.com';


const AdminDashboard = () => {
    const [questionCounts, setQuestionCounts] = useState({
        'current-affairs': 0,
        'computer-fundamentals': 0,
        'react-js': 0,
        'seo': 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const categoryAPIs = {
        'current-affairs': `${base_Url}/api/v1/questions/current-affairs`,
        'computer-fundamentals': `${base_Url}/api/v1/questions/computer-fundamentals`,
        'react-js': `${base_Url}/api/v1/questions/react-js`,
        'seo': `${base_Url}/api/v1/questions/seo`
    };

    useEffect(() => {
        const fetchQuestionCounts = async () => {
            try {
                const counts = await Promise.all(
                    Object.entries(categoryAPIs).map(async ([category, api]) => {
                        const response = await fetch(api);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch questions for ${category}`);
                        }
                        const data = await response.json();
                        return [category, data.length];
                    })
                );
                setQuestionCounts(Object.fromEntries(counts));
            } catch (error) {
                console.error('Error fetching question counts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionCounts();
    }, []);

    const handleCategorySelection = (category) => {
        navigate(`/admin/add-question/${category}`);
    };

    if (loading) return <p>Loading...</p>;

    const totalQuestions = Object.values(questionCounts).reduce((acc, count) => acc + count, 0);

    const pieData = {
        labels: ['Current Affairs', 'Computer Fundamentals', 'React.js', 'SEO'],
        datasets: [{
            data: Object.values(questionCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
    };

    const pieOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        const percentage = ((value / totalQuestions) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${value} (${percentage}%)`;
                    }
                }
            },
            datalabels: {
                display: true,
                color: '#fff',
                formatter: (value) => {
                    const percentage = ((value / totalQuestions) * 100).toFixed(2);
                    return `${percentage}%`;
                }
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome to the Admin Dashboard. Use this interface to manage quiz questions efficiently. Select a category to add or edit questions.</p>
            </header>
            <div className="admin-content">
                <div className="dashboard-card category-card">
                    <h2>Select a Category</h2>
                    <div className="category-buttons">
                        {Object.keys(categoryAPIs).map(category => (
                            <button key={category} onClick={() => handleCategorySelection(category)} className="category-button">
                                {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="dashboard-card question-count-card">
                    <h2>Question Counts by Category</h2>
                    <div className="category-counts">
                        {Object.entries(questionCounts).map(([category, count]) => (
                            <div key={category} className="count-item">
                                <span>{category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
                                <span>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-card pie-chart-card">
                    <h2>Question Distribution by Category</h2>
                    <Pie data={pieData} options={pieOptions} />
                    <h5>This is my pie graph representation</h5>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;