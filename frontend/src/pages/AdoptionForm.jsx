import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faHome, faComment, faPaperPlane, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

const AdoptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-orange-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faCheck} className="text-5xl text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Grazie per la tua richiesta di adozione</h2>
          <p className="text-xl text-gray-600 mb-8">Abbiamo ricevuto la tua richiesta. Ti contatteremo presto per discutere i prossimi passi del processo di adozione.</p>
          <button
            onClick={() => navigate('/animals')}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 hover:from-red-600 hover:to-pink-600"
          >
            Torna alla galleria degli animali
          </button>
        </div>
      </div>
    );
  }

  // ... continua dalla Parte 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-7 left-10 flex items-center text-gray-700 hover:text-red-500 transition duration-300"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Torna indietro
      </button>
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden mt-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-gradient-to-br from-red-500 to-pink-500 p-8 text-white flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold mb-6">Adotta un Amico</h2>
            <p className="mb-4">Compilando questo modulo, fai il primo passo verso una nuova amicizia. La tua casa potrebbe diventare il rifugio perfetto per un animale bisognoso di amore.</p>
            <p>Ti contatteremo presto per discutere i dettagli e organizzare un incontro con il tuo potenziale nuovo compagno.</p>
          </div>
          <div className="md:w-1/2 p-8 bg-gradient-to-br from-pink-50 to-orange-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Form di Adozione</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-red-500" />
                  Nome
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Il tuo nome"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-red-500" />
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="La tua email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  <FontAwesomeIcon icon={faPhone} className="mr-2 text-red-500" />
                  Telefono
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Il tuo numero di telefono"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  <FontAwesomeIcon icon={faHome} className="mr-2 text-red-500" />
                  Indirizzo
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Il tuo indirizzo"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  <FontAwesomeIcon icon={faComment} className="mr-2 text-red-500" />
                  Messaggio
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
                  id="message"
                  name="message"
                  placeholder="Perché vuoi adottare questo cucciolo? Raccontaci la tua storia..."
                  rows="4"
                  required
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full text-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                type="submit"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                Invia Richiesta di Adozione
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;