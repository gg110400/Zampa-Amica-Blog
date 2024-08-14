import Animal from '../models/Animal.js'; // Importa il modello Animal
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errorTypes.js'; // Importa i tipi di errore personalizzati
import fs from 'fs/promises'; // Importa il modulo fs per operazioni sui file
import path from 'path'; // Importa il modulo path per gestire i percorsi dei file

// Funzione per creare un nuovo animale
export const createAnimal = async (req, res, next) => {
  try {
    // Estrae i dati dal corpo della richiesta
    const { name, species, breed, age, gender, description, adoptionStatus, medicalHistory } = req.body;

    // Controlla se i campi obbligatori sono presenti
    if (!name || !species) {
      throw new BadRequestError('Name and species are required'); // Errore se mancano i campi obbligatori
    }

    let imageUrl = null; // Inizializza l'URL dell'immagine
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // Imposta l'URL dell'immagine se presente
    }

    // Crea un nuovo oggetto Animal
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

    await newAnimal.save(); // Salva il nuovo animale nel database
    res.status(201).json(newAnimal); // Risponde con il nuovo animale creato
  } catch (error) {
    next(error); // Passa l'errore al middleware di gestione degli errori
  }
};

// Funzione per ottenere tutti gli animali
export const getAllAnimals = async (req, res, next) => {
  try {
    const animals = await Animal.find(); // Trova tutti gli animali nel database
    res.json(animals); // Risponde con la lista degli animali
  } catch (error) {
    next(error); // Passa l'errore al middleware di gestione degli errori
  }
};

// Funzione per ottenere un animale per ID
export const getAnimalById = async (req, res, next) => {
  try {
    const animal = await Animal.findById(req.params.id); // Trova l'animale per ID
    if (!animal) {
      throw new NotFoundError('Animal not found'); // Errore se l'animale non esiste
    }
    res.json(animal); // Risponde con l'animale trovato
  } catch (error) {
    next(error); // Passa l'errore al middleware di gestione degli errori
  }
};

// Funzione per aggiornare un animale
export const updateAnimal = async (req, res, next) => {
  try {
    // Estrae i dati dal corpo della richiesta
    const { name, species, breed, age, gender, description, adoptionStatus, medicalHistory } = req.body;
    const animal = await Animal.findById(req.params.id); // Trova l'animale per ID

    if (!animal) {
      throw new NotFoundError('Animal not found'); // Errore se l'animale non esiste
    }

    // Controlla se l'utente ha i permessi per aggiornare
    if (req.user.role !== 'admin') {
      throw new UnauthorizedError('Not authorized to update animal information'); // Errore se non autorizzato
    }

    // Aggiorna i campi dell'animale se forniti
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
    res.json(animals);
  } catch (error) {
    next(error);
  }
};