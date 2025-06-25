import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <-- 👈 New state
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy check
    if (username === 'lucifer' && password === 'luciferecor') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <img src="src/assets/ecor.png" alt="Logo" className="h-20 mx-auto" />
        <h2 className="text-2xl font-bold text-center text-blue-700">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 pr-10 border border-gray-300 rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-blue-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          Sign In
        </button>
                <button
          type="button"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={() => {
            localStorage.setItem('isUserPanel', 'true');
            navigate('/user-pannel');
          }}
        >
          Go to User Panel
        </button>

      </form>
    </div>
  );
}
