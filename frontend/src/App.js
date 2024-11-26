import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Switch 대신 Routes 사용
import FirstPage from './pages/FirstPage';
import SignUpPage from './pages/SignUpPage';
import PortfolioPage from './pages/PortfolioPage';
import ETFListPage from './pages/ETFListPage';
import ETFDetailPage from './pages/ETFDetailPage';
import SurveyPage from './pages/SurveyPage';
import TendencyPage from './pages/TendencyPage';
import ETFPurchasePage from './pages/ETFPurchasePage';
import MainPage from './pages/MainPage'; // Import MainPage
import { getCookie } from './utils/getCookie'; // Import getCookie

const App = () => {
    const userId = getCookie('userId');

    return (
        <Router>
            <Routes>
                <Route path="/" element={userId !== '' ? <MainPage /> : <FirstPage />} />
                {userId !== '' && <Route path="*" element={<Navigate to="/" />} />} {/* Redirect all routes to home if logged in */}
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/etf" element={<ETFListPage />} />
                <Route path="/etf/detail" element={<ETFDetailPage />} />
                <Route path="/etf/purchase" element={<ETFPurchasePage />} />
                <Route path="/survey" element={<SurveyPage />} />
                <Route path="/tendency" element={<TendencyPage />} />
                {userId === '' && <Route path="*" element={<Navigate to="/" />} />} {/* Redirect unknown routes to home if not logged in */}
            </Routes>
        </Router>
    );
};

export default App;
