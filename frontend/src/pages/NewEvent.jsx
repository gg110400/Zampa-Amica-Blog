import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faSpinner, faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const NewEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
    Object.keys(formData).forEach(key => {
      if (key === 'date' || key === 'time') {
        data.append('date', `${formData.date}T${formData.time}`);
      } else {
        data.append(key, formData[key]);
      }
    });
    if (image) {
      data.append('image', image);
    }
    try {
      const result = await api.createEvent(data);
      console.log('Evento creato:', result);
      navigate('/events');
    } catch (err) {
      console.error('Errore dettagliato:', err);
      setError(`Errore durante la creazione dell'evento: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-5 py-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              <FontAwesomeIcon icon={faCalendarPlus} className="mr-2 text-purple-500" />
              Nuovo Evento
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" placeholder="Titolo" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
              <textarea name="description" placeholder="Descrizione" value={formData.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 border rounded-md" required></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <input type="text" name="location" placeholder="Luogo" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
              <input type="number" name="capacity" placeholder="Capacità" value={formData.capacity} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
              <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FontAwesomeIcon icon={faUpload} className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clicca per caricare</span> o trascina un'immagine</p>
                  </div>
                  <input id="image" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
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
              <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300" disabled={loading}>
                {loading ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />}
                {loading ? 'Creazione in corso...' : 'Crea Evento'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;