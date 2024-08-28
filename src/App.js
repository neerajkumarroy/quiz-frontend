import React from 'react';
import './App.css';


import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/Home.js';

import QuizContent from './components/CurrentAffair/QuizContent.js';
import ResultsPage from './components/CurrentAffair/ResultsPage.js';
import ReviewPage from './components/CurrentAffair/ReviewPage.js';

import ComputerFundamentles from './components/ComputerFundamental/ComputerFundamentles.js';
import ComputerFundamentlesReviewPage from './components/ComputerFundamental/ComputerFundamentlesReviewPage.js';
import ComputerFundamentalsResultsPage from './components/ComputerFundamental/ComputerFundamentalsResultsPage.js';

import ReactQuiz from './components/React/ReactQuiz.js';
import ReactResult from './components/React/ReactResult.js';
import ReactReview from './components/React/ReactReview.js';
import ReactPrview from './components/React/ReactPreview.js';

import AdminLogin from './components/Admin/AdminLogin.js';
import AdminDashboard from './components/Admin/AdminDashboard.js';
import AddQuestion from './components/Admin/AddQuestion.js';

import SeoQuiz from './components/Seo/SeoQuiz.js';
import SeoResult from './components/Seo/SeoResult.js';
import SeoReview from './components/Seo/SeoReview.js';



import SignupError from './components/SignupError.js';
import PrivateComponent from './components/PrivateComponent.js';  // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Routes>

            <Route path="/" element={<HomePage />} />

            <Route path="/quiz/current-affairs" element={<QuizContent />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/review" element={<ReviewPage />} />

            <Route path="/quiz/computer-fundamentals" element={<ComputerFundamentles />} />
            <Route path="/quiz/computer-fundamentals-review" element={<ComputerFundamentlesReviewPage />} />
            <Route path="/computer-fundamentals-results" element={<ComputerFundamentalsResultsPage />} />

            <Route path="/quiz/react" element={<ReactQuiz />} />
            <Route path="/quiz/react-results" element={<ReactResult />} />
            <Route path="/quiz/react-review" element={<ReactReview />} />
            <Route path="/quiz/react-privew" element={<ReactPrview />} />



            <Route path="/quiz/seo" element={<SeoQuiz />} />
            <Route path="/quiz/seo-result" element={<SeoResult />} />
            <Route path="/quiz/seo-review" element={<SeoReview />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/signup-error" element={<SignupError />} />

            {/* Protect the Admin routes using the ProtectedRoute component */}
            <Route
              path="/admin"
              element={
                <PrivateComponent>
                  <AdminDashboard />
                </PrivateComponent>
              }
            />
            <Route
              path="/admin/add-question/:category"
              element={
                <PrivateComponent>
                  <AddQuestion />
                </PrivateComponent>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
