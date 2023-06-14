import React, { useState } from 'react';

const CommentComponent = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [comment, setComment] = useState('');

  const handleButtonClick = () => {
    setShowTextField(true);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the comment or perform any necessary actions
    console.log('Updated comment:', comment);
    setShowTextField(false);
  };

  return (
    <div>
      {showTextField ? (
        <form onSubmit={handleSubmit}>
          <textarea value={comment} onChange={handleCommentChange} />
          <button type="submit">Update Comment</button>
        </form>
      ) : (
        <button onClick={handleButtonClick}>Edit Comment</button>
      )}
    </div>
  );
};

export default CommentComponent;
