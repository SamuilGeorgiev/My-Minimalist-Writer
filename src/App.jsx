import React, { useState } from 'react';
import ComposeTweet from './components/ComposeTweet.jsx';
import Feed from './components/Feed.jsx';
import logo from './assets/logo.svg';

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (content) => {
    const newPost = { id: Date.now(), content, timestamp: Date.now() };
    setPosts([newPost, ...posts]); // Add new post to the top
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Minimalist Writer Quill Logo"
              className="h-10 w-auto mr-3"
            />
            <h1 className="text-2xl font-semibold text-gray-800">My Minimalist Writer</h1>
          </div>
          <nav className="space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
              Home
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
              Profile
            </a>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <ComposeTweet onPostSubmit={addPost} />
        </div>
        <div>
          <Feed posts={posts} />
        </div>
      </main>
    </div>
  );
}

export default App;