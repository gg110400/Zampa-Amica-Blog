import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faArrowRight, faTrash, faEdit, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const defaultPosts = [
  {
    _id: '1',
    title: 'Come prendersi cura di un cucciolo',
    content: "Prendersi cura di un cucciolo richiede pazienza e dedizione. È importante stabilire una routine, offrire un 'alimentazione adeguata e garantire molte attenzioni e affetto...",
    author: 'Mario Rossi',
    createdAt: '2023-05-01',
    imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Cani'
  },
  {
    _id: '2',
    title: 'I benefici dell\'adozione di un animale',
    content: 'Adottare un animale non solo cambia la sua vita, ma anche la tua. Gli animali adottati offrono compagnia, riducono lo stress e possono migliorare la salute fisica e mentale...',
    author: 'Giulia Bianchi',
    createdAt: '2023-05-15',
    imageUrl: 'https://images.unsplash.com/photo-1530667912788-f976e8ee0bd5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Adozioni'
  },
  {
    _id: '3',
    title: 'L\'importanza della sterilizzazione',
    content: 'La sterilizzazione è un passo importante per la salute del tuo animale e per il controllo della popolazione. Riduce il rischio di alcune malattie e comportamenti indesiderati...',
    author: 'Luca Verdi',
    createdAt: '2023-06-10',
    imageUrl: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Salute'
  },
  {
    _id: '4',
    title: 'Gatti: i perfetti compagni di appartamento',
    content: 'I gatti sono ottimi compagni per chi vive in appartamento. Sono indipendenti, puliti e non richiedono passeggiate quotidiane. Scopri come rendere il tuo spazio a misura di gatto...',
    author: 'Anna Neri',
    createdAt: '2023-07-05',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Gatti'
  },
  {
    _id: '5',
    title: 'Alimentazione corretta per il tuo cane',
    content: 'Una dieta equilibrata è fondamentale per la salute del tuo cane. Impara a scegliere il cibo giusto in base all\'età, alla taglia e alle esigenze specifiche del tuo amico a quattro zampe...',
    author: 'Marco Bianchi',
    createdAt: '2023-08-20',
    imageUrl: 'https://images.unsplash.com/photo-1545529468-42764ef8c85f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Cani'
  },
  {
    _id: '6',
    title: 'Come preparare la casa per un nuovo gattino',
    content: 'L\'arrivo di un gattino è un momento emozionante. Prepara la tua casa con tutto il necessario: dalla lettiera ai giochi, passando per un\'area dedicata al riposo...',
    author: 'Sofia Russo',
    createdAt: '2023-09-12',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Gatti'
  }
];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    author: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userProfile = await api.getUserRole();
        setIsAdmin(userProfile && userProfile.user && userProfile.user.role === 'Admin');
      } catch (err) {
        console.error('Errore nel caricamento del ruolo utente:', err);
      }
    };

    const fetchBlogPosts = async () => {
      try {
        const response = await api.getAllPosts();
        setBlogPosts(response.length > 0 ? response : defaultPosts);
        setLoading(false);
      } catch (err) {
        console.error('Errore nel caricamento dei post del blog:', err);
        setBlogPosts(defaultPosts);
        setLoading(false);
      }
    };

    fetchUserRole();
    fetchBlogPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo post?')) {
      try {
        await api.deletePost(postId);
        setBlogPosts(blogPosts.filter(post => post._id !== postId));
      } catch (err) {
        setError('Errore durante l\'eliminazione del post');
        console.error('Errore durante l\'eliminazione del post:', err);
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
    setCurrentPage(1);
  };

  const filteredPosts = blogPosts.filter(post => {
    return (
      (filters.category === '' || post.category === filters.category) &&
      (filters.author === '' || post.author === filters.author)
    );
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-orange-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
            Il Nostro Blog
          </h2>
          <p className="mt-3 text-xl text-gray-600">
            Scopri le ultime notizie e consigli sul mondo degli animali
          </p>
        </div>

        {/* Filtri */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filtra post
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="category"
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            >
              <option value="">Tutte le categorie</option>
              {[...new Set(blogPosts.map(post => post.category))].map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              name="author"
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            >
              <option value="">Tutti gli autori</option>
              {[...new Set(blogPosts.map(post => post.author))].map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {currentPosts.map(post => (
            <div key={post._id} className="bg-white shadow-xl rounded-2xl overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-1">
              <img src={post.imageUrl} alt={post.title} className="w-full h-44 object-cover object-center" />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h3>
                <div className="flex items-center text-gray-600 mb-2 text-sm">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-red-500" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3 text-sm">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-red-500" />
                  <span>{post.author}</span>
                </div>
                <p className="text-gray-700 text-base mb-4">{post.content.substring(0, 100)}...</p>
                <Link 
                  to={`/blog/${post._id}`} 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-base font-semibold py-2 px-5 rounded-full shadow-md transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-0.5"
                >
                  Leggi di più
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
                {isAdmin && (
                  <div className="flex justify-end space-x-2 mt-4">
                    <button 
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Link 
                      to={`/edit-post/${post._id}`}
                      className="text-blue-500 hover:text-blue-700 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Paginazione */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
            className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;