import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (isInitial = false) => {
    let q;
    if (isInitial) {
      q = query(
        collection(db, 'posts'),
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
    } else {
      q = query(
        collection(db, 'posts'),
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc'),
        startAfter(lastDoc),
        limit(10)
      );
    }

    const snapshot = await getDocs(q);
    const newPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    setHasMore(snapshot.docs.length === 10);
    setPosts((prev) => (isInitial ? newPosts : [...prev, ...newPosts]));
  };

  useEffect(() => {
    if (user) {
      fetchPosts(true);
    }
  }, [user]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Feed</h2>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => fetchPosts()}
        hasMore={hasMore}
        loader={<p className="text-center text-gray-500">Loading...</p>}
        endMessage={<p className="text-center text-gray-500">No more posts to load.</p>}
      >
        <div className="space-y-4">
          {posts.map((post) => (
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
      </InfiniteScroll>
    </div>
  );
}

export default Feed;