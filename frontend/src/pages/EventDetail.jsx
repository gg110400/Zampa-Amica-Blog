import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const defaultEvents = [
  {
    _id: '1',
    title: 'Giornata di adozione dei cuccioli',
    date: '2023-06-15T10:00:00',
    location: 'Parco Centrale, Milano',
    description: 'Vieni a conoscere i nostri adorabili cuccioli in cerca di una casa amorevole.',
    imageUrl: 'https://images.unsplash.com/photo-1622050956578-94fd044a0ada?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    _id: '2',
    title: 'Seminario sul benessere degli animali',
    date: '2023-07-01T14:30:00',
    location: 'Centro Congressi, Roma',
    description: 'Esperti del settore discuteranno le migliori pratiche per il benessere degli animali domestici.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661942274165-00cc8d55a93f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    _id: '3',
    title: 'Corso di addestramento per cani',
    date: '2023-08-10T09:00:00',
    location: 'Parco Canile, Firenze',
    description: 'Impara le tecniche di base per addestrare il tuo cane con i nostri esperti cinofili.',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    _id: '4',
    title: 'Fiera degli animali esotici',
    date: '2023-09-05T11:00:00',
    location: 'Fiera di Bologna, Bologna',
    description: 'Scopri il mondo affascinante degli animali esotici e impara come prendertene cura responsabilmente.',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    _id: '5',
    title: 'Gara di agility per cani',
    date: '2023-10-20T10:00:00',
    location: 'Campo Sportivo, Torino',
    description: 'Partecipa con il tuo cane alla nostra divertente gara di agility e vinci fantastici premi!',
    imageUrl: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    _id: '6',
    title: 'Workshop sulla fotografia di animali',
    date: '2023-11-15T15:00:00',
    location: 'Studio Fotografico, Napoli',
    description: 'Impara le tecniche per catturare bellissime foto dei tuoi amici a quattro zampe.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1674390103567-20858151f51a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.getEventById(id);
        if (response) {
          setEvent(response);
        } else {
          // Se la risposta è vuota, cerca nell'array di default
          const defaultEvent = defaultEvents.find(e => e._id === id);
          if (defaultEvent) {
            setEvent(defaultEvent);
          } else {
            setError('Evento non trovato');
          }
        }
      } catch (err) {
        console.error('Errore nel caricamento dell\'evento:', err);
        // In caso di errore, usa l'evento di default
        const defaultEvent = defaultEvents.find(e => e._id === id);
        if (defaultEvent) {
          setEvent(defaultEvent);
        } else {
          setError('Evento non trovato');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div className="text-center py-12 text-lg text-gray-600">Caricamento...</div>;
  if (error) return <div className="text-center py-12 text-lg text-gray-600">{error}</div>;
  if (!event) return <div className="text-center py-12 text-lg text-gray-600">Evento non trovato</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{event.title}</h2>
          <div className="flex items-center text-gray-600 mb-2">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-red-500" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-red-500" />
            <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-red-500" />
            <span>{event.location}</span>
          </div>
          <p className="text-gray-700 mb-6">{event.description}</p>
          <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-0.5">
            Registrati all'evento
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;