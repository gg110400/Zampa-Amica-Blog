import Animal from '../models/Animal.js';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errorTypes.js';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const addBaseUrlToImage = (animal) => {
  if (animal.imageUrl) {
    return {
      ...animal.toObject(),
      imageUrl: `${BASE_URL}${animal.imageUrl}`
    };
  }
  return animal.toObject();
};

export const createAnimal = async (req, res, next) => {
  try {
    const { name, species, breed, age, gender, description, adoptionStatus, medicalHistory } = req.body;

    if (!name || !species) {
      throw new BadRequestError('Name and species are required');
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newAnimal = new Animal({
      name,
      species,
      breed,
      age,
      gender,
      description,
      imageUrl,
      adoptionStatus,
      medicalHistory
    });

    await newAnimal.save();
    res.status(201).json(addBaseUrlToImage(newAnimal));
  } catch (error) {
    next(error);
  }
};

export const getAllAnimals = async (req, res, next) => {
  try {
    const animals = await Animal.find();
    res.json(animals.map(addBaseUrlToImage));
  } catch (error) {
    next(error);
  }
};

export const getAnimalById = async (req, res, next) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      throw new NotFoundError('Animal not found');
    }
    res.json(addBaseUrlToImage(animal));
  } catch (error) {
    next(error);
  }
};

export const updateAnimal = async (req, res, next) => {
  try {
    const { name, species, breed, age, gender, description, adoptionStatus, medicalHistory } = req.body;
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      throw new NotFoundError('Animal not found');
    }

    if (req.user.role !== 'admin') {
      throw new UnauthorizedError('Not authorized to update animal information');
    }

    if (name) animal.name = name;
    if (species) animal.species = species;
    if (breed) animal.breed = breed;
    if (age) animal.age = age;
    if (gender) animal.gender = gender;
    if (description) animal.description = description;
    if (adoptionStatus) animal.adoptionStatus = adoptionStatus;
    if (medicalHistory) animal.medicalHistory = medicalHistory;

    if (req.file) {
      if (animal.imageUrl) {
        const oldPath = path.join(process.cwd(), 'public', animal.imageUrl);
        await fs.unlink(oldPath).catch(err => console.error('Error deleting old image:', err));
      }
      animal.imageUrl = `/uploads/${req.file.filename}`;
    }

    await animal.save();
    res.json(addBaseUrlToImage(animal));
  } catch (error) {
    next(error);
  }
};

export const deleteAnimal = async (req, res, next) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      throw new NotFoundError('Animal not found');
    }

    if (req.user.role !== 'admin') {
      throw new UnauthorizedError('Not authorized to delete animal');
    }

    if (animal.imageUrl) {
      const imagePath = path.join(process.cwd(), 'public', animal.imageUrl);
      await fs.unlink(imagePath).catch(err => console.error('Error deleting image:', err));
    }

    await animal.deleteOne();
    res.json({ message: 'Animal removed successfully' });
  } catch (error) {
    next(error);
  }
};

export const searchAnimals = async (req, res, next) => {
  try {
    const { species, breed, age, gender, adoptionStatus } = req.query;
    const query = {};

    if (species) query.species = new RegExp(species, 'i');
    if (breed) query.breed = new RegExp(breed, 'i');
    if (age) query.age = age;
    if (gender) query.gender = gender;
    if (adoptionStatus) query.adoptionStatus = adoptionStatus;

    const animals = await Animal.find(query);
    res.json(animals.map(addBaseUrlToImage));
  } catch (error) {
    next(error);
  }
};