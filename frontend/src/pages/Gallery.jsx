import React from 'react';
import { Link } from 'react-router-dom';

const puppies = [
  {
    id: 1,
    name: 'Fido',
    species: 'Dog',
    breed: 'Labrador',
    age: 2,
    gender: 'Male',
    description: 'A friendly and energetic labrador.',
    imageUrl: 'https://via.placeholder.com/150',
    adoptionStatus: 'Available',
    medicalHistory: 'Vaccinated, No known health issues',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Bella',
    species: 'Dog',
    breed: 'Beagle',
    age: 1,
    gender: 'Female',
    description: 'A playful and loving beagle.',
    imageUrl: 'https://via.placeholder.com/150',
    adoptionStatus: 'Available',
    medicalHistory: 'Vaccinated, No known health issues',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: 'Charlie',
    species: 'Dog',
    breed: 'Poodle',
    age: 3,
    gender: 'Male',
    description: 'A smart and obedient poodle.',
    imageUrl: 'https://via.placeholder.com/150',
    adoptionStatus: 'Available',
    medicalHistory: 'Vaccinated, No known health issues',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    name: 'Lucy',
    species: 'Dog',
    breed: 'Bulldog',
    age: 4,
    gender: 'Female',
    description: 'A calm and loving bulldog.',
    imageUrl: 'https://via.placeholder.com/150',
    adoptionStatus: 'Available',
    medicalHistory: 'Vaccinated, No known health issues',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    name: 'Max',
    species: 'Dog',
    breed: 'German Shepherd',
    age: 2,
    gender: 'Male',
    description: 'A loyal and protective German Shepherd.',
    imageUrl: 'https://via.placeholder.com/150',
    adoptionStatus: 'Available',
    medicalHistory: 'Vaccinated, No known health issues',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    name: 'Daisy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Female',
    description: 'A friendly and playful Golden Retriever.',
    imageUrl: 'https://via.placeholder.com/150',
    adoptionStatus: 'Available',
    medicalHistory: 'Vaccinated, No known health issues',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    name: 'Rocky',
    species: 'Dog',
    breed: 'Rottweiler',
    age: 4,
    gender: 'Male',
    description: 'A strong and loyal Rottweiler.',
    imageUrl: 'https://via.placeholder.com/150',
    adoptionStatus: 'Available',
    medicalHistory: 'Vaccinated, No known health issues',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    name: 'Molly',
    species: 'Dog',
    breed: 'Cocker Spaniel',
    age: 2,
    gender: 'Female',
    description: 'A gentle and affectionate Cocker Spaniel.',
    imageUrl: 'https://via.placeholder.com/150',
    adoptionStatus: 'Available',
    medicalHistory: 'Vaccinated, No known health issues',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    name: 'Buddy',
    species: 'Dog',
    breed: 'Boxer',
    age: 3,
    gender: 'Male',
    description: 'An energetic and playful Boxer.',
    imageUrl: 'https://via.placeholder.com/150',
    adoptionStatus: 'Available',
    medicalHistory: 'Vaccinated, No known health issues',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    name: 'Lola',
    species: 'Dog',
    breed: 'Shih Tzu',
    age: 1,
    gender: 'Female',
    description: 'A small and loving Shih Tzu.',
    imageUrl: 'https://via.placeholder.com/150',
    adoptionStatus: 'Available',
    medicalHistory: 'Vaccinated, No known health issues',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const Gallery = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Centro Adozioni</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {puppies.map(puppy => (
          <Link 
            to={`/puppy/${puppy.id}`} 
            key={puppy.id} 
            className="relative block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img 
              src={puppy.imageUrl} 
              alt={puppy.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-bold mb-2 font-dancing text-red-600">{puppy.name}</h3>
              <p className="text-gray-700 mb-2">{puppy.description}</p>
              <p className="text-gray-700 mb-2">Età: {puppy.age} {puppy.age === 1 ? 'anno' : 'anni'}</p>
              <p className="text-gray-700 mb-2">Razza: {puppy.breed}</p>
              <span className="text-red-500 hover:underline">Scopri di più</span>
            </div>
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">Adoption Status: {puppy.adoptionStatus}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
