import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faApplePay, faGooglePay } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faHeart, faPaw, faCoins, faCrown, faUsers, faStar, faTicket, faTshirt, faNewspaper, faDog, faChild, faGift, faCheck } from '@fortawesome/free-solid-svg-icons';

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
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-orange-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
            Sostieni Una Zampa Amica
          </h2>
          <p className="mt-2 text-xl text-gray-600">
            Scegli come vuoi fare la differenza per i nostri amici a quattro zampe
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Donazione Personalizzata</h3>
            <div className="mb-6">
              <label className="block text-base font-medium text-gray-700 mb-3">Importo della Donazione</label>
              <div className="grid grid-cols-4 gap-3 mb-3">
                {['10', '20', '50', '100'].map((value) => (
                  <button
                    key={value}
                    className={`text-sm font-bold py-2 px-3 rounded-full shadow-md transition duration-300 ${
                      amount === value
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => { setAmount(value); }}
                  >
                    €{value}
                  </button>
                ))}
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faCoins} className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="number"
                  className="w-full pl-10 pr-3 py-2 text-base border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Importo personalizzato"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-red-600 rounded focus:ring-red-500"
                  checked={isMonthly}
                  onChange={handleMonthlyChange}
                />
                <span className="ml-2 text-gray-700 text-sm">Rendi questa una donazione mensile</span>
              </label>
            </div>
            <div className="mb-6">
              <label className="block text-base font-medium text-gray-700 mb-3">Metodo di Pagamento</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { name: 'creditCard', icon: faCreditCard, label: 'Carta' },
                  { name: 'paypal', icon: faPaypal, label: 'PayPal' },
                  { name: 'applePay', icon: faApplePay, label: 'Apple Pay' },
                  { name: 'googlePay', icon: faGooglePay, label: 'Google Pay' },
                ].map((method) => (
                  <button
                    key={method.name}
                    className={`flex flex-col items-center justify-center p-3 border ${
                      paymentMethod === method.name
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    } rounded-lg shadow-sm transition duration-300 relative`}
                    onClick={() => handlePaymentMethodChange(method.name)}
                  >
                    {paymentMethod === method.name && (
                      <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs">
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    )}
                    <FontAwesomeIcon icon={method.icon} className="text-xl mb-1" />
                    <p className="text-xs">{method.label}</p>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleDonateNow}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-1 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Dona Ora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;