import React from 'react';
import { useParams } from 'react-router-dom';

const AdoptionForm = () => {
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logica di gestione del form di adozione
    alert('Form di adozione inviato!');
  };

  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
      <h2 className="text-4xl font-bold mb-6 text-center text-red-600">Form di Adozione</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nome</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nome" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Telefono</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Telefono" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Indirizzo</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Indirizzo" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Messaggio</label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Perché vuoi adottare questo cucciolo?" required></textarea>
        </div>
        <button className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 hover:bg-opacity-80" type="submit">
          Invia
        </button>
      </form>
    </div>
  );
};

export default AdoptionForm;
