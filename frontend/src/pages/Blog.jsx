import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const blogPosts = [
  {
    id: 1,
    title: 'Come Prendersi Cura del Tuo Nuovo Cucciolo',
    date: '20 Luglio 2024',
    author: 'Anna Rossi',
    summary: 'Scopri i migliori consigli per prendersi cura del tuo nuovo amico a quattro zampe.',
    content: 'Contenuto dettagliato del post...',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: 2,
    title: 'L\'Importanza della Sterilizzazione',
    date: '15 Agosto 2024',
    author: 'Marco Bianchi',
    summary: 'Perché la sterilizzazione è essenziale per la salute del tuo animale domestico.',
    content: 'Contenuto dettagliato del post...',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    id: 3,
    title: 'I Benefici dell\'Adozione di un Cane Adulto',
    date: '10 Settembre 2024',
    author: 'Lucia Verdi',
    summary: 'Adottare un cane adulto può essere un\'esperienza meravigliosa e gratificante.',
    content: 'Contenuto dettagliato del post...',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  // Aggiungi altri post del blog qui
];

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
      <h2 className="text-4xl font-bold text-center mb-8 text-red-600">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4 transform transition duration-300 hover:scale-105">
            <img src={post.imageUrl} alt={post.title} className="w-full h-40 object-cover rounded-t-md mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
            <div className="flex items-center text-gray-700 mb-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center text-gray-700 mb-2">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>{post.author}</span>
            </div>
            <p className="text-gray-700 mb-4">{post.summary}</p>
            <Link to={`/blog/${post.id}`} className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-opacity-70 text-white font-bold py-2 px-4 rounded-md transition duration-300 hover:bg-opacity-80">
              Leggi di più
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
