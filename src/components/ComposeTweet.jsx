import React, { useState } from 'react';
import './ComposeTweet.css';

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
    <div className="compose-tweet">
      <h2>Compose New Post</h2>
      <textarea
        className="compose-tweet-textarea"
        value={tweetText}
        onChange={handleInputChange}
        placeholder="What's on your mind?"
        disabled={isSubmitting}
        aria-label="Compose a new post"
      />
      <div className="compose-tweet-footer">
        <span className={`char-count ${tweetText.length > maxLength ? 'text-red-500' : 'text-gray-500'}`}>
          {tweetText.length}/{maxLength}
        </span>
        <div className="compose-tweet-buttons">
          <button
            className="clear-button"
            onClick={handleClear}
            disabled={isSubmitting || !tweetText}
            aria-label="Clear post text"
          >
            Clear
          </button>
          <button
            className="post-button"
            onClick={handleSubmit}
            disabled={isSubmitting || !tweetText.trim()}
            aria-label="Submit post"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComposeTweet;