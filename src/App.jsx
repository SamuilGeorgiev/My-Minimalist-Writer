import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase'; // Import Firestore instance
import ComposeTweet from './components/ComposeTweet.jsx';
import Feed from './components/Feed.jsx';
import Profile from './components/Profile.jsx';
import Auth from './components/Auth.jsx';
import logo from './assets/logo.svg';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch posts in real-time
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    }, (error) => {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts.');
    });
    return () => unsubscribe();
  }, [user]);

  const addPost = async (content) => {
    if (!user) {
      toast.error('Please log in to post.');
      return;
    }
    try {
      await addDoc(collection(db, 'posts'), {
        content,
        timestamp: Date.now(),
        userId: user.uid,
      });
      toast.success('Post submitted!');
    } catch (error) {
      console.error('Error adding post:', error);
      toast.error('Failed to submit post.');
    }
  };

  return (
    <Router>
      <div className="main1">
        <header className="">
          <div className="">
            <div>
              <img src={logo} alt="Minimalist Writer Logo" className="logo" />
              <h1 className="">My Minimalist Writer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="space-x-4">
                <Link to="/" className="text-blue-500 hover:text-blue-600 font-medium">
                  Home
                </Link>
                <Link to="/profile" className="text-blue-500 hover:text-blue-600 font-medium">
                  Profile
                </Link>
              </nav>
              <Auth setUser={setUser} />
            </div>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-6">
          {user ? (
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div>
                      <ComposeTweet onPostSubmit={addPost} />
                    </div>
                    <div>
                      <Feed posts={posts} user={user} />
                    </div>
                  </>
                }
              />
              <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
          ) : (
            <p className="text-center text-gray-600">Please log in to view and post content.</p>
          )}
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;