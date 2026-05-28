import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin-token'));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(() => !!localStorage.getItem('admin-token'));

  const logout = useCallback(() => {
    localStorage.removeItem('admin-token');
    setToken(null);
    setAdmin(null);
  }, []);

  useEffect(() => {
    if (token) {
      axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => { setAdmin(res.data); setLoading(false); })
        .catch(() => { logout(); setLoading(false); });
    }
  }, [token, logout]);

  const login = async (username, password) => {
    const res = await axios.post('/api/auth/login', { username, password });
    const { token: newToken, admin: adminData } = res.data;
    localStorage.setItem('admin-token', newToken);
    setToken(newToken);
    setAdmin(adminData);
    return adminData;
  };

  const authAxios = axios.create();
  authAxios.interceptors.request.use(config => {
    const t = localStorage.getItem('admin-token');
    if (t) config.headers.Authorization = `Bearer ${t}`;
    return config;
  });

  return (
    <AuthContext.Provider value={{ token, admin, loading, login, logout, authAxios }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
