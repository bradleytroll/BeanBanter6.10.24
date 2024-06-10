import React from 'react';
import './index.css';

const CommentList = ({ comments, onEdit, onDelete }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="card">
          <div className="card-content">
            <p>{comment.text}</p>
            <p className="is-size-7 has-text-grey">- {comment.user.username}</p>
            <button onClick={() => onEdit(comment)}>Edit</button>
            <button onClick={() => onDelete(comment._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
