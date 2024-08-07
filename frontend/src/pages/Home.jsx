import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faHandsHelping,
  faCalendarAlt,
  faMapMarkerAlt,
  faPaw,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "react-multi-carousel/lib/styles.css";
import api from "../services/api";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const defaultAnimals = [
  {
    _id: "1",
    name: "Luna",
    description:
      "Luna è una dolce gattina di 2 anni in cerca di una casa amorevole. Adora giocare e fare le fusa.",
    imageUrl:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    _id: "2",
    name: "Max",
    description:
      "Max è un cane giocherellone di 3 anni che adora le passeggiate e i bambini. È molto energico e affettuoso.",
    imageUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    _id: "3",
    name: "Bella",
    description:
      "Bella è una coniglietta affettuosa di 1 anno che cerca una famiglia. Ama le carote e le coccole.",
    imageUrl:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=2070&auto=format&fit=crop",
  },
  {
    _id: "4",
    name: "Charlie",
    description:
      "Charlie è un pappagallo colorato e intelligente di 5 anni. Ama imparare nuove parole e interagire con le persone.",
    imageUrl:
      "https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "5",
    name: "Nemo",
    description:
      "Nemo è un simpatico pesciolino rosso di 1 anno. Perfetto per chi cerca un amico acquatico poco impegnativo.",
    imageUrl:
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=2012&auto=format&fit=crop",
  },
  {
    _id: "6",
    name: "Oliver",
    description:
      "Oliver è un gattone pigro di 4 anni che adora dormire al sole. Cerca una casa tranquilla dove rilassarsi.",
    imageUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
  },
  {
    _id: "7",
    name: "Rocky",
    description:
      "Rocky è un cane pastore di 2 anni, molto intelligente e protettivo. Ideale per famiglie con un grande giardino.",
    imageUrl:
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?q=80&w=2067&auto=format&fit=crop",
  },
  {
    _id: "8",
    name: "Whiskers",
    description:
      "Whiskers è un criceto curioso e attivo di 6 mesi. Ama correre nella sua ruota e esplorare.",
    imageUrl:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=2076&auto=format&fit=crop",
  },
];

const defaultEvents = [
  {
    _id: "1",
    title: "Giornata di adozione",
    description:
      "Vieni a conoscere i nostri adorabili animali in cerca di casa.",
    date: "2023-08-15T10:00:00",
    location: "Parco Centrale, Milano",
    imageUrl:
      "https://images.unsplash.com/photo-1622050956578-94fd044a0ada?q=80&w=2070&auto=format&fit=crop",
  },
  {
    _id: "2",
    title: "Seminario sul benessere animale",
    description:
      "Esperti discuteranno le migliori pratiche per la cura degli animali.",
    date: "2023-09-01T14:00:00",
    location: "Centro Congressi, Roma",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
  },
  {
    _id: "3",
    title: "Raccolta fondi per il rifugio",
    description:
      "Aiutaci a migliorare le condizioni di vita dei nostri ospiti a quattro zampe.",
    date: "2023-10-05T18:00:00",
    location: "Piazza Maggiore, Bologna",
    imageUrl:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop",
  },
];

const Home = () => {
  const [featuredAnimals, setFeaturedAnimals] = useState(defaultAnimals);
  const [recentEvents, setRecentEvents] = useState(defaultEvents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalsResponse = await api.getAllAnimals();
        setFeaturedAnimals(
          animalsResponse.length > 0
            ? animalsResponse.slice(0, 5)
            : defaultAnimals
        );

        const eventsResponse = await api.getAllEvents();
        setRecentEvents(
          eventsResponse.length > 0 ? eventsResponse.slice(0, 3) : defaultEvents
        );

        setLoading(false);
      } catch (err) {
        console.error("Errore nel caricamento dei dati:", err);
        setError("Errore nel caricamento dei dati");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1592951117908-4acda89ee817?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">
              Benvenuti a Una Zampa Amica
            </h1>
            <p className="text-2xl mb-8">
              Aiutiamo gli animali bisognosi a trovare una casa amorevole
            </p>
            <Link
              to="/donate"
              className="inline-block bg-red-500 text-white font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-red-600"
            >
              Dona Ora
            </Link>
          </div>
        </div>
      </section>

      {/* Chi Siamo */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50 ps-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Chi Siamo
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Siamo un'organizzazione dedicata a salvare e trovare case per
                gli animali in difficoltà. Collaboriamo con rifugi, cliniche
                veterinarie e volontari per fornire assistenza sanitaria, cibo e
                una casa temporanea ai nostri amici a quattro zampe.
              </p>
              <Link
                to="/about"
                className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 hover:from-red-600 hover:to-pink-600"
              >
                Scopri di Più
              </Link>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=2070&auto=format&fit=crop"
                alt="Chi Siamo"
                className="rounded-lg shadow-lg w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Animali in Evidenza */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
            Animali in Evidenza
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Conosci alcuni dei nostri adorabili amici che cercano casa.
          </p>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            className="mb-12 pb-3"
          >
            {featuredAnimals.map((animal) => (
              <div key={animal._id} className="px-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl h-[350px] flex flex-col">
                  <img
                    src={animal.imageUrl}
                    alt={animal.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {animal.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">
                      {animal.description.substring(0, 80)}...
                    </p>
                    <Link
                      to={`/animal/${animal._id}`}
                      className="inline-block bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 self-start mt-auto"
                    >
                      Adotta me{" "}
                      <FontAwesomeIcon icon={faPaw} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
          <div className="text-center">
            <Link
              to="/animals"
              className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Vedi Tutti gli Animali
            </Link>
          </div>
        </div>
      </section>

      {/* Eventi Recenti */}
      <section className="py-24 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
            Eventi Recenti
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Resta aggiornato sugli ultimi eventi della nostra organizzazione.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden "
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {event.description.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      {event.location}
                    </span>
                  </div>
                  <Link
                    to={`/event/${event._id}`}
                    className="inline-block bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
                  >
                    Dettagli Evento
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/events"
              className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Vedi Tutti gli Eventi
            </Link>
          </div>
        </div>
      </section>

      {/* Come Aiutare */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Come Aiutare
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Scopri come puoi fare la differenza e aiutare gli animali in
            difficoltà.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
            <Link
              to="/donate"
              className="flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faHandHoldingHeart} className="mr-3" />
              Dona Ora
            </Link>
            <Link
              to="/volunteer"
              className="flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faHandsHelping} className="mr-3" />
              Diventa Volontario
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonianze */}
      <section className="py-24 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
            Testimonianze
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Leggi cosa dicono le persone che hanno adottato i nostri animali.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop"
                alt="Maria Rossi"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4">
                "Ho adottato un cane da Una Zampa Amica e l'esperienza è stata
                fantastica! Il supporto ricevuto è stato incredibile."
              </p>
              <h3 className="text-xl font-bold text-gray-800">Maria Rossi</h3>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop"
                alt="Luigi Verdi"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4">
                "Un'organizzazione davvero dedicata. Il loro impegno per il
                benessere degli animali è ammirevole."
              </p>
              <h3 className="text-xl font-bold text-gray-800">Luigi Verdi</h3>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=500&auto=format&fit=crop"
                alt="Giulia Bianchi"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4">
                "Grazie a Una Zampa Amica abbiamo trovato il nostro nuovo
                migliore amico. Non potremmo essere più felici!"
              </p>
              <h3 className="text-xl font-bold text-gray-800">
                Giulia Bianchi
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
