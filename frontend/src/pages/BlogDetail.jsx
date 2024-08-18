import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faHeart, faComment, faShare, faTags } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

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
        setPost(response);
        setLikes(response.likes || 0); // Assumendo che il backend fornisca il conteggio dei like
      } catch (err) {
        console.error('Errore nel caricamento del post:', err);
        setError('Errore nel caricamento del post. Per favore, riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      // Assumendo che ci sia un endpoint per aggiornare i like
      await api.likePost(id);
      setLikes(prevLikes => prevLikes + 1);
    } catch (err) {
      console.error('Errore nell\'aggiornamento dei like:', err);
    }
  };

  if (loading) return <div className="text-center py-12 text-lg text-gray-600">Caricamento...</div>;
  if (error) return <div className="text-center py-12 text-lg text-red-600">{error}</div>;
  if (!post) return <div className="text-center py-12 text-lg text-gray-600">Post non trovato</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6">
            <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
            <div className="flex items-center text-white/80 text-sm">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>{post.author.name}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-base leading-relaxed mb-6">{post.content}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faTags} className="mr-2 text-gray-500" />
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2">
                  {tag}
                </span>
              ))}
            </div>
          )}
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
        {/* Qui potresti aggiungere una sezione per i commenti se il backend li fornisce */}
      </div>
    </div>
  );
};

export default BlogDetail;