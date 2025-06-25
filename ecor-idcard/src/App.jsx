import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import ecorLogo from './assets/ecor.png';



import Home from './pages/Home';
import WNApplications from './pages/NGApplications';
import GAZApplications from './pages/GAZapplications';
import PrintApplications from './pages/PrintApplications';
import PrintNonGazetted from './pages/PrintGazetted';
import PrintGazetted from './pages/PrintGazetted';
import Login from './pages/Login';
import GazForm from './pages/gazform';
import NonGazForm from './pages/nongazform';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin Panel (protected) */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />

        {/* User Panel (open) */}
        <Route
          path="/user-pannel/*"
          element={<MainLayout isUserPanel={true} />}
        />
      </Routes>
    </Router>
  );
}

function MainLayout({ isUserPanel = false }) {
  const location = useLocation();

  // prefix for routing in user panel
  const routePrefix = isUserPanel ? '/user-pannel' : '';

  return (
    <div>
      {/* HEADER */}
      <div className="header flex justify-between items-center p-4 bg-blue-800 text-white">
        <div className="flex items-center gap-4">
          <img src={ecorLogo} alt="Logo" className="h-12" />
          <span className="text-xl font-semibold">East Coast Railway</span>
        </div>
        <div className="text-sm italic">Developed by interns</div>
      </div>

      {/* SIDEBAR + MAIN */}
      <div className="flex">
        {/* SIDEBAR */}
        <div className="sidebar w-64 bg-blue-100 p-6 min-h-screen space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">Menu</h3>
          <Link to={`${routePrefix}/`} className="block hover:text-blue-600">Home</Link>

          {!isUserPanel && (
            <>
              <Link to="/pending-wn" className="block hover:text-blue-600">Pending Applications (NG)</Link>
              <Link to="/pending-ga" className="block hover:text-blue-600">Pending Applications (GAZ)</Link>
            </>
          )}

          {isUserPanel && (
            <>
              <Link to="/user-pannel/gaz-form" className="block hover:text-blue-600">GAZ Form</Link>
              <Link to="/user-pannel/non-gaz-form" className="block hover:text-blue-600">Non-GAZ Form</Link>
            </>
          )}

          <Link to={`${routePrefix}/print`} className="block hover:text-blue-600">
            {isUserPanel ? 'Check Status' : 'Print Applications'}
          </Link>

          {!isUserPanel && (
            <Link
              to="/login"
              className="block text-red-600 hover:underline"
              onClick={() => localStorage.removeItem('isLoggedIn')}
            >
              Logout
            </Link>
          )}
        </div>

        {/* ROUTES */}
        <div className="main flex-1 p-8 bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />

            {!isUserPanel && (
              <>
                <Route path="/pending-wn" element={<WNApplications />} />
                <Route path="/pending-ga" element={<GAZApplications />} />
              </>
            )}

            {isUserPanel && (
              <>
                <Route path="gaz-form" element={<GazForm />} />
                <Route path="non-gaz-form" element={<NonGazForm />} />
              </>
            )}

            <Route path="print" element={<PrintApplications />} />
            <Route path="print/non-gazetted" element={<PrintNonGazetted />} />
            <Route path="print/gazetted" element={<PrintGazetted />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
