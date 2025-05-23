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
        await onPostSubmit(tweetText);
        setTweetText('');
      } catch (err) {
        console.error('Submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClear = () => {
    setTweetText('');
  };

  return (
    <div className="">
      <h2 className="">Compose New Post</h2>
      <textarea
        className=""
        value={tweetText}
        onChange={handleInputChange}
        placeholder="What's on your mind?"
        disabled={isSubmitting}
      />
      <div className="">
        <span className={`text-sm ${tweetText.length > maxLength ? 'text-red-500' : 'text-gray-500'}`}>
          {tweetText.length}/{maxLength}
        </span>
        <div className="space-x-3">
          <button
            className="city-50"
            onClick={handleClear}
            disabled={isSubmitting || !tweetText}
          >
            Clear
          </button>
          <button
            
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