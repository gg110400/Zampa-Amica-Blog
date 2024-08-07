import BlogPost from '../models/BlogPost.js';
import User from '../models/User.js';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errorTypes.js';
import { sendNewPostNotificationEmail } from '../utils/emailService.js';
import { cloudinary } from '../config/cloudinary.js';

export const createPost = async (req, res, next) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Authenticated user:', req.user);
    console.log('Uploaded file:', req.file);

    const { title, content, tags } = req.body;

    if (!title || !content) {
      throw new BadRequestError('Title and content are required');
    }

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newPost = new BlogPost({
      title,
      content,
      author: req.user.id,
      imageUrl,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    await newPost.save();

    const subscribers = await User.find({ subscribedToBlog: true });
    sendNewPostNotificationEmail(subscribers, newPost).catch(error =>
      console.error('Error sending new post notification emails:', error)
    );

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error in createPost:', error);
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find().populate('author', 'name');
    res.json(posts);
  } catch (error) {
    console.error('Error in getAllPosts:', error);
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
    console.error('Error in getPostById:', error);
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'Admin') {
      throw new UnauthorizedError('User not authorized to update this post');
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags.split(',').map(tag => tag.trim());

    if (req.file) {
      if (post.imageUrl) {
        const publicId = post.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      post.imageUrl = result.secure_url;
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error('Error in updatePost:', error);
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'Admin') {
      throw new UnauthorizedError('User not authorized to delete this post');
    }

    if (post.imageUrl) {
      const publicId = post.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error('Error in deletePost:', error);
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
    console.error('Error in addComment:', error);
    next(error);
  }
};