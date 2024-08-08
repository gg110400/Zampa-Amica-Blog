import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// Funzione di utilità per ottenere l'header di autorizzazione
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');
  console.log('Current user role:', role);
  return token ? { 
    Authorization: `Bearer ${token}`,
    'User-Role': role
  } : {};
};

// User API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, userData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Errore nella registrazione dell\'utente:', error);
    throw error;
  }
};


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    if (response.data.role) {
      localStorage.setItem('userRole', response.data.role);
    }
    return response.data;
  } catch (error) {
    console.error('Errore nel login dell\'utente:', error);
    throw error;
  }
};



export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Errore nel recupero del profilo utente:', error);
    throw error;
  }
};


export const getUserRole = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: getAuthHeader()
    });
    return response.data
  } catch (error) {
    console.error('Errore nel recupero del ruolo utente:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/profile`, userData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Errore nell\'aggiornamento del profilo utente:', error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/users`, {
      headers: getAuthHeader()
    });
    localStorage.removeItem('authToken');
    return response.data;
  } catch (error) {
    console.error('Errore nell\'eliminazione dell\'account utente:', error);
    throw error;
  }
};

export const toggleBlogSubscription = async (token) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/toggle-blog-subscription`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Errore nel cambiare lo stato di iscrizione al blog:', error);
      throw error;
    }
  };
  
  export const updateUserAvatar = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/update-avatar`, formData, {
        headers: { 
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });
      return response.data;
    } catch (error) {
      console.error('Errore nell\'aggiornamento dell\'avatar:', error);
      throw error;
    }
  };

export const logoutUser = () => {
  localStorage.removeItem('authToken');
};

// Google Authentication
export const initiateGoogleAuth = () => {
  try {
    window.location.href = `${BASE_URL}/users/auth/google`;
  } catch (error) {
    console.error('Errore nell\'avvio dell\'autenticazione Google:', error);
  }
};

export const handleGoogleAuthCallback = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
    // Decodifica il token per ottenere le informazioni dell'utente
    const decodedToken = jwt_decode(token);
    if (decodedToken.user && decodedToken.user.role) {
      localStorage.setItem('userRole', decodedToken.user.role);
    }
    return { success: true, message: 'Google authentication successful' };
  }
  return { success: false, message: 'No token received from Google authentication' };
};

// Animal API
export const getAllAnimals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/animals`);
    return response.data;
  } catch (error) {
    console.error('Errore nel recuperare tutti gli animali:', error);
    throw error;
  }
};

export const searchAnimals = async (searchParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/animals/search`, { params: searchParams });
    return response.data;
  } catch (error) {
    console.error('Errore nella ricerca degli animali:', error);
    throw error;
  }
};

export const getAnimalById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Errore nel recuperare l'animale con ID ${id}:`, error);
    throw error;
  }
};

export const createAnimal = async (animalData) => {
  try {
    console.log('Sending animal data:', animalData);
    console.log('Auth header:', getAuthHeader());
    const response = await axios.post(`${BASE_URL}/animals`, animalData, {
      headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' }
    });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in createAnimal:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    }
    throw error;
  }
};

export const updateAnimal = async (id, animalData) => {
  try {
    const response = await axios.put(`${BASE_URL}/animals/${id}`, animalData, {
      headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error(`Errore nell'aggiornamento dell'animale con ID ${id}:`, error);
    throw error;
  }
};

export const deleteAnimal = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/animals/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Errore nell'eliminazione dell'animale con ID ${id}:`, error);
    throw error;
  }
};

// Blog API
export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blog`);
    return response.data;
  } catch (error) {
    console.error('Errore nel recuperare tutti i post del blog:', error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Errore nel recuperare il post con ID ${id}:`, error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${BASE_URL}/blog`, postData, {
      headers: { 
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Errore nella creazione del post:', error);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${BASE_URL}/blog/${id}`, postData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Errore nell'aggiornamento del post con ID ${id}:`, error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/blog/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Errore nell'eliminazione del post con ID ${id}:`, error);
    throw error;
  }
};

export const addComment = async (postId, commentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/blog/${postId}/comments`, commentData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Errore nell'aggiunta del commento al post con ID ${postId}:`, error);
    throw error;
  }
};

// Contact API
export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/contact`, formData);
    return response.data;
  } catch (error) {
    console.error('Errore nell\'invio del modulo di contatto:', error);
    throw error;
  }
};

// Donation API
export const createDonation = async (donationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/donations`, donationData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Errore nella creazione della donazione:', error);
    throw error;
  }
};

export const getDonationById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/donations/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Errore nel recuperare la donazione con ID ${id}:`, error);
    throw error;
  }
};

export const getAllDonations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/donations`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Errore nel recuperare tutte le donazioni:', error);
    throw error;
  }
};

// Event API
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Errore nel recuperare tutti gli eventi:', error);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Errore nel recuperare l'evento con ID ${id}:`, error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${BASE_URL}/events`, eventData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'  // Importante per l'upload di file
      }
    });
    return response.data;
  } catch (error) {
    console.error('Errore nella creazione dell\'evento:', error);
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${BASE_URL}/events/${id}`, eventData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Errore nell'aggiornamento dell'evento con ID ${id}:`, error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/events/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Errore nell'eliminazione dell'evento con ID ${id}:`, error);
    throw error;
  }
};

export const registerForEvent = async (eventId, registrationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/events/${eventId}/register`, registrationData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Errore nella registrazione all'evento con ID ${eventId}:`, error);
    throw error;
  }
};

// Esporta tutte le funzioni
const api = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
  deleteUser,
  getUserRole,
  toggleBlogSubscription,
  logoutUser,
  initiateGoogleAuth,
  handleGoogleAuthCallback,
  getAllAnimals,
  searchAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  submitContactForm,
  createDonation,
  getDonationById,
  getAllDonations,
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent
};

export default api;