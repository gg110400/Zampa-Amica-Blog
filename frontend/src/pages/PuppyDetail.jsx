import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaw, faCalendar, faVenusMars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const PuppyDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await api.getAnimalById(id);
        setAnimal(response);
        setLoading(false);
      } catch (err) {
        console.error('Errore nel caricamento dei dettagli dell\'animale:', err);
        setError('Errore nel caricamento dei dettagli dell\'animale');
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-2xl text-gray-600">Caricamento...</div>;
  if (error) return <div className="text-center py-20 text-2xl text-gray-600">{error}</div>;
  if (!animal) return <div className="text-center py-20 text-2xl text-gray-600">Animale non trovato</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-7 left-10 flex items-center text-gray-700 hover:text-red-500 transition duration-300"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Torna indietro
      </button>
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden h-[600px] mt-10">
        <div className="flex flex-col md:flex-row h-[600px]">
          <div className="md:w-1/2 relative">
            <img
              src={animal.imageUrl}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {animal.adoptionStatus}
            </div>
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-between bg-gradient-to-br from-pink-50 to-orange-50">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-800 mb-2">{animal.name}</h2>
              <div className="text-sm text-red-600 font-semibold uppercase mb-4">{animal.breed}</div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <FontAwesomeIcon icon={faPaw} className="mr-2 text-red-500" />
                  <span>{animal.species}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2 text-red-500" />
                  <span>{animal.age} {animal.age === 1 ? "anno" : "anni"}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FontAwesomeIcon icon={faVenusMars} className="mr-2 text-red-500" />
                  <span>{animal.gender}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{animal.description}</p>
              <div className="bg-pink-100 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-red-800 mb-2">Storia Medica</h3>
                <p className="text-gray-700">{animal.medicalHistory || "Nessuna storia medica disponibile"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to={`/adopt/${animal._id}`}
                className="flex-grow bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full text-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Adotta {animal.name}
              </Link>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-colors duration-300 ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FontAwesomeIcon icon={faHeart} className={isLiked ? 'text-white' : 'text-gray-700'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuppyDetail;
