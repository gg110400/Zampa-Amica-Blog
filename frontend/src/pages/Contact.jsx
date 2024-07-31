import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Contact.css'; // Assicurati di importare il file CSS per gli stili personalizzati

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Messaggio inviato!');
  };

  return (
    <div className="contact-container mx-auto px-4 py-8 font-poppins">
      <h2 className="text-4xl font-bold text-center mb-8 text-red-600">Contattaci</h2>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/2 bg-white shadow-md rounded-lg p-6 mb-8 md:mb-0">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Scrivici un messaggio</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700 mb-2">Nome</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
                placeholder="Il tuo nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700 mb-2">Messaggio</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
                placeholder="Il tuo messaggio"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 hover:bg-opacity-80 text-sm">
              Invia Messaggio
            </button>
          </form>
        </div>
        <div className="md:w-1/2 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Informazioni di Contatto</h3>
          <div className="mb-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mr-2" />
            <span className="text-gray-700 text-md">Via Roma 123, 00100 Roma, Italia</span>
          </div>
          <div className="mb-4">
            <FontAwesomeIcon icon={faPhone} className="text-red-500 mr-2" />
            <span className="text-gray-700 text-md">+39 0123 456789</span>
          </div>
          <div className="mb-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-red-500 mr-2" />
            <span className="text-gray-700 text-md">info@unazampaamica.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
