import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Switch 대신 Routes 사용
import FirstPage from './pages/FirstPage';
import SignUpPage from './pages/SignUpPage';
import PortfolioPage from './pages/PortfolioPage';
import ETFListPage from './pages/ETFListPage';
import ETFDetailPage from './pages/ETFDetailPage';
import SurveyPage from './pages/SurveyPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/etf" element={<ETFListPage />} />
                <Route path="/etf/detail" element={<ETFDetailPage />} />
                <Route path="/survey" element={<SurveyPage />} />
            </Routes>
        </Router>
    );
};

export default App;
