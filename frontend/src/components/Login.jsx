import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginForm({ onSwitch, onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(username, password);
      
      if (result.success) {
        if (onSuccess) onSuccess();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-96 p-6 bg-gray-900/80 backdrop-blur-md border border-purple-500/20 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-300 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
        Sign In
      </h2>
      
      {error && (
        <div className="py-2 px-3 bg-red-500/20 border border-red-500/30 rounded text-red-200 text-sm">
          {error}
        </div>
      )}
      
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full px-4 py-3 bg-gray-800/60 text-white border border-purple-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
        required
        disabled={loading}
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-3 bg-gray-800/60 text-white border border-purple-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
        required
        disabled={loading}
      />
      
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-700 to-blue-600 hover:from-purple-600 hover:to-blue-500 text-white py-3 rounded-md transition shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      
      <p className="text-sm text-center text-gray-300">
        Don't have an account?{' '}
        <span
          className="text-purple-400 hover:text-blue-300 hover:underline cursor-pointer transition-colors"
          onClick={onSwitch}
        >
          Register
        </span>
      </p>
    </form>
  );
}
