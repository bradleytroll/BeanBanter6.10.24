import React, { useState, useEffect } from 'react';
import './index.css';

const CommentForm = ({ onSubmit, initialData }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (initialData) {
      setText(initialData.text);
    }
  }, [initialData]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ text });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="text"
        placeholder="Leave a comment"
        value={text}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
