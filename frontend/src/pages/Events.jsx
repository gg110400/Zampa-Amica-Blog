import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faClock, faArrowRight, faTrash, faEdit, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filters, setFilters] = useState({
    month: '',
    location: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userProfile = await api.getUserRole();
        setIsAdmin(userProfile && userProfile.user && userProfile.user.role === 'Admin');
      } catch (err) {
        console.error('Errore nel caricamento del ruolo utente:', err);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await api.getAllEvents();
        setEvents(response.length > 0 ? response : defaultEvents);
        setLoading(false);
      } catch (err) {
        console.error('Errore nel caricamento degli eventi:', err);
        setEvents(defaultEvents);
        setLoading(false);
      }
    };

    fetchUserRole();
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo evento?')) {
      try {
        await api.deleteEvent(eventId);
        setEvents(events.filter(event => event._id !== eventId));
      } catch (err) {
        setError('Errore durante l\'eliminazione dell\'evento');
        console.error('Errore durante l\'eliminazione dell\'evento:', err);
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
    setCurrentPage(1);
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.getMonth() + 1; // getMonth() returns 0-11
    return (
      (filters.month === '' || eventMonth.toString() === filters.month) &&
      (filters.location === '' || event.location.includes(filters.location))
    );
  });

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
          Eventi in Programma
        </h2>

        {/* Filtri */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filtra eventi
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="month"
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            >
              <option value="">Tutti i mesi</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <select
              name="location"
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            >
              <option value="">Tutte le località</option>
              {[...new Set(events.map(event => event.location.split(',')[1].trim()))].map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentEvents.map(event => (
            <div key={event._id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-2 text-sm">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-red-500" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2 text-sm">
                  <FontAwesomeIcon icon={faClock} className="mr-2 text-red-500" />
                  <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3 text-sm">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-red-500" />
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-700 mb-4 text-sm">{event.description}</p>
                <Link 
                  to={`/event/${event._id}`} 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-0.5"
                >
                  Scopri di più
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
                {isAdmin && (
                  <div className="flex justify-end space-x-2 mt-4">
                    <button 
                      onClick={() => handleDelete(event._id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Link 
                      to={`/edit-event/${event._id}`}
                      className="text-blue-500 hover:text-blue-700 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Paginazione */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }, (_, i) => (
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
            disabled={currentPage === Math.ceil(filteredEvents.length / eventsPerPage)}
            className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;