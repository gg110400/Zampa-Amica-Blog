import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faBell,
  faUpload,
  faCheck,
  faTimes,
  faUserShield,
  faPaw,
  faNewspaper,
  faCalendarPlus,
  faCrown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token non trovato");
      const response = await api.getUserProfile(token);

      // Assicuriamoci che il ruolo sia presente nella risposta
      if (!response.user.role) {
        console.error("Ruolo utente mancante nella risposta API");
        throw new Error("Dati utente incompleti");
      }

      setUser(response.user);
      setAvatar(response.user.avatar);

      // Salviamo il ruolo nel localStorage per un accesso più rapido in futuro
      localStorage.setItem("userRole", response.user.role);

      console.log("Ruolo utente:", response.user.role); // Per debugging
      setIsLoading(false);
    } catch (err) {
      console.error("Errore nel caricamento del profilo:", err);
      setError(
        "Errore nel caricamento del profilo. Assicurati di essere autenticato."
      );
      setIsLoading(false);
      if (err.message === "Token non trovato") navigate("/login");
    }
  };

  const handleToggleSubscription = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token non trovato");
      const response = await api.toggleBlogSubscription(token);
      setUser((prevUser) => ({
        ...prevUser,
        subscribedToBlog: !prevUser.subscribedToBlog,
      }));
    } catch (err) {
      console.error("Errore durante il cambio di iscrizione:", err);
      setError("Errore durante il cambio di iscrizione al blog");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("avatar", file);
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token non trovato");
        const response = await api.updateUserAvatar(formData);
        setAvatar(response.user.avatar);
      } catch (err) {
        console.error("Errore durante il caricamento dell'avatar:", err);
        setError("Errore durante il caricamento dell'avatar");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Sei sicuro di voler eliminare il tuo account? Questa azione non può essere annullata."
      )
    ) {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token non trovato");
        await api.deleteUser(token);
        localStorage.removeItem("authToken");
        navigate("/");
      } catch (err) {
        console.error("Errore durante l'eliminazione dell'account:", err);
        setError("Errore durante l'eliminazione dell'account");
      }
    }
  };

  const getRoleColor = (role) => {
    if (!role) return 'bg-gray-500'; // Colore di default se il ruolo non è definito
    return role.toLowerCase() === 'admin' ? 'bg-pink-400' : 'bg-red-400';
  };

  const getRoleLabel = (role) => {
    if (!role) return '';
    return role.toLowerCase() === 'admin' ? (
      <div className="mt-1 bg-yellow-300 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center justify-center" style={{ width: 'fit-content', paddingRight: '29px', marginTop: '10px' }}>
        <FontAwesomeIcon icon={faCrown} className="mr-1 ms-4" />
        Admin
      </div>
    ) : (
      <div className="mt-1 bg-orange-300 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center justify-center" style={{ width: 'fit-content', paddingRight: '29px', marginTop: '10px' }}>
        <FontAwesomeIcon icon={faUser} className="mr-1 ms-4" />
        User
      </div>
    );
  };

  const handleCreateAnimalForAdoption = () => {
    navigate('/create-animal-for-adoption');
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Errore!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className={`text-white p-6 flex justify-between items-center ${getRoleColor(user.role)}`}>
          <div>
            <h1 className="text-3xl font-bold">Profilo Utente</h1>
            <p className="text-sm mt-2 flex items-center">
              <FontAwesomeIcon icon={faUserShield} className="mr-2" />
              Ruolo: {user.role}
            </p>
            {getRoleLabel(user.role)}
          </div>
          <div className="relative">
            <img
              src={
                user.avatar
                  ? `${import.meta.env.VITE_API_URL}${user.avatar}`
                  : "https://via.placeholder.com/150"
              }
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faUpload} className="text-red-500" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              className="hidden"
              onChange={handleAvatarChange}
              accept="image/*"
            />
          </div>
        </div>
        {user && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Nome:
                </label>
                <p className="text-gray-900 bg-gray-100 p-2 rounded">
                  {user.name}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Email:
                </label>
                <p className="text-gray-900 bg-gray-100 p-2 rounded">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <FontAwesomeIcon icon={faBell} className="mr-2" />
                Iscrizione al Blog:
              </label>
              <button
                onClick={handleToggleSubscription}
                className={`text-white p-2 rounded ${
                  user.subscribedToBlog ? "bg-green-500" : "bg-red-500"
                } hover:opacity-80 transition duration-300`}
              >
                {user.subscribedToBlog ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    Iscritto
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    Non iscritto
                  </>
                )}
              </button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {user.role.toLowerCase() === 'admin' && (
                <>
                  <button
                    onClick={handleCreateAnimalForAdoption}
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                  >
                    <FontAwesomeIcon icon={faPaw} className="mr-2" />
                    Nuovo Animale
                  </button>
                  <button
                    onClick={handleCreatePost}
                    className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                  >
                    <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                    Nuovo Post
                  </button>
                  <button
                    onClick={handleCreateEvent}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  >
                    <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
                    Nuovo Evento
                  </button>
                </>
              )}
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Elimina Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
