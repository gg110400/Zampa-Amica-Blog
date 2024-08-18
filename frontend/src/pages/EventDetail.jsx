import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faClock, faUsers, faTicketAlt, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false); // Aggiunto stato per registrazione

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.getEventById(id);
        if (response) {
          setEvent(response);
        } else {
          setError('Evento non trovato');
        }
      } catch (err) {
        console.error('Errore nel caricamento dell\'evento:', err);
        setError('Si è verificato un errore durante il caricamento dell\'evento. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
        <p className="text-gray-700">{error}</p>
      </div>
    </div>
  );

  if (!event) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Evento non trovato</h2>
        <p className="text-gray-700">L'evento che stai cercando non esiste o è stato rimosso.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen max-w-screen bg-gradient-to-br from-red-50 to-pink-50 flex justify-center">
      <div className="max-w-screen mx-auto bg-white shadow-2xl overflow-hidden relative h-[800px] mt-10 mb-10 rounded-lg">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 flex items-center text-white hover:text-red-500 transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Torna indietro
        </button>
        <div className="relative">
          {event.imageUrl && (
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-80 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          )}
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-4xl font-bold mb-2 text-white">{event.title}</h2>
          </div>
        </div>
        <div className="p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-2xl text-red-500" />
              <div>
                <p className="font-semibold">Data</p>
                <p>{new Date(event.date).toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faClock} className="mr-3 text-2xl text-red-500" />
              <div>
                <p className="font-semibold">Ora</p>
                <p>{event.time}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 text-2xl text-red-500" />
              <div>
                <p className="font-semibold">Luogo</p>
                <p>{event.location}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faUsers} className="mr-3 text-2xl text-red-500" />
              <div>
                <p className="font-semibold">Capacità</p>
                <p>{event.capacity || 'Non specificata'}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Descrizione dell'evento</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>
          <div className="mt-8">
            <button
              onClick={() => {
                setRegistered(true); // Imposta registrazione a true
              }}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg w-full"
            >
              <FontAwesomeIcon icon={faTicketAlt} className="mr-3" />
              Prenota ora
            </button>
            {registered && ( // Condizione per mostrare il messaggio
              <div className="flex items-center text-green-500 mt-4">
                <FontAwesomeIcon icon={faCheck} className="mr-2" /> {/* Spunta verde */}
                Ti sei correttamente registrato all'evento
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;