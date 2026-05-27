import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Experience from './components/Experience';
import Publications from './components/Publications';
import Skills from './components/Skills';
import Awards from './components/Awards';
import Service from './components/Service';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemePanel from './components/ThemePanel';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function AppContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/professor')
      .then(res => { setData(res.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-accent)' }}
          />
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center p-8 rounded-xl border max-w-md" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <p className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>Connection Error</p>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Could not connect to the server. Make sure MongoDB is running and the server is started.
          </p>
          <code className="text-xs p-2 rounded block" style={{ backgroundColor: 'var(--color-bg-alt)', color: 'var(--color-accent)' }}>
            {error}
          </code>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero data={data} />} />
        <Route path="/education" element={<Education data={data} />} />
        <Route path="/experience" element={<Experience data={data} />} />
        <Route path="/publications" element={<Publications data={data} />} />
        <Route path="/skills" element={<Skills data={data} />} />
        <Route path="/service" element={<Service data={data} />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/awards" element={<Awards data={data} />} />
        <Route path="/contact" element={<Contact data={data} />} />
        <Route path="/admin" element={
          <AuthProvider>
            <AdminPage />
          </AuthProvider>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer data={data} />
      <ThemePanel />
    </>
  );
}

function AdminPage() {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="w-10 h-10 border-3 rounded-full animate-spin" style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-accent)' }} />
      </div>
    );
  }

  return admin ? <AdminDashboard /> : <AdminLogin />;
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
}
