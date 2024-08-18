import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faArrowRight, faTrash, faEdit, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

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
    const fetchUserProfile = async () => {
      try {
        const userProfile = await api.getUserProfile();
        setIsAdmin(userProfile.role === 'Admin');
      } catch (err) {
        console.error('Errore nel caricamento del profilo utente:', err);
      }
    };

    const fetchBlogPosts = async () => {
      try {
        const response = await api.getAllPosts();
        setBlogPosts(response);
        setLoading(false);
      } catch (err) {
        console.error('Errore nel caricamento dei post del blog:', err);
        setError('Errore nel caricamento dei post del blog');
        setLoading(false);
      }
    };

    fetchUserProfile();
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

  const getAuthorName = (author) => {
    return typeof author === 'object' ? author.name : author;
  };

  const getCategoryName = (category) => {
    return typeof category === 'object' ? category.name : category;
  };

  const filteredPosts = blogPosts.filter(post => {
    return (
      (filters.category === '' || getCategoryName(post.category) === filters.category) &&
      (filters.author === '' || getAuthorName(post.author) === filters.author)
    );
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center py-20 text-2xl text-gray-600">Caricamento...</div>;
  if (error) return <div className="text-center py-20 text-2xl text-red-600">{error}</div>;

  const uniqueCategories = [...new Set(blogPosts.map(post => getCategoryName(post.category)))];
  const uniqueAuthors = [...new Set(blogPosts.map(post => getAuthorName(post.author)))];

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
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              name="author"
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            >
              <option value="">Tutti gli autori</option>
              {uniqueAuthors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {currentPosts.map(post => (
            <div key={post._id} className="bg-white shadow-xl rounded-2xl overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-1">
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="w-full h-44 object-cover object-center" />
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h3>
                <div className="flex items-center text-gray-600 mb-2 text-sm">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-red-500" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3 text-sm">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-red-500" />
                  <span>{getAuthorName(post.author)}</span>
                </div>
                <p className="text-gray-700 text-base mb-4">
                  {post.content ? post.content.substring(0, 100) + '...' : 'Nessun contenuto disponibile'}
                </p>
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
        {filteredPosts.length > postsPerPage && (
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
        )}
      </div>
    </div>
  );
};

export default Blog;