import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faApplePay, faGooglePay } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faHeart, faCheck } from '@fortawesome/free-solid-svg-icons';

const Checkout = () => {
  const { amount, isMonthly, paymentMethod } = useParams();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logica per gestire il pagamento
    setIsConfirmed(true);
  };

  const getPaymentIcon = () => {
    if (paymentMethod === 'creditCard') return faCreditCard;
    if (paymentMethod === 'paypal') return faPaypal;
    if (paymentMethod === 'applePay') return faApplePay;
    if (paymentMethod === 'googlePay') return faGooglePay;
    return null;
  };

  const getPaymentMethodName = () => {
    if (paymentMethod === 'creditCard') return 'Carta di Credito';
    if (paymentMethod === 'paypal') return 'PayPal';
    if (paymentMethod === 'applePay') return 'Apple Pay';
    if (paymentMethod === 'googlePay') return 'Google Pay';
    return 'Metodo sconosciuto';
  };

  const getBorderColor = () => {
    if (paymentMethod === 'creditCard') return 'from-blue-400 to-blue-600';
    if (paymentMethod === 'paypal') return 'from-yellow-400 to-yellow-600';
    if (paymentMethod === 'applePay') return 'from-gray-700 to-black';
    if (paymentMethod === 'googlePay') return 'from-green-400 to-green-600';
    return 'from-gray-400 to-gray-600';
  };

  if (!amount || !isMonthly || !paymentMethod) {
    return <div>Errore: Parametri mancanti</div>;
  }

  const isMonthlyBoolean = isMonthly === 'true';

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-orange-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faCheck} className="text-5xl text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Grazie per aver donato a Una Zampa Amica</h2>
          <p className="text-xl text-gray-600 mb-8">La tua donazione è andata a buon fine</p>
          <button
            onClick={() => navigate('/donations')}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 hover:from-red-600 hover:to-pink-600"
          >
            Torna alle Donazioni
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
            Completa la Donazione
          </h2>
        </div>
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className={`bg-gradient-to-r ${getBorderColor()} p-6 text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">Dettagli del Pagamento</h3>
                <p className="text-sm opacity-90">
                  Donazione di €{amount} {isMonthlyBoolean ? 'al mese' : 'una tantum'}
                </p>
              </div>
              <FontAwesomeIcon icon={getPaymentIcon()} size="3x" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {paymentMethod === 'creditCard' && (
              <>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nome sulla Carta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Numero della Carta"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    className="w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Indirizzo di Fatturazione"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    className="w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Città"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="CAP"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Paese"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </>
            )}
            {(paymentMethod === 'paypal' || paymentMethod === 'applePay' || paymentMethod === 'googlePay') && (
              <>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder={`Email per ${getPaymentMethodName()}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-1 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Completa la Donazione
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;