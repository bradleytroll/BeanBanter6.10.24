import React, { useState, useEffect } from 'react';
import './index.css';

const CoffeeShopForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 0,
    review: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value, 10) : value,  // Convert rating to an integer
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card">
    <div className="card-content">
      <h1>Add a New Coffee Shop!</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Coffee Shop Name</label>
          <div className="control">
            <input
              className="input"
              name="name"
              type="text"
              placeholder="Coffee Shop Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
  
        <div className="field">
          <label className="label">Location</label>
          <div className="control">
            <input
              className="input"
              name="location"
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>
  
        <div className="field">
          <label className="label">Rating</label>
          <div className="control">
            <input
              className="input"
              name="rating"
              type="number"
              min="1"
              max="5"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
        </div>
  
        <div className="field">
          <label className="label">Review</label>
          <div className="control">
            <textarea
              className="textarea"
              name="review"
              placeholder="Review"
              value={formData.review}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
  
        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default CoffeeShopForm;
