import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const About = () => {
  return (
    <div className="font-poppins">
      <section className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 text-white text-center py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Chi Siamo</h1>
          <p className="text-xl mb-8">Dedicati a salvare e trovare case amorevoli per gli animali bisognosi.</p>
          <div className="flex justify-center">
            <FontAwesomeIcon icon={faPaw} className="text-6xl mx-2" />
            <FontAwesomeIcon icon={faHeart} className="text-6xl mx-2" />
            <FontAwesomeIcon icon={faPaw} className="text-6xl mx-2" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 px-4">
              <h2 className="text-4xl font-bold mb-4">La Nostra Missione</h2>
              <p className="text-lg mb-8 text-gray-700">
                La nostra missione è di migliorare la vita degli animali abbandonati e maltrattati, offrendo loro cure, amore e una nuova casa.
                Collaboriamo con rifugi, cliniche veterinarie e volontari per garantire che ogni animale riceva l'attenzione e le cure di cui ha bisogno.
              </p>
            </div>
            <div className="md:w-1/2 px-4">
              <img src="https://images.unsplash.com/photo-1601758063890-1167f394febb?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="La Nostra Missione" className="rounded-md shadow-lg max-w-xl ms-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8">Il Nostro Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Membro del Team" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Anna Rossi</h3>
              <p className="text-gray-700 mb-4">Fondatrice e Direttrice</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Membro del Team" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Marco Bianchi</h3>
              <p className="text-gray-700 mb-4">Responsabile Adozioni</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img src="https://images.unsplash.com/photo-1554727242-741c14fa561c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Membro del Team" className="w-32 h-32 object-cover object-center rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Lucia Verdi</h3>
              <p className="text-gray-700 mb-4">Coordinatrice Volontari</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 transition duration-300">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">La Nostra Storia</h2>
          <p className="text-lg mb-8 text-gray-700">
            Una Zampa Amica è stata fondata nel 2020 con l'obiettivo di combattere l'abbandono e il maltrattamento degli animali.
            Da allora, abbiamo aiutato centinaia di animali a trovare una casa amorevole e continuiamo a lavorare per migliorare le loro vite ogni giorno.
          </p>
          <img src="https://images.unsplash.com/photo-1562505209-85d7688af8a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="La Nostra Storia" className="w-full max-w-xl mx-auto rounded-md shadow-lg" />
        </div>
      </section>

      <section className="py-20 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">I Nostri Valori</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2 text-red-600">Amore</h3>
              <p className="text-gray-700">Ci prendiamo cura di ogni animale con amore e dedizione, garantendo loro un ambiente sicuro e accogliente.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2 text-red-600">Empatia</h3>
              <p className="text-gray-700">Comprendiamo le esigenze e i sentimenti degli animali, lavorando per trovare la soluzione migliore per ciascuno di loro.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2 text-red-600">Impegno</h3>
              <p className="text-gray-700">Siamo dedicati alla nostra missione e lavoriamo instancabilmente per migliorare la vita degli animali in difficoltà.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Unisciti a Noi</h2>
          <p className="text-lg mb-8 text-gray-700">
            Puoi fare la differenza nella vita di molti animali. Diventa un volontario, fai una donazione o adotta un animale.
            Ogni piccolo gesto può portare un grande cambiamento.
          </p>
          <Link to="/volunteer" className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-opacity-80">Diventa Volontario</Link>
          <Link to="/donate" className="ml-4 bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-opacity-80">Fai una Donazione</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
