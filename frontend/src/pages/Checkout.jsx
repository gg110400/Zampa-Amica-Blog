import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faApplePay } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import './Checkout.css'; // Assicurati di importare il file CSS

const Checkout = () => {
  const { amount, isMonthly, paymentMethod } = useParams();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logica per gestire il pagamento
    alert('Pagamento completato!');
  };

  const getPaymentIcon = () => {
    if (paymentMethod === 'creditCard') return faCreditCard;
    if (paymentMethod === 'paypal') return faPaypal;
    if (paymentMethod === 'applePay') return faApplePay;
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8 font-poppins text-sm">
      <h2 className="text-3xl font-bold text-center mb-4 text-red-600">Completa la Donazione</h2>
      <div className={`bg-white shadow-md rounded-lg p-4 max-w-lg mx-auto ${paymentMethod === 'creditCard' ? 'border-t-4 border-blue-600' : paymentMethod === 'paypal' ? 'border-t-4 border-yellow-500' : 'border-t-4 border-black'}`}>
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Dettagli del Pagamento</h3>
          <p className="text-gray-700 text-xs">
            Stai per donare €{amount} {isMonthly === 'true' && 'ogni mese'} tramite {paymentMethod === 'creditCard' ? 'Carta di Credito' : paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}.
          </p>
          <FontAwesomeIcon icon={getPaymentIcon()} size="2x" className="my-2" />
        </div>
        <form onSubmit={handleSubmit} className={paymentMethod === 'creditCard' ? 'max-h-80 overflow-y-auto custom-scrollbar pr-6' : ''}>
          {paymentMethod === 'creditCard' && (
            <>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Nome sulla Carta</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nome sulla Carta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Numero della Carta</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Numero della Carta"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Data di Scadenza</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Indirizzo di Fatturazione</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Indirizzo"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Città</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Città"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">CAP</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="CAP"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Paese</label>
                <input
                  type="text"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Paese"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {paymentMethod === 'paypal' && (
            <>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Email di PayPal</label>
                <input
                  type="email"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Email di PayPal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {paymentMethod === 'applePay' && (
            <>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Email per Apple Pay</label>
                <input
                  type="email"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                  placeholder="Email per Apple Pay"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <button className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 hover:bg-red-600 text-sm">
            Completa la Donazione
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
