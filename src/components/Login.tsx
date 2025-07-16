import React, { useState } from 'react';
import { checkUserExists, createUser } from './utils/sheetdb';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || (isNewUser && !name)) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const existingUser = await checkUserExists(email);

      if (isNewUser) {
        if (existingUser) {
          setError('User already exists. Try logging in.');
          return;
        }

        await createUser(name, email, password);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        onLogin();
      } else {
        if (!existingUser) {
          setError('User not found. Please sign up.');
          return;
        }

        if (existingUser.password !== password) {
          setError('Incorrect password.');
          return;
        }

        localStorage.setItem('userName', existingUser.name);
        localStorage.setItem('userEmail', email);
        onLogin();
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Side Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 bg-gradient-to-br from-yellow-100 to-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {isNewUser ? 'Create an account' : 'Welcome back'}
          </h2>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          {isNewUser && (
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password with eye toggle */}
          <div className="relative mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-full font-semibold shadow-md transition"
          >
            {isNewUser ? 'Sign Up' : 'Log In'}
          </button>

          <div className="my-6 flex items-center justify-center gap-2">
            <span className="text-gray-500">or</span>
          </div>

          <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-full hover:bg-gray-100 transition">
            <FcGoogle className="text-2xl" />
            <span className="ml-2 text-gray-600">Continue with Google</span>
          </button>

          <button
            onClick={() => {
              setIsNewUser(!isNewUser);
              setError('');
            }}
            className="mt-6 text-sm text-blue-600 underline text-center justify-center"
          >
            {isNewUser
              ? 'Already have an account? Log in'
              : 'Don’t have an account? Sign up'}
          </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div
        className="hidden md:flex w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/task.jpg')" }}
      />
    </div>
  );
};

export default Login;
