import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function Auth({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUser(user);
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleLogin = async () => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to log in. Check your credentials.');
    }
  };

  const handleSignUp = async () => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to sign up. Email may already be in use or password is too weak.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  if (currentUser) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 text-sm">Welcome, {currentUser.email}</span>
        <button
          className="px-4 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 text-sm">{isSignUp ? 'Sign Up' : 'Login'}</span>
        <button
          className="text-blue-500 text-sm hover:underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
      </div>
      <input
        type="email"
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
        onClick={handleSubmit}
      >
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
    </div>
  );
}

export default Auth;