import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane, faHeart, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-orange-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faCheck} className="text-5xl text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Grazie per averci contattato</h2>
          <p className="text-xl text-gray-600 mb-8">Il tuo messaggio è stato inviato con successo. Ti risponderemo il prima possibile!</p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 hover:from-red-600 hover:to-pink-600"
          >
            Torna al form di contatto
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto">
        <div className="text-center mb-10 ">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-3">
            Contattaci
          </h2>
          <p className="text-lg text-gray-600">Siamo qui per aiutarti. Mandaci un messaggio!</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden ">
          <div className="flex flex-col md:flex-row ">
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Scrivici un messaggio</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-300"
                    placeholder="Il tuo nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-300"
                    placeholder="La tua email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-300"
                    placeholder="Il tuo messaggio"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  Invia Messaggio
                </button>
              </form>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-red-500 to-pink-600 p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Informazioni di Contatto</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-4 mt-1 text-xl" />
                  <span>Via Roma 123, 00100 Roma, Italia</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPhone} className="mr-4 text-xl" />
                  <span>+39 0123 456789</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-4 text-xl" />
                  <span>info@unazampaamica.com</span>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Seguici sui social</h4>
                <div className="flex space-x-3">
                  {[faFacebookF, faTwitter, faInstagram, faLinkedinIn].map((icon, index) => (
                    <a key={index} href="#" className="bg-white p-2 rounded-full text-red-500 hover:text-pink-600 transition duration-300 transform hover:-translate-y-1">
                      <FontAwesomeIcon icon={icon} size="lg" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-base text-gray-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-2" />
            Grazie per il tuo interesse in Una Zampa Amica
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;