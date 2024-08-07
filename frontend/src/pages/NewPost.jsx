import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSpinner, faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const NewPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('tags', formData.tags.split(',').map(tag => tag.trim()));
    if (image) data.append('image', image);
    try {
      const result = await api.createPost(data);
      console.log('Post creato:', result);
      navigate('/blog');
    } catch (err) {
      console.error('Errore dettagliato:', err);
      if (err.response) {
        console.error('Risposta del server:', err.response.data);
        console.error('Status:', err.response.status);
        console.error('Headers:', err.response.headers);
      } else if (err.request) {
        console.error('Nessuna risposta ricevuta:', err.request);
      } else {
        console.error('Errore di configurazione della richiesta:', err.message);
      }
      setError(`Errore durante la creazione del post: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-5 py-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              <FontAwesomeIcon icon={faPencilAlt} className="mr-2 text-indigo-500" />
              Nuovo Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                name="title" 
                placeholder="Titolo" 
                value={formData.title} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
              <textarea 
                name="content" 
                placeholder="Contenuto del post" 
                value={formData.content} 
                onChange={handleChange} 
                rows="5" 
                className="w-full px-3 py-2 border rounded-md" 
                required
              ></textarea>
              <input 
                type="text" 
                name="tags" 
                placeholder="Tags (separati da virgola)" 
                value={formData.tags} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-md" 
              />
              <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FontAwesomeIcon icon={faUpload} className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clicca per caricare</span> o trascina un'immagine</p>
                  </div>
                  <input 
                    id="image" 
                    type="file" 
                    className="hidden" 
                    onChange={handleImageChange} 
                    accept="image/*" 
                  />
                </label>
                {preview && (
                  <div className="mt-4 relative">
                    <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg" />
                    <button 
                      type="button" 
                      onClick={removeImage} 
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                )}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Pubblicazione...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                    Pubblica Post
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;