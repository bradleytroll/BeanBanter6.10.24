const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  coffeeShop: {
    type: Schema.Types.ObjectId,
    ref: 'CoffeeShop',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
