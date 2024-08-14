import Event from '../models/Event.js';
import User from '../models/User.js';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errorTypes.js';
import { sendEventRegistrationEmail } from '../utils/emailService.js';
import fs from 'fs/promises';
import path from 'path';

export const createEvent = async (req, res, next) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Authenticated user:', req.user);
    console.log('Uploaded file:', req.file);

    const { title, description, date, location, capacity } = req.body;

    if (!title || !description || !date || !location) {
      throw new BadRequestError('Title, description, date, and location are required');
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      capacity,
      imageUrl,
      organizer: req.user.id
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error in createEvent:', error);
    next(error);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('organizer', 'name');
    res.json(events);
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name');
    if (!event) {
      throw new NotFoundError('Event not found');
    }
    res.json(event);
  } catch (error) {
    console.error('Error in getEventById:', error);
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new UnauthorizedError('User not authorized to update this event');
    }

    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (location) event.location = location;
    if (capacity) event.capacity = capacity;

    if (req.file) {
      if (event.imageUrl) {
        const oldPath = path.join(process.cwd(), 'public', event.imageUrl);
        await fs.unlink(oldPath).catch(err => console.error('Error deleting old image:', err));
      }
      event.imageUrl = `/uploads/${req.file.filename}`;
    }

    await event.save();
    res.json(event);
  } catch (error) {
    console.error('Error in updateEvent:', error);
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new UnauthorizedError('User not authorized to delete this event');
    }

    if (event.imageUrl) {
      const imagePath = path.join(process.cwd(), 'public', event.imageUrl);
      await fs.unlink(imagePath).catch(err => console.error('Error deleting image:', err));
    }

    await event.deleteOne();
    res.json({ message: 'Event removed' });
  } catch (error) {
    console.error('Error in deleteEvent:', error);
    next(error);
  }
};

export const registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.registeredParticipants.includes(req.user.id)) {
      throw new BadRequestError('User already registered for this event');
    }

    if (event.registeredParticipants.length >= event.capacity) {
      throw new BadRequestError('Event is at full capacity');
    }

    event.registeredParticipants.push(req.user.id);
    await event.save();

    const user = await User.findById(req.user.id);
    sendEventRegistrationEmail(user, event).catch(error => 
      console.error('Error sending event registration email:', error)
    );

    res.json({ message: 'Successfully registered for the event' });
  } catch (error) {
    console.error('Error in registerForEvent:', error);
    next(error);
  }
};

export const unregisterFromEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      throw new NotFoundError('Event not found');
    }

    const registrationIndex = event.registeredParticipants.indexOf(req.user.id);
    if (registrationIndex === -1) {
      throw new BadRequestError('User is not registered for this event');
    }

    event.registeredParticipants.splice(registrationIndex, 1);
    await event.save();

    res.json({ message: 'Successfully unregistered from the event' });
  } catch (error) {
    console.error('Error in unregisterFromEvent:', error);
    next(error);
  }
};

export const getEventParticipants = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('registeredParticipants', 'name email');
    
    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new UnauthorizedError('Only the event organizer or admin can view participants');
    }

    res.json(event.registeredParticipants);
  } catch (error) {
    console.error('Error in getEventParticipants:', error);
    next(error);
  }
};