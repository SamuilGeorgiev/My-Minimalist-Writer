import React from 'react';

function Feed({ posts, user }) {
  const userPosts = posts.filter((post) => post.userId === user?.uid);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Feed</h2>
      {posts === null ? (
        <p className="text-gray-500 text-center">Loading posts...</p>
      ) : userPosts && userPosts.length > 0 ? (
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

export default Feed;