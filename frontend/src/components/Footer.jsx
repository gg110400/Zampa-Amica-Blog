import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-wrap">
          {/* Colonna del logo e descrizione */}
          <div className="w-full md:w-1/4 text-center md:text-left mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <FontAwesomeIcon icon={faPaw} className="h-8 w-8 text-white mr-2" />
              <h1 className="font-pacifico text-2xl">Una Zampa Amica</h1>
            </div>
            <p className="text-white w-60">
              Aiutiamo gli animali bisognosi a trovare una casa e una famiglia amorevole.
            </p>
          </div>

          {/* Colonna dei link utili */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="font-poppins font-bold text-lg mb-3 text-white">Link Utili</h5>
            <ul className="list-none">
              <li className="mt-2">
                <Link to="/about" className="hover:text-yellow-200 transition duration-300">Chi Siamo</Link>
              </li>
              <li className="mt-2">
                <Link to="/services" className="hover:text-yellow-200 transition duration-300">Servizi</Link>
              </li>
              <li className="mt-2">
                <Link to="/faq" className="hover:text-yellow-200 transition duration-300">FAQ</Link>
              </li>
              <li className="mt-2">
                <Link to="/privacy" className="hover:text-yellow-200 transition duration-300">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Colonna dei contatti */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="font-poppins font-bold text-lg mb-3 text-white">Contattaci</h5>
            <ul className="list-none">
              <li className="mt-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-white" />
                <a href="mailto:info@unazampaamica.com" className="hover:text-yellow-200 transition duration-300">info@unazampaamica.com</a>
              </li>
              <li className="mt-2">
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-white" />
                <a href="tel:+390123456789" className="hover:text-yellow-200 transition duration-300">+39 0123 456789</a>
              </li>
              <li className="mt-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-white" />
                <a href="https://www.google.com/maps/search/?api=1&query=Via+Roma+123,+00100+Roma,+Italia" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 transition duration-300">
                  Via Roma 123, 00100 Roma, Italia
                </a>
              </li>
            </ul>
          </div>

          {/* Colonna della newsletter */}
          <div className="w-full md:w-1/4">
            <h5 className="font-poppins font-bold text-lg mb-3 text-white">Newsletter</h5>
            <p className="mb-3 text-white">Iscriviti per ricevere aggiornamenti</p>
            <form className="flex flex-col sm:flex-row">
              <input 
                type="email" 
                className="rounded-l sm:rounded-r-none px-4 py-2 w-full text-gray-800" 
                placeholder="La tua email"
              />
              <button 
                type="submit" 
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-r sm:rounded-l-none px-4 py-2 mt-2 sm:mt-0 transition duration-300"
              >
                Iscriviti
              </button>
            </form>
          </div>
        </div>

        {/* Sezione dei social media */}
        <div className="mt-8 flex justify-center">
          <a href="https://it-it.facebook.com/" className="mx-2 hover:text-yellow-200 transition duration-300 " target='_blank'>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://x.com/X" className="mx-2 hover:text-yellow-200 transition duration-300" target='_blank'>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com/" className="mx-2 hover:text-yellow-200 transition duration-300" target='_blank'>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://it.linkedin.com/" className="mx-2 hover:text-yellow-200 transition duration-300" target='_blank'>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-white">
            © {new Date().getFullYear()} Una Zampa Amica. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

