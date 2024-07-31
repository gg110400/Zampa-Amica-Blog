import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Home = () => {
  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 text-white text-center py-20">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4">Benvenuti a Una Zampa Amica</h1>
          <p className="text-xl mb-8">Aiutiamo gli animali bisognosi a trovare una casa amorevole</p>
          <img src="https://images.unsplash.com/photo-1592951117908-4acda89ee817?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Squadra" className="w-full max-w-xl mx-auto rounded-lg mb-8" />
          <Link to="/donate" className="bg-white bg-opacity-20 text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-opacity-30">Dona Ora</Link>
        </div>
      </section>

      {/* Chi Siamo */}
      <section className="py-20 bg-white text-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 px-20">
            <h2 className="text-4xl font-bold mb-4">Chi Siamo</h2>
            <p className="text-lg mb-8 text-gray-500">
              Siamo un'organizzazione dedicata a salvare e trovare case per gli animali in difficoltà. 
              Collaboriamo con rifugi, cliniche veterinarie e volontari per fornire assistenza sanitaria, cibo e una casa temporanea ai nostri amici a quattro zampe. 
              Organizziamo eventi di adozione, campagne di sensibilizzazione e programmi educativi per promuovere il benessere 
              degli animali e costruire una comunità più empatica e responsabile. La tua partecipazione e il tuo sostegno sono fondamentali 
              per il successo delle nostre iniziative.
            </p>
            <Link to="/about" className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-opacity-70 text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-opacity-80">Scopri di Più</Link>
          </div>
          <div className="md:w-1/2 px-20">
            <img src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chi Siamo" className="rounded-md shadow-lg max-w-xl" />
          </div>
        </div>
      </section>

      {/* Animali in Evidenza */}
      <section className="py-12 bg-gray-100 text-gray-800 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Animali in Evidenza</h2>
          <p className="text-lg mb-8">Conosci alcuni dei nostri adorabili amici che cercano casa.</p>
          <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} className="mb-8 h-96">
            <div className="bg-white bg-opacity-80 shadow-md rounded-md p-4 mx-4">
              <img src="https://via.placeholder.com/300" alt="Animale 1" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-red-600">Animale 1</h3>
              <p className="text-gray-700">Descrizione breve dell'animale.</p>
            </div>
            <div className="bg-white bg-opacity-80 shadow-md rounded-md p-4 mx-4">
              <img src="https://via.placeholder.com/300" alt="Animale 2" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-red-600">Animale 2</h3>
              <p className="text-gray-700">Descrizione breve dell'animale.</p>
            </div>
            <div className="bg-white bg-opacity-80 shadow-md rounded-md p-4 mx-4">
              <img src="https://via.placeholder.com/300" alt="Animale 3" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-red-600">Animale 3</h3>
              <p className="text-gray-700">Descrizione breve dell'animale.</p>
            </div>
            {/* Aggiungi altre carte animali qui */}
          </Carousel>
          <Link to="/animals" className="mt-8 inline-block bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-opacity-70 text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-opacity-80">Vedi Tutti</Link>
        </div>
      </section>

      {/* Eventi e Notizie */}
      <section className="py-20 bg-white text-gray-800 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Eventi</h2>
          <p className="text-lg mb-8">Resta aggiornato sugli ultimi eventi della nostra organizzazione.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ms-3">
            <div className="bg-white bg-opacity-80 shadow-xl rounded-md p-6 h-80 transform transition duration-300 hover:scale-105 cursor-pointer">
              <img src="https://via.placeholder.com/400x300" alt="Evento 1" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-bold mb-2">Evento 1</h3>
              <p className="text-gray-700">Descrizione breve dell'evento.</p>
            </div>
            <div className="bg-white bg-opacity-80 shadow-xl rounded-md p-6 h-80 transform transition duration-300 hover:scale-105 cursor-pointer">
              <img src="https://via.placeholder.com/400x300" alt="Evento 2" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-bold mb-2">Evento 2</h3>
              <p className="text-gray-700">Descrizione breve dell'evento.</p>
            </div>
            <div className="bg-white bg-opacity-80 shadow-xl rounded-md p-6 h-80 me-3 transform transition duration-300 hover:scale-105 cursor-pointer">
              <img src="https://via.placeholder.com/400x300" alt="Evento 3" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-bold mb-2">Evento 3</h3>
              <p className="text-gray-700">Descrizione breve dell'evento.</p>
            </div>
          </div>
          <Link to="/events" className="mt-8 inline-block bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-opacity-70 text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-opacity-80">Vedi Tutti</Link>
        </div>
      </section>

      {/* Come Aiutare */}
      <section className="py-20 text-center bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Come Aiutare</h2>
          <p className="text-lg mb-8">Scopri come puoi fare la differenza e aiutare gli animali in difficoltà.</p>
          <Link to="/donate" className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-opacity-70 text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-opacity-80">Dona Ora</Link>
          <Link to="/volunteer" className="ml-4 bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-opacity-70 text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-opacity-80">Volontariato</Link>
        </div>
      </section>

      {/* Testimonianze */}
      <section className="py-20 bg-white text-gray-800 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-5">Testimonianze</h2>
          <p className="text-lg mb-10">Leggi cosa dicono le persone che hanno adottato i nostri animali.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4 md:mx-0">
            <div className="bg-white bg-opacity-80 shadow-xl rounded-md p-6 ms-2">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Maria Rossi" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <p className="text-gray-700 mb-4">"Ho adottato un cane da Una Zampa Amica e l'esperienza è stata fantastica!"</p>
              <h3 className="text-2xl font-bold">Maria Rossi</h3>
            </div>
            <div className="bg-white bg-opacity-80 shadow-xl rounded-md p-6">
              <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Luigi Verdi" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <p className="text-gray-700 mb-4">"Un'organizzazione davvero dedicata. Grazie per il vostro lavoro!"</p>
              <h3 className="text-2xl font-bold">Luigi Verdi</h3>
            </div>
            <div className="bg-white bg-opacity-80 shadow-xl rounded-md p-6">
              <img src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Giulia Bianchi" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <p className="text-gray-700 mb-4">"Grazie a Una Zampa Amica abbiamo trovato il nostro nuovo migliore amico."</p>
              <h3 className="text-2xl font-bold">Giulia Bianchi</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
