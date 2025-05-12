import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

function Profile({ user }) {
  const [userPosts, setUserPosts] = useState([]);
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUserPosts(posts);
    });
    return () => unsubscribe();
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
      <div className="mb-6">
        {isEditing ? (
          <div className="flex space-x-3">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
              onClick={handleUpdateProfile}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-400 transition"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-gray-900 text-base">
              Name: {displayName || 'Anonymous'}
            </p>
            <button
              className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Posts</h3>
      {userPosts.length > 0 ? (
        <div className="space-y-4">
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-all"
            >
              <p className="text-gray-900 text-base">{post.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No posts yet.</p>
      )}
    </div>
  );
}

export default Profile;