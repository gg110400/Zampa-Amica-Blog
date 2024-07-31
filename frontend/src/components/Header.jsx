import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo a sinistra */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FontAwesomeIcon icon={faPaw} className="h-8 w-8 text-white mr-2" />
              <span className="font-pacifico text-2xl">Una Zampa Amica</span>
            </Link>
          </div>

          {/* Links al centro (visibili solo su schermi medi e grandi) */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="font-poppins hover:text-yellow-200 transition duration-300">Home</Link>
            <Link to="/animals" className="font-poppins hover:text-yellow-200 transition duration-300">Adozioni</Link>
            <Link to="/events" className="font-poppins hover:text-yellow-200 transition duration-300">Eventi</Link>
            <Link to="/blog" className="font-poppins hover:text-yellow-200 transition duration-300">Blog</Link>
            <Link to="/donate" className="font-poppins hover:text-yellow-200 transition duration-300">Dona</Link>
            <Link to="/contact" className="font-poppins hover:text-yellow-200 transition duration-300">Contatti</Link>
          </nav>

          {/* Pulsanti a destra */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login" className="bg-white text-gray-800 font-bold py-2 px-4 rounded shadow-md transition duration-300 hover:bg-gray-100">
              Accedi
            </Link>
            <Link to="/register" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300">
              Iscriviti
            </Link>
          </div>

          {/* Pulsante menu per schermi piccoli */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
        </div>

        {/* Menu per schermi piccoli */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link to="/" className="font-poppins block hover:text-yellow-200 transition duration-300">Home</Link>
            <Link to="/animals" className="font-poppins block hover:text-yellow-200 transition duration-300">Adozioni</Link>
            <Link to="/events" className="font-poppins block hover:text-yellow-200 transition duration-300">Eventi</Link>
            <Link to="/blog" className="font-poppins block hover:text-yellow-200 transition duration-300">Blog</Link>
            <Link to="/donate" className="font-poppins block hover:text-yellow-200 transition duration-300">Dona</Link>
            <Link to="/contact" className="font-poppins block hover:text-yellow-200 transition duration-300">Contatti</Link>
            <Link to="/login" className="font-poppins block hover:text-yellow-200 transition duration-300">Accedi</Link>
            <Link to="/register" className="font-poppins block hover:text-yellow-200 transition duration-300">Iscriviti</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
