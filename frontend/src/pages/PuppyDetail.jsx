import React from "react";
import { useParams, Link } from "react-router-dom";

const puppies = [
  {
    id: 1,
    name: "Fido",
    species: "Dog",
    breed: "Labrador",
    age: 2,
    gender: "Male",
    description: "A friendly and energetic labrador.",
    imageUrl: "https://via.placeholder.com/600x400",
    adoptionStatus: "Available",
    medicalHistory: "Vaccinated, No known health issues",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Bella",
    species: "Dog",
    breed: "Beagle",
    age: 1,
    gender: "Female",
    description: "A playful and loving beagle.",
    imageUrl: "https://via.placeholder.com/600x400",
    adoptionStatus: "Available",
    medicalHistory: "Vaccinated, No known health issues",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Charlie",
    species: "Dog",
    breed: "Poodle",
    age: 3,
    gender: "Male",
    description: "A smart and obedient poodle.",
    imageUrl: "https://via.placeholder.com/600x400",
    adoptionStatus: "Available",
    medicalHistory: "Vaccinated, No known health issues",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Lucy",
    species: "Dog",
    breed: "Bulldog",
    age: 4,
    gender: "Female",
    description: "A calm and loving bulldog.",
    imageUrl: "https://via.placeholder.com/600x400",
    adoptionStatus: "Available",
    medicalHistory: "Vaccinated, No known health issues",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Max",
    species: "Dog",
    breed: "German Shepherd",
    age: 2,
    gender: "Male",
    description: "A loyal and protective German Shepherd.",
    imageUrl: "https://via.placeholder.com/600x400",
    adoptionStatus: "Available",
    medicalHistory: "Vaccinated, No known health issues",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "Daisy",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    gender: "Female",
    description: "A friendly and playful Golden Retriever.",
    imageUrl: "https://via.placeholder.com/600x400",
    adoptionStatus: "Available",
    medicalHistory: "Vaccinated, No known health issues",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: "Rocky",
    species: "Dog",
    breed: "Rottweiler",
    age: 4,
    gender: "Male",
    description: "A strong and loyal Rottweiler.",
    imageUrl: "https://via.placeholder.com/600x400",
    adoptionStatus: "Available",
    medicalHistory: "Vaccinated, No known health issues",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: "Molly",
    species: "Dog",
    breed: "Cocker Spaniel",
    age: 2,
    gender: "Female",
    description: "A gentle and affectionate Cocker Spaniel.",
    imageUrl: "https://via.placeholder.com/600x400",
    adoptionStatus: "Available",
    medicalHistory: "Vaccinated, No known health issues",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    name: "Buddy",
    species: "Dog",
    breed: "Boxer",
    age: 3,
    gender: "Male",
    description: "An energetic and playful Boxer.",
    imageUrl: "https://via.placeholder.com/600x400",
    adoptionStatus: "Available",
    medicalHistory: "Vaccinated, No known health issues",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    name: "Lola",
    species: "Dog",
    breed: "Shih Tzu",
    age: 1,
    gender: "Female",
    description: "A small and loving Shih Tzu.",
    imageUrl: "https://via.placeholder.com/600x400",
    adoptionStatus: "Available",
    medicalHistory: "Vaccinated, No known health issues",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const PuppyDetail = () => {
  const { id } = useParams();
  const puppy = puppies.find((p) => p.id === parseInt(id));

  if (!puppy) {
    return <div>Cucciolo non trovato</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 ms-20">
            <img
              src={puppy.imageUrl}
              alt={puppy.name}
              className="w-[700px] h-[400px] object-cover rounded-md shadow-lg mb-8 md:mb-0"
            />
          </div>
          <div className="md:ml-8 mt-4 md:mt-0 flex-1 p-8">
            <h2 className="text-4xl font-bold mb-6 text-red-600">
              {puppy.name}
            </h2>
            <div className="text-lg text-gray-800">
              <p className="mb-2">
                <strong>Specie:</strong> {puppy.species}
              </p>
              <p className="mb-2">
                <strong>Razza:</strong> {puppy.breed}
              </p>
              <p className="mb-2">
                <strong>Età:</strong> {puppy.age}{" "}
                {puppy.age === 1 ? "anno" : "anni"}
              </p>
              <p className="mb-2">
                <strong>Genere:</strong> {puppy.gender}
              </p>
              <p className="mb-2">
                <strong>Descrizione:</strong> {puppy.description}
              </p>
              <p className="mb-2">
                <strong>Stato di Adozione:</strong> {puppy.adoptionStatus}
              </p>
              <p className="mb-2">
                <strong>Storia Medica:</strong> {puppy.medicalHistory}
              </p>
              <Link
                to={`/adopt/${puppy.id}`}
                className="mt-8 inline-block bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-opacity-70 text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-opacity-80"
              >
                Adotta {puppy.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuppyDetail;
