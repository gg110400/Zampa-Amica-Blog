import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faSpinner, faUpload } from '@fortawesome/free-solid-svg-icons';

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
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.location) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      const response = await api.createEvent(formDataToSend);
      console.log('Event created successfully:', response);
      navigate('/events'); // Redirect to events page after successful creation
    } catch (error) {
      console.error('Error creating event:', error);
      setError('Failed to create event. Please try again.');
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
              New Event
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                className="w-full px-3 py-2 border rounded-md"
                required
              ></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FontAwesomeIcon icon={faUpload} className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  </div>
                  <input id="image" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-lg" />
                  </div>
                )}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
                    Create Event
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

export default NewEvent;