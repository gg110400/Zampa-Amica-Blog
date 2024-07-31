import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faApplePay } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faHeart } from '@fortawesome/free-solid-svg-icons';

const Donations = () => {
  const [amount, setAmount] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleMonthlyChange = () => {
    setIsMonthly(!isMonthly);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleDonateNow = () => {
    if (amount && paymentMethod) {
      navigate(`/checkout/${amount}/${isMonthly}/${paymentMethod}`);
    } else {
      alert('Per favore, seleziona un importo e un metodo di pagamento.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-6 text-red-600">Fai una Donazione</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2 text-gray-800">Sostieni Una Zampa Amica</h3>
          <p className="text-gray-700 text-sm">Aiutaci a salvare più animali e a trovare loro una casa amorevole. Ogni donazione fa la differenza.</p>
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-gray-700 mb-2">Importo della Donazione</label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button className={`font-bold py-1 px-2 rounded shadow-md transition duration-300 ${amount === '10' ? 'bg-red-600 text-white' : 'bg-red-500 text-white hover:bg-red-600'}`} onClick={() => setAmount('10')}>€10</button>
            <button className={`font-bold py-1 px-2 rounded shadow-md transition duration-300 ${amount === '20' ? 'bg-red-600 text-white' : 'bg-red-500 text-white hover:bg-red-600'}`} onClick={() => setAmount('20')}>€20</button>
            <button className={`font-bold py-1 px-2 rounded shadow-md transition duration-300 ${amount === '50' ? 'bg-red-600 text-white' : 'bg-red-500 text-white hover:bg-red-600'}`} onClick={() => setAmount('50')}>€50</button>
            <button className={`font-bold py-1 px-2 rounded shadow-md transition duration-300 ${amount === '100' ? 'bg-red-600 text-white' : 'bg-red-500 text-white hover:bg-red-600'}`} onClick={() => setAmount('100')}>€100</button>
          </div>
          <input
            type="number"
            className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
            placeholder="Importo personalizzato"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-red-600"
              checked={isMonthly}
              onChange={handleMonthlyChange}
            />
            <span className="ml-2 text-gray-700 text-md">Rendi questa una donazione mensile</span>
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-md font-medium text-gray-700 mb-2">Metodo di Pagamento</label>
          <div className="flex justify-around mb-2">
            <button className={`bg-white border ${paymentMethod === 'creditCard' ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'} text-gray-700 font-bold py-1 px-2 rounded shadow-md transition duration-300 hover:bg-gray-100`} onClick={() => handlePaymentMethodChange('creditCard')}>
              <FontAwesomeIcon icon={faCreditCard} size="lg" />
              <p className="mt-1 text-sm">Carta di Credito</p>
            </button>
            <button className={`bg-white border ${paymentMethod === 'paypal' ? 'border-yellow-500 ring-2 ring-yellow-300' : 'border-gray-300'} text-gray-700 font-bold py-1 px-2 rounded shadow-md transition duration-300 hover:bg-gray-100`} onClick={() => handlePaymentMethodChange('paypal')}>
              <FontAwesomeIcon icon={faPaypal} size="lg" />
              <p className="mt-1 text-sm">PayPal</p>
            </button>
            <button className={`bg-white border ${paymentMethod === 'applePay' ? 'border-black ring-2 ring-black' : 'border-gray-300'} text-gray-700 font-bold py-1 px-2 rounded shadow-md transition duration-300 hover:bg-gray-100`} onClick={() => handlePaymentMethodChange('applePay')}>
              <FontAwesomeIcon icon={faApplePay} size="lg" />
              <p className="mt-1 text-sm">Apple Pay</p>
            </button>
          </div>
        </div>
        <button onClick={handleDonateNow} className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 hover:bg-red-600 flex items-center justify-center">
          <FontAwesomeIcon icon={faHeart} className="mr-2" />
          Dona Ora
        </button>
      </div>
    </div>
  );
};

export default Donations;

