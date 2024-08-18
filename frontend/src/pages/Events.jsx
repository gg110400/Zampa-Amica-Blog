import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faClock, faArrowRight, faTrash, faEdit, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

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
    const fetchUserProfile = async () => {
      try {
        const userProfile = await api.getUserProfile();
        setIsAdmin(userProfile.role === 'Admin');
      } catch (err) {
        console.error('Errore nel caricamento del profilo utente:', err);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await api.getAllEvents();
        setEvents(response);
        setLoading(false);
      } catch (err) {
        console.error('Errore nel caricamento degli eventi:', err);
        setError('Errore nel caricamento degli eventi. Riprova più tardi.');
        setLoading(false);
      }
    };

    fetchUserProfile();
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

  if (loading) return <div className="text-center py-12">Caricamento...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

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
              {[...new Set(events.map(event => event.location.split(',')[1]?.trim()).filter(Boolean))].map(city => (
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
              {event.imageUrl && (
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg'; // Immagine di fallback
                  }}
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-2 text-sm">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-red-500" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2 text-sm">
                  <FontAwesomeIcon icon={faClock} className="mr-2 text-red-500" />
                  <span>{event.time}</span>
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
        {filteredEvents.length > eventsPerPage && (
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
        )}
      </div>
    </div>
  );
};

export default Events;