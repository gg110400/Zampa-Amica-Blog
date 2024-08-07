import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faUpload, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

const NewAnimal = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    description: '',
    adoptionStatus: 'Available',
    medicalHistory: ''
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
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);
    try {
      const result = await api.createAnimal(data);
      console.log('Animale creato:', result);
      navigate('/animals');
    } catch (err) {
      console.error('Errore dettagliato:', err);
      setError(`Errore durante la creazione dell'animale: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-5 py-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              <FontAwesomeIcon icon={faPaw} className="mr-2 text-blue-500" />
              Nuovo Animale
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
              <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
              <input type="text" name="species" placeholder="Specie" value={formData.species} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
              <input type="text" name="breed" placeholder="Razza" value={formData.breed} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
              <input type="number" name="age" placeholder="Età" value={formData.age} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required>
                <option value="">Seleziona genere</option>
                <option value="Male">Maschio</option>
                <option value="Female">Femmina</option>
                <option value="Unknown">Sconosciuto</option>
              </select>
              <textarea name="description" placeholder="Descrizione" value={formData.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 border rounded-md"></textarea>
              <select name="adoptionStatus" value={formData.adoptionStatus} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required>
                <option value="Available">Disponibile</option>
                <option value="Pending">In attesa</option>
                <option value="Adopted">Adottato</option>
              </select>
              <textarea name="medicalHistory" placeholder="Storia medica" value={formData.medicalHistory} onChange={handleChange} rows="3" className="w-full px-3 py-2 border rounded-md"></textarea>
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
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300" disabled={loading}>
                {loading ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : <FontAwesomeIcon icon={faPaw} className="mr-2" />}
                {loading ? 'Creazione...' : 'Crea Animale'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAnimal;