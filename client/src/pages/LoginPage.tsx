import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // assuming react-router
import SplitText from '../components/ui/SplitText';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Admin account
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('isAdmin', 'true');
      navigate('/');
      return;
    }

    // Regular username login (any non-empty username)
    if (username.trim() && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username.trim());
      localStorage.setItem('isAdmin', 'false');
      navigate('/');
      return;
    }

    setMessage('❌ Invalid username or password');
  };

  return (
    <div className="pt-24 p-8 max-w-md mx-auto bg-dark-bg min-h-screen">
      <SplitText
        text="Login"
        className="text-4xl md:text-5xl font-bold text-royal-gold mb-8"
        delay={80}
        duration={0.6}
        tag="h1"
        textAlign="center"
      />
      <form onSubmit={handleLogin} className="space-y-6 bg-card p-6 rounded-lg border border-card-border shadow-lg">
        <div>
          <label htmlFor="username" className="block text-card-foreground font-semibold mb-2">
            Username
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-card-foreground font-semibold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        {message && <div className="text-red-400">{message}</div>}
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover-elevate transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
