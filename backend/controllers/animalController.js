import Animal from '../models/Animal.js';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errorTypes.js';
import { cloudinary } from '../config/cloudinary.js';

export const createAnimal = async (req, res, next) => {
  try {
    const { name, species, breed, age, gender, description, adoptionStatus, medicalHistory } = req.body;

    if (!name || !species) {
      throw new BadRequestError('Name and species are required');
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path;
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
    res.status(201).json(newAnimal);
  } catch (error) {
    next(error);
  }
};

export const getAllAnimals = async (req, res, next) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
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
    res.json(animal);
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

    // Check if the user has permission to update (you might want to add role-based checks here)
    if (req.user.role !== 'Admin') {
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
      // Delete old image if exists
      if (animal.imageUrl) {
        const publicId = animal.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
      animal.imageUrl = req.file.path;
    }

    await animal.save();
    res.json(animal);
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

    // Check if the user has permission to delete (you might want to add role-based checks here)
    if (req.user.role !== 'Admin') {
      throw new UnauthorizedError('Not authorized to delete animal');
    }

    // Delete image from Cloudinary if exists
    if (animal.imageUrl) {
      const publicId = animal.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await animal.remove();
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
    res.json(animals);
  } catch (error) {
    next(error);
  }
};