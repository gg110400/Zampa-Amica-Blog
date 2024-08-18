import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faHeart, faInfoCircle, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const defaultAnimals = [
  {
    _id: '1',
    name: 'Luna',
    description: 'Luna è una dolce gattina di 2 anni in cerca di una casa amorevole.',
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Soriano',
    age: 2,
    species: 'Gatto',
    city: 'Roma'
  },
  {
    _id: '2',
    name: 'Max',
    description: 'Max è un cane giocherellone di 3 anni che adora le passeggiate.',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Labrador',
    age: 3,
    species: 'Cane',
    city: 'Milano'
  },
  {
    _id: '3',
    name: 'Bella',
    description: 'Bella è una coniglietta affettuosa di 1 anno che cerca una famiglia.',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'In attesa',
    breed: 'Nano',
    age: 1,
    species: 'Coniglio',
    city: 'Firenze'
  },
  {
    _id: '4',
    name: 'Rocky',
    description: 'Rocky è un cane pastore di 4 anni, molto intelligente e protettivo.',
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?q=80&w=2067&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Pastore Tedesco',
    age: 4,
    species: 'Cane',
    city: 'Napoli'
  },
  {
    _id: '5',
    name: 'Micio',
    description: 'Micio è un gattino di 6 mesi molto giocherellone e affettuoso.',
    imageUrl: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=2080&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Europeo',
    age: 0.5,
    species: 'Gatto',
    city: 'Torino'
  },
  {
    _id: '6',
    name: 'Fido',
    description: 'Fido è un cane adulto di 7 anni, calmo e perfetto per famiglie.',
    imageUrl: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Golden Retriever',
    age: 7,
    species: 'Cane',
    city: 'Bologna'
  },
  {
    _id: '7',
    name: 'Whiskers',
    description: 'Whiskers è un gatto persiano di 5 anni, amante delle coccole.',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Persiano',
    age: 5,
    species: 'Gatto',
    city: 'Palermo'
  },
  {
    _id: '8',
    name: 'Buddy',
    description: 'Buddy è un cane meticcio di 2 anni, energico e amichevole.',
    imageUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'In attesa',
    breed: 'Meticcio',
    age: 2,
    species: 'Cane',
    city: 'Genova'
  },
  {
    _id: '9',
    name: 'Oreo',
    description: 'Oreo è un coniglio di 3 anni, tranquillo e adorabile.',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Olandese',
    age: 3,
    species: 'Coniglio',
    city: 'Venezia'
  },
  {
    _id: '10',
    name: 'Simba',
    description: 'Simba è un gattone di 6 anni, regale e affettuoso.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Maine Coon',
    age: 6,
    species: 'Gatto',
    city: 'Roma'
  },
  {
    _id: '11',
    name: 'Daisy',
    description: 'Daisy è una cagnolina di 4 anni, dolce e ubbidiente.',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop',
    adoptionStatus: 'In attesa',
    breed: 'Beagle',
    age: 4,
    species: 'Cane',
    city: 'Firenze'
  },
  {
    _id: '12',
    name: 'Thumper',
    description: 'Thumper è un coniglietto di 1 anno, curioso e vivace.',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Ariete',
    age: 1,
    species: 'Coniglio',
    city: 'Milano'
  },
  {
    _id: '13',
    name: 'Nala',
    description: 'Nala è una gatta siamese di 3 anni, elegante e vocale.',
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Siamese',
    age: 3,
    species: 'Gatto',
    city: 'Torino'
  },
  {
    _id: '14',
    name: 'Charlie',
    description: 'Charlie è un cane adulto di 8 anni, calmo e ben addestrato.',
    imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'Disponibile',
    breed: 'Bulldog',
    age: 8,
    species: 'Cane',
    city: 'Napoli'
  },
  {
    _id: '15',
    name: 'Kiki',
    description: 'Kiki è una coniglietta di 2 anni, socievole e amante delle carote.',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=2070&auto=format&fit=crop',
    adoptionStatus: 'In attesa',
    breed: 'Rex',
    age: 2,
    species: 'Coniglio',
    city: 'Bologna'
  }
];

const Gallery = () => {
  const [animals, setAnimals] = useState(defaultAnimals);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    species: '',
    age: '',
    city: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const animalsPerPage = 9;

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.getAllAnimals();
        setAnimals(response.length > 0 ? response : defaultAnimals);
        setLoading(false);
      } catch (err) {
        console.error('Errore nel caricamento degli animali:', err);
        setAnimals(defaultAnimals);
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
    setCurrentPage(1);
  };

  const filteredAnimals = animals.filter(animal => {
    return (
      (filters.species === '' || animal.species === filters.species) &&
      (filters.age === '' || 
        (filters.age === '0-2' && animal.age <= 2) || 
        (filters.age === '3-5' && animal.age > 2 && animal.age <= 5) || 
        (filters.age === '6+' && animal.age > 5)
      ) &&
      (filters.city === '' || animal.city === filters.city)
    );
  });

  const indexOfLastAnimal = currentPage * animalsPerPage;
  const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage;
  const currentAnimals = filteredAnimals.slice(indexOfFirstAnimal, indexOfLastAnimal);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-2">
            Centro Adozioni
          </h2>
          <p className="text-lg text-gray-600">Trova il tuo nuovo migliore amico</p>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-base font-semibold mb-3 flex items-center">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filtra animali
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              name="species"
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            >
              <option value="">Tutte le specie</option>
              <option value="Cane">Cane</option>
              <option value="Gatto">Gatto</option>
              <option value="Coniglio">Coniglio</option>
            </select>
            <select
              name="age"
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            >
              <option value="">Tutte le età</option>
              <option value="0-2">0-2 anni</option>
              <option value="3-5">3-5 anni</option>
              <option value="6+">6+ anni</option>
            </select>
            <select
              name="city"
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            >
              <option value="">Tutte le città</option>
              <option value="Roma">Roma</option>
              <option value="Milano">Milano</option>
              <option value="Napoli">Napoli</option>
              <option value="Torino">Torino</option>
              <option value="Firenze">Firenze</option>
              <option value="Bologna">Bologna</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentAnimals.map(animal => (
            <Link
              to={`/animal/${animal._id}`}
              key={animal._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={animal.imageUrl}
                  alt={animal.name}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute top-0 left-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                  {animal.adoptionStatus}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1 text-gray-800">{animal.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{animal.description.substring(0, 60)}...</p>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                  <span><FontAwesomeIcon icon={faPaw} className="mr-1" /> {animal.breed}</span>
                  <span>{animal.age} {animal.age === 1 ? 'anno' : 'anni'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-500 text-sm font-semibold flex items-center">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                    Scopri di più
                  </span>
                  <button className="bg-red-100 text-red-500 rounded-full p-1.5 hover:bg-red-200 transition-colors duration-300">
                    <FontAwesomeIcon icon={faHeart} size="sm" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({ length: Math.ceil(filteredAnimals.length / animalsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredAnimals.length / animalsPerPage)}
            className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;