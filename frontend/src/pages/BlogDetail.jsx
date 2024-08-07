import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const defaultPosts = [
  {
    _id: '1',
    title: 'Come prendersi cura di un cucciolo',
    content: 'Prendersi cura di un cucciolo richiede pazienza e dedizione...',
    author: 'Mario Rossi',
    createdAt: '2023-05-01',
    imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    _id: '2',
    title: 'I benefici dell\'adozione di un animale',
    content: 'Adottare un animale non solo cambia la sua vita, ma anche la tua...',
    author: 'Giulia Bianchi',
    createdAt: '2023-05-15',
    imageUrl: 'https://images.unsplash.com/photo-1530667912788-f976e8ee0bd5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.getPostById(id);
        if (response) {
          setPost(response);
        } else {
          // Se la risposta è vuota, cerca nel array di default
          const defaultPost = defaultPosts.find(p => p._id === id);
          if (defaultPost) {
            setPost(defaultPost);
          } else {
            setError('Post non trovato');
          }
        }
      } catch (err) {
        console.error('Errore nel caricamento del post:', err);
        // In caso di errore, usa il post di default
        const defaultPost = defaultPosts.find(p => p._id === id);
        if (defaultPost) {
          setPost(defaultPost);
        } else {
          setError('Post non trovato');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  if (loading) return <div className="text-center py-12 text-lg text-gray-600">Caricamento...</div>;
  if (error) return <div className="text-center py-12 text-lg text-gray-600">{error}</div>;
  if (!post) return <div className="text-center py-12 text-lg text-gray-600">Post non trovato</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6">
            <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
            <div className="flex items-center text-white/80 text-sm">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-base leading-relaxed mb-6">{post.content}</p>
          <div className="flex justify-between items-center">
            <button 
              onClick={handleLike}
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-full flex items-center transition duration-300 hover:from-red-500 hover:to-pink-600 transform hover:-translate-y-0.5"
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Mi piace {likes}
            </button>
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-gray-700 transition duration-300">
                <FontAwesomeIcon icon={faComment} size="lg" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 transition duration-300">
                <FontAwesomeIcon icon={faShare} size="lg" />
              </button>
            </div>
          </div>
        </div>
        {/* Nota: la sezione dei commenti è stata rimossa poiché non è presente nei post di default */}
      </div>
    </div>
  );
};

export default BlogDetail;