import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Register = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
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
