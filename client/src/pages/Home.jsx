import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from '../utils/mutations';
import styled from 'styled-components';

const GET_COFFEESHOPS = gql`
  query GetCoffeeShops {
    coffeeShops {
      _id
      name
      location
      rating
      review
      user {
        username
      }
      comments {
        _id
        content
        user {
          username
        }
        createdAt
      }
    }
  }
`;



const HomePage = () => {
  const { loading, error, data } = useQuery(GET_COFFEESHOPS);
  const [addComment] = useMutation(ADD_COMMENT);
  const [updateComment] = useMutation(UPDATE_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);

  const [commentContent, setCommentContent] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddComment = async (coffeeShopId) => {
    try {
      await addComment({
        variables: { coffeeShopId, content: commentContent[coffeeShopId] },
        refetchQueries: [{ query: GET_COFFEESHOPS }],
      });
      setCommentContent({ ...commentContent, [coffeeShopId]: '' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateComment = async (commentId, coffeeShopId) => {
    try {
      await updateComment({
        variables: { commentId, content: commentContent[coffeeShopId] },
        refetchQueries: [{ query: GET_COFFEESHOPS }],
      });
      setCommentContent({ ...commentContent, [coffeeShopId]: '' });
      setEditingCommentId(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment({
        variables: { commentId },
        refetchQueries: [{ query: GET_COFFEESHOPS }],
      });
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const handleInputChange = (e, coffeeShopId) => {
    setCommentContent({ ...commentContent, [coffeeShopId]: e.target.value });
  };

  return (
    <div>
      <h1 className="title has-text-centered sophia">Recent Reviews</h1>
      <div className="columns is-multiline">
        {data.coffeeShops.map((shop) => (
          <div className="column is-one-third" key={shop._id}>
            <div className="card">
              <div className="card-content">
                <p className="title is-4">{shop.name}</p>
                <p className="subtitle is-6">Location: {shop.location}</p>
                <div className="content">
                  <p><strong>Rating:</strong> {shop.rating}</p>
                  <p><strong>Review:</strong> {shop.review}</p>
                </div>
                <div>
                  {shop.comments.map((comment) => (
                    <div key={comment._id} className="box">
                      <p>{comment.content}</p>
                      <p><small>by {comment.user.username}</small></p>
                      {Auth.loggedIn() && Auth.getProfile().data.username === comment.user.username && (
                        <div className="buttons">
                          <button
                            className="button is-success is-small is-rounded is-outlined"
                            onClick={() => {
                              setCommentContent({ ...commentContent, [shop._id]: comment.content });
                              setEditingCommentId(comment._id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="button is-warning is-small is-rounded is-outlined"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {Auth.loggedIn() && (
                    <div>
                      <textarea
                        className="textarea is-small is-success"
                        value={commentContent[shop._id] || ''}
                        onChange={(e) => handleInputChange(e, shop._id)}
                        placeholder="Leave a comment"
                      ></textarea>
                      <button
                        className="button is-link is-small is-rounded is-info is-outlined"
                        onClick={() => {
                          if (editingCommentId) {
                            handleUpdateComment(editingCommentId, shop._id);
                          } else {
                            handleAddComment(shop._id);
                          }
                        }}
                      >
                        {editingCommentId ? 'Update Comment' : 'Add Comment'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;