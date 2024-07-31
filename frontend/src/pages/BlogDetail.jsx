import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const blogPosts = [
  {
    id: 1,
    title: 'Come Prendersi Cura del Tuo Nuovo Cucciolo',
    date: '20 Luglio 2024',
    author: 'Anna Rossi',
    summary: 'Scopri i migliori consigli per prendersi cura del tuo nuovo amico a quattro zampe.',
    content: 'Contenuto dettagliato del post...',
    imageUrl: 'https://via.placeholder.com/600x400',
    comments: [
      { id: 1, author: 'Mario', text: 'Articolo molto utile, grazie!' },
      { id: 2, author: 'Luisa', text: 'Ho seguito i vostri consigli e il mio cucciolo è felicissimo.' }
    ]
  },
  {
    id: 2,
    title: 'L\'Importanza della Sterilizzazione',
    date: '15 Agosto 2024',
    author: 'Marco Bianchi',
    summary: 'Perché la sterilizzazione è essenziale per la salute del tuo animale domestico.',
    content: 'Contenuto dettagliato del post...',
    imageUrl: 'https://via.placeholder.com/600x400',
    comments: [
      { id: 1, author: 'Giorgio', text: 'Molto informativo, grazie per aver condiviso!' },
      { id: 2, author: 'Maria', text: 'Non sapevo fosse così importante.' }
    ]
  },
  {
    id: 3,
    title: 'I Benefici dell\'Adozione di un Cane Adulto',
    date: '10 Settembre 2024',
    author: 'Lucia Verdi',
    summary: 'Adottare un cane adulto può essere un\'esperienza meravigliosa e gratificante.',
    content: 'Contenuto dettagliato del post...',
    imageUrl: 'https://via.placeholder.com/600x400',
    comments: [
      { id: 1, author: 'Claudia', text: 'Grazie per aver parlato di questo argomento!' },
      { id: 2, author: 'Federico', text: 'Ho adottato un cane adulto e non potrei essere più felice.' }
    ]
  },
  // Aggiungi altri post del blog qui
];

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));
  const [likes, setLikes] = useState(0);

  if (!post) {
    return <div>Post non trovato</div>;
  }

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-poppins min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-6  flex flex-col w-full">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">{post.title}</h2>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2">
            <img src={post.imageUrl} alt={post.title} className="w-full md:w-3/4 h-auto object-cover rounded-md" />
          </div>
          <div className="md:w-1/2">
            <div className="flex items-center text-gray-700 mb-3 mt-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center text-gray-700 mb-6">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>{post.author}</span>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <button onClick={handleLike} className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-opacity-70 text-white font-bold py-2 px-4 rounded-md transition duration-300 hover:bg-opacity-80 flex items-center">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Mi piace {likes}
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Commenti</h3>
          {post.comments.map(comment => (
            <div key={comment.id} className="bg-gray-100 rounded-lg p-4 mb-4">
              <div className="flex items-center text-gray-700 mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <span className="font-bold">{comment.author}</span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
