import Animal from '../models/Animal.js';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errorTypes.js';
import { cloudinary } from '../config/cloudinary.js';

export const createAnimal = async (req, res, next) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Authenticated user:', req.user);
    console.log('Uploaded file:', req.file);

    const { name, species, breed, age, gender, description, adoptionStatus, medicalHistory } = req.body;

    if (!name || !species) {
      throw new BadRequestError('Name and species are required');
    }

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
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
    console.error('Error in createAnimal:', error);
    next(error);
  }
};

export const getAllAnimals = async (req, res, next) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (error) {
    console.error('Error in getAllAnimals:', error);
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
    console.error('Error in getAnimalById:', error);
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
      if (animal.imageUrl) {
        const publicId = animal.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      animal.imageUrl = result.secure_url;
    }

    await animal.save();
    res.json(animal);
  } catch (error) {
    console.error('Error in updateAnimal:', error);
    next(error);
  }
};

export const deleteAnimal = async (req, res, next) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      throw new NotFoundError('Animal not found');
    }

    if (req.user.role !== 'Admin') {
      throw new UnauthorizedError('Not authorized to delete animal');
    }

    if (animal.imageUrl) {
      const publicId = animal.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await animal.remove();
    res.json({ message: 'Animal removed successfully' });
  } catch (error) {
    console.error('Error in deleteAnimal:', error);
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
    console.error('Error in searchAnimals:', error);
    next(error);
  }
};