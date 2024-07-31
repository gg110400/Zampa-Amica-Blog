import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-red-400 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Crea un Account</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
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
              placeholder="tu@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" 
              placeholder="********"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Conferma Password</label>
            <input 
              type="password" 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" 
              placeholder="********"
            />
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Iscriviti
            </button>
          </div>
        </form>
        <div className="mt-6">
          <button
            type="button"
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Iscriviti con Google
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Hai già un account? <a href="/login" className="text-red-600 hover:text-red-500">Accedi</a>
        </p>
      </div>
    </div>
  );
};

export default Register;


