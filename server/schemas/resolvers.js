const { AuthenticationError } = require('apollo-server-express');
const { User, CoffeeShop, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate({
          path: 'coffeeShops',
          populate: {
            path: 'comments',
            populate: 'user'
          }
        });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    coffeeShops: async () => {
      return CoffeeShop.find().populate('user').populate({
        path: 'comments',
        populate: 'user'
      });
    },
    comments: async (parent, { coffeeShopId }) => {
      return Comment.find({ coffeeShop: coffeeShopId }).populate('user');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    signup: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addCoffeeShop: async (parent, { name, location, rating, review }, context) => {
      if (context.user) {
        const coffeeShop = await CoffeeShop.create({ name, location, rating, review, user: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { coffeeShops: coffeeShop._id } });
        return coffeeShop;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateCoffeeShop: async (parent, { id, name, location, rating, review }, context) => {
      if (context.user) {
        const coffeeShop = await CoffeeShop.findById(id);
        if (coffeeShop.user.toString() !== context.user._id) {
          throw new AuthenticationError('You can only edit your own coffee shops!');
        }
        coffeeShop.name = name || coffeeShop.name;
        coffeeShop.location = location || coffeeShop.location;
        coffeeShop.rating = rating || coffeeShop.rating;
        coffeeShop.review = review || coffeeShop.review;
        await coffeeShop.save();
        return coffeeShop;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteCoffeeShop: async (parent, { id }, context) => {
      if (context.user) {
        const shop = await CoffeeShop.findById(id);
        if (!shop) {
          throw new AuthenticationError('Coffee shop not found');
        }

        if (shop.user.toString() !== context.user._id) {
          throw new AuthenticationError('You are not authorized to delete this coffee shop');
        }

        await CoffeeShop.findByIdAndDelete(id);

        return shop;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    addComment: async (parent, { coffeeShopId, content }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          content,
          user: context.user._id,
          coffeeShop: coffeeShopId,
        });

        await CoffeeShop.findByIdAndUpdate(coffeeShopId, {
          $push: { comments: comment._id },
        });

        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateComment: async (parent, { commentId, content }, context) => {
      if (context.user) {
        const comment = await Comment.findById(commentId);
        if (comment.user.toString() !== context.user._id) {
          throw new AuthenticationError('You can only edit your own comments!');
        }
        comment.content = content;
        await comment.save();
        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findById(commentId);

        if (comment.user.toString() !== context.user._id) {
          throw new AuthenticationError('You are not authorized to delete this comment');
        }

        await Comment.findByIdAndDelete(commentId);
        return comment;
      }
      throw new AuthenticationError('Not logged in');
    },
  }
};

module.exports = resolvers;
