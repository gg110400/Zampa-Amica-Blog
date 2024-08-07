import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaw, faInfoCircle, faComment } from '@fortawesome/free-solid-svg-icons';

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

const PuppyDetail = () => {
  const { id } = useParams();
  const puppy = puppies.find((p) => p.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('info');
  const [isLiked, setIsLiked] = useState(false);

  if (!puppy) {
    return <div className="text-center py-20 text-2xl text-gray-600">Cucciolo non trovato</div>;
  }

  const tabContent = {
    info: (
      <div className="space-y-4 text-gray-700">
        <p><span className="font-semibold">Specie:</span> {puppy.species}</p>
        <p><span className="font-semibold">Razza:</span> {puppy.breed}</p>
        <p><span className="font-semibold">Età:</span> {puppy.age} {puppy.age === 1 ? "anno" : "anni"}</p>
        <p><span className="font-semibold">Genere:</span> {puppy.gender}</p>
        <p><span className="font-semibold">Descrizione:</span> {puppy.description}</p>
        <p><span className="font-semibold">Stato di Adozione:</span> {puppy.adoptionStatus}</p>
        <p><span className="font-semibold">Storia Medica:</span> {puppy.medicalHistory}</p>
      </div>
    ),
    personality: (
      <div className="space-y-4 text-gray-700">
        <p><span className="font-semibold">Personalità:</span> {puppy.personality}</p>
      </div>
    ),
    comments: (
      <div className="space-y-4 text-gray-700">
        <p>Non ci sono ancora commenti per {puppy.name}.</p>
      </div>
    ),
  };

  return (
    <div className="bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={puppy.imageUrl}
              alt={puppy.name}
              className="h-64 w-full object-cover md:w-64"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-red-500 font-semibold">{puppy.breed}</div>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 leading-tight">{puppy.name}</h2>
            <p className="mt-2 text-gray-600">{puppy.adoptionStatus}</p>
            
            <div className="mt-6 flex space-x-2">
              {[
                { id: 'info', icon: faInfoCircle, label: 'Info' },
                { id: 'personality', icon: faPaw, label: 'Personalità' },
                { id: 'comments', icon: faComment, label: 'Commenti' },
              ].map((tab) => (
                <button 
                  key={tab.id}
                  className={`flex items-center px-4 py-2 rounded-full text-sm transition-colors duration-200 ease-in-out ${
                    activeTab === tab.id 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6">{tabContent[activeTab]}</div>

            <div className="mt-8 flex items-center space-x-4">
              <Link
                to={`/adopt/${puppy.id}`}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full hover:from-red-600 hover:to-pink-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                Adotta {puppy.name}
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