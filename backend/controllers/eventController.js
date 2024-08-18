import Event from '../models/Event.js';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errorTypes.js';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const addBaseUrlToImage = (event) => {
  if (event.imageUrl) {
    return {
      ...event.toObject(),
      imageUrl: `${BASE_URL}${event.imageUrl}`
    };
  }
  return event.toObject();
};

export const createEvent = async (req, res, next) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);

    const { title, description, date, time, location, capacity } = req.body;

    if (!title || !description || !date || !time || !location) {
      throw new BadRequestError('Title, description, date, time, and location are required');
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      capacity: capacity ? parseInt(capacity) : undefined,
      imageUrl
    });

    console.log('New event object:', newEvent);

    const savedEvent = await newEvent.save();
    console.log('Saved event:', savedEvent);
    res.status(201).json(addBaseUrlToImage(savedEvent));
  } catch (error) {
    next(error);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events.map(addBaseUrlToImage));
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      throw new NotFoundError('Event not found');
    }
    res.json(addBaseUrlToImage(event));
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { title, description, date, time, location, capacity } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (req.user.role !== 'admin') {
      throw new UnauthorizedError('Not authorized to update event information');
    }

    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (time) event.time = time;
    if (location) event.location = location;
    if (capacity) event.capacity = parseInt(capacity);

    if (req.file) {
      if (event.imageUrl) {
        const oldPath = path.join(process.cwd(), 'public', event.imageUrl);
        await fs.unlink(oldPath).catch(err => console.error('Error deleting old image:', err));
      }
      event.imageUrl = `/uploads/${req.file.filename}`;
    }

    await event.save();
    res.json(addBaseUrlToImage(event));
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (req.user.role !== 'admin') {
      throw new UnauthorizedError('Not authorized to delete event');
    }

    if (event.imageUrl) {
      const imagePath = path.join(process.cwd(), 'public', event.imageUrl);
      await fs.unlink(imagePath).catch(err => console.error('Error deleting image:', err));
    }

    await event.deleteOne();
    res.json({ message: 'Event removed successfully' });
  } catch (error) {
    next(error);
  }
};