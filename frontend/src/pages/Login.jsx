import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1444212477490-ca407925329e?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-4 text-red-600">Accedi al tuo Account</h2>
        <form className="space-y-4">
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
          <div className='pt-8'>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Accedi
            </button>  
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-3"
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Accedi con Google
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Non hai un account? <a href="/register" className="text-red-600 hover:text-red-500">Iscriviti</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
