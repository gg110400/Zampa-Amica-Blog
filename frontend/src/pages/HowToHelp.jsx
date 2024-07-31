import React from 'react';
import { Link } from 'react-router-dom';

const HowToHelp = () => {
  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
      <h2 className="text-4xl font-bold text-center mb-8 text-red-600">Diventa un Volontario</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto max-h-[80vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Unisciti a Noi</h3>
        <p className="text-gray-700 mb-6">
          Siamo sempre alla ricerca di persone appassionate e dedite a dare una mano alla nostra missione. Diventare volontario
          con Una Zampa Amica è un'opportunità per fare la differenza nella vita degli animali bisognosi.
        </p>

        <h3 className="text-2xl font-bold mb-4 text-gray-800">Cosa Puoi Fare</h3>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li className="mb-2">Assistere nei rifugi e nelle cliniche veterinarie</li>
          <li className="mb-2">Partecipare a eventi di adozione e campagne di sensibilizzazione</li>
          <li className="mb-2">Fornire temporaneamente una casa agli animali in attesa di adozione</li>
          <li className="mb-2">Aiutare con la raccolta fondi e la promozione</li>
          <li className="mb-2">Collaborare a programmi educativi per la comunità</li>
        </ul>

        <h3 className="text-2xl font-bold mb-4 text-gray-800">Come Iniziare</h3>
        <p className="text-gray-700 mb-6">
          Per diventare volontario, segui questi semplici passi:
        </p>
        <ol className="list-decimal list-inside mb-6 text-gray-700">
          <li className="mb-2">Compila il modulo di iscrizione qui sotto</li>
          <li className="mb-2">Partecipa a un breve incontro di orientamento</li>
          <li className="mb-2">Inizia a fare volontariato!</li>
        </ol>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input 
              type="text" 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" 
              placeholder="Il tuo nome"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Numero di Telefono</label>
            <input 
              type="tel" 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" 
              placeholder="123-456-7890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Perché Vuoi Fare Volontariato?</label>
            <textarea 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" 
              placeholder="Raccontaci perché vuoi unirti a noi"
              rows="4"
            ></textarea>
          </div>
          <div className="text-center">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-opacity-70 text-white font-bold py-2 px-4 rounded-md transition duration-300 hover:bg-opacity-80"
            >
              Invia Iscrizione
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HowToHelp;
