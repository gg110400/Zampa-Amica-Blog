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
  faEdit,
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
      const response = await api.getUserProfile();
      setUser(response.user);
      setAvatar(response.user.avatar);
      localStorage.setItem("userRole", response.user.role);
      setIsLoading(false);
    } catch (err) {
      console.error("Errore nel caricamento del profilo:", err);
      setError(
        "Errore nel caricamento del profilo. Assicurati di essere autenticato."
      );
      setIsLoading(false);
      if (err.response && err.response.status === 401) navigate("/login");
    }
  };

  const handleToggleSubscription = async () => {
    try {
      await api.toggleBlogSubscription();
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
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await api.updateUserAvatar(formData);
        if (response.user && response.user.avatar) {
          setAvatar(response.user.avatar);
          setUser((prevUser) => ({
            ...prevUser,
            avatar: response.user.avatar,
          }));
        }
        console.log("Avatar updated successfully:", response.user.avatar);
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
        await api.deleteUser();
        navigate("/");
      } catch (err) {
        console.error("Errore durante l'eliminazione dell'account:", err);
        setError("Errore durante l'eliminazione dell'account");
      }
    }
  };

  const getRoleColor = (role) => {
    if (!role) return "bg-gray-500";
    return role.toLowerCase() === "admin"
      ? "bg-gradient-to-r from-purple-500 to-indigo-600"
      : "bg-gradient-to-r from-red-500 to-pink-500";
  };

  const getRoleLabel = (role) => {
    if (!role) return "";
    return role.toLowerCase() === "admin" ? (
      <div className="mt-2 bg-yellow-300 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center justify-center w-max mx-auto">
        <FontAwesomeIcon icon={faCrown} className="mr-1" />
        Admin
      </div>
    ) : (
      <div className="mt-2 bg-orange-300 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center justify-center w-max mx-auto">
        <FontAwesomeIcon icon={faUser} className="mr-1" />
        User
      </div>
    );
  };

  const handleCreateAnimalForAdoption = () => {
    navigate("/create-animal-for-adoption");
  };

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  const handleCreateEvent = () => {
    navigate("/create-event");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-red-100 via-pink-100 to-purple-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center bg-gradient-to-br from-red-100 via-pink-100 to-purple-100 min-h-screen">
        <div
          className="bg-white border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-xl max-w-md mx-auto"
          role="alert"
        >
          <p className="font-bold text-lg mb-2">Errore</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-red-100 via-pink-100 to-purple-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="md:flex">
            <div
              className={`md:w-1/3 ${getRoleColor(
                user.role
              )} p-8 text-white relative`}
            >
              <div className="absolute top-4 right-4">
                <button className="bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 transition-colors duration-200">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src={avatar || "https://placehold.co/150"}
                    alt="Avatar"
                    className="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
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
              <h1 className="text-4xl font-bold mb-2 text-center">
                {user.name}
              </h1>
              <p className="text-xl flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                {user.role}
              </p>
              {getRoleLabel(user.role)}
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b pb-2">
                Informazioni Personali
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-2 text-red-500"
                    />
                    Nome:
                  </label>
                  <p className="text-gray-900 font-medium">{user.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="mr-2 text-red-500"
                    />
                    Email:
                  </label>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Preferenze
                </h3>
                <div className="flex items-center">
                  <label className="mr-4 text-gray-700 font-medium">
                    <FontAwesomeIcon
                      icon={faBell}
                      className="mr-2 text-red-500"
                    />
                    Iscrizione al Blog:
                  </label>
                  <button
                    onClick={handleToggleSubscription}
                    className={`text-white py-2 px-6 rounded-full ${
                      user.subscribedToBlog
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1`}
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
              </div>
              {user.role.toLowerCase() === "admin" && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                    Azioni Amministratore
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      onClick={handleCreateAnimalForAdoption}
                      className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                    >
                      <FontAwesomeIcon icon={faPaw} className="mr-2" />
                      Nuovo Animale
                    </button>
                    <button
                      onClick={handleCreatePost}
                      className="bg-gradient-to-r from-red-400 to-red-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                    >
                      <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                      Nuovo Post
                    </button>
                    <button
                      onClick={handleCreateEvent}
                      className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    >
                      <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
                      Nuovo Evento
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-8 text-center">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Elimina Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
