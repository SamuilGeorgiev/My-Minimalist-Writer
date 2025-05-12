import React, { useState } from 'react';

function ComposeTweet({ onPostSubmit }) {
  const [tweetText, setTweetText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxLength = 280;

  const handleInputChange = (event) => {
    const text = event.target.value;
    if (text.length <= maxLength) {
      setTweetText(text);
    }
  };

  const handleSubmit = async () => {
    if (tweetText.trim()) {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async submission
        onPostSubmit(tweetText);
        setTweetText('');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClear = () => {
    setTweetText('');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Compose New Post</h2>
      <textarea
        className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg text-base text-gray-900 resize-y focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        value={tweetText}
        onChange={handleInputChange}
        placeholder="What's on your mind?"
        disabled={isSubmitting}
      />
      <div className="flex justify-between items-center mt-3">
        <span className={`text-sm ${tweetText.length > maxLength ? 'text-red-500' : 'text-gray-500'}`}>
          {tweetText.length}/{maxLength}
        </span>
        <div className="space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-400 transition disabled:opacity-50"
            onClick={handleClear}
            disabled={isSubmitting || !tweetText}
          >
            Clear
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting || !tweetText.trim()}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComposeTweet;