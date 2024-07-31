import BlogPost from '../models/BlogPost.js';
import User from '../models/User.js';
import { BadRequestError, NotFoundError } from '../utils/errorTypes.js';
import { sendNewPostNotificationEmail } from '../utils/emailService.js';

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      throw new BadRequestError('Title and content are required');
    }

    const newPost = new BlogPost({
      title,
      content,
      author: req.user.id
    });

    await newPost.save();

    // Send notification emails
    const subscribers = await User.find({ subscribedToBlog: true });
    sendNewPostNotificationEmail(subscribers, newPost).catch(error => 
      console.error('Error sending new post notification emails:', error)
    );

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find().populate('author', 'name');
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'name');
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    if (post.author.toString() !== req.user.id) {
      throw new UnauthorizedError('User not authorized to update this post');
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    if (post.author.toString() !== req.user.id) {
      throw new UnauthorizedError('User not authorized to delete this post');
    }

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    const newComment = {
      user: req.user.id,
      content
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments);
  } catch (error) {
    next(error);
  }
};