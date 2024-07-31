import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const events = [
  {
    id: 1,
    title: 'Raduno di Amici a Quattro Zampe',
    date: '25 Agosto 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Parco Centrale, Roma',
    description: 'Un raduno per tutti gli amanti degli animali, con attività divertenti e giochi per cani.',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: 2,
    title: 'Conferenza sulla Salute Animale',
    date: '10 Settembre 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Centro Congressi, Milano',
    description: 'Una conferenza con esperti veterinari che discuteranno della salute e del benessere degli animali.',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: 3,
    title: 'Attività Formative per Bambini',
    date: '15 Ottobre 2024',
    time: '3:00 PM - 5:00 PM',
    location: 'Scuola Primaria, Napoli',
    description: 'Attività divertenti e istruttive per insegnare ai bambini come prendersi cura degli animali domestici.',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: 4,
    title: 'Giornata di Adozione',
    date: '30 Novembre 2024',
    time: '11:00 AM - 4:00 PM',
    location: 'Rifugio Animali, Firenze',
    description: 'Un\'opportunità per adottare animali in cerca di una nuova casa amorevole.',
    imageUrl: 'https://via.placeholder.com/600x400',
  }
];

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return <div>Evento non trovato</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 font-poppins flex flex-col justify-center items-center">
      <div className="bg-white  rounded-lg p-6 flex flex-col justify-center items-center ">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">{event.title}</h2>
        <img src={event.imageUrl} alt={event.title} className="w-[800px] h-[400px]  object-cover rounded-md mb-8" />
        <div className="flex items-center text-gray-700 mb-3">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-3">
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-6">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
          <span>{event.location}</span>
        </div>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <button className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-opacity-70 text-white font-bold py-2 px-4 rounded-md transition duration-300 hover:bg-opacity-80">
          Registrati all'evento
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
