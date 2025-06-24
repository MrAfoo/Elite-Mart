'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';  


interface ShippingRates {
  [key: string]: {
    [key: string]: number;
  };
}

const SHIPPING_RATES: ShippingRates = {
  'United States': {
    'Standard': 10,
    'Express': 25,
  },
  'Canada': {
    'Standard': 15,
    'Express': 30,
  },
  'United Kingdom': {
    'Standard': 20,
    'Express': 40,
  }
};

const ShippingCalculator = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [shippingMethod, setShippingMethod] = useState('Standard');

  const calculateShipping = () => {
    if (!country || !city || !postalCode) {
      toast.error('Please fill in all fields', 
        {
          duration: 3000,
          position: 'top-right',
        }
      );

      return;
    }

    
    const countryRates = SHIPPING_RATES[country];
    
    if (!countryRates) {
      toast.error('Shipping not available for selected country',{
         duration: 3000,
            position: 'top-center',});
      return;
    }

    // Calculate based on postal code length (example weight calculation)
    const baseRate = countryRates[shippingMethod];
    const weightFactor = postalCode.length * 0.5;
    const calculatedCost = baseRate + weightFactor;

    setShippingCost(calculatedCost);
    toast.success(`Shipping calculated`,{
      duration: 4000,
        position: 'top-center',
    });
  };

  return (
    <div className="bg-[#F6F5FF] p-6 rounded">
      <h3 className="text-center text-gray-800 text-lg font-bold mb-4">
        Calculate Shipping
      </h3>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full border text-gray-800 rounded p-2 mb-4"
      >
        <option value="">Select Country</option>
        {Object.keys(SHIPPING_RATES).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />
      <select
        value={shippingMethod}
        onChange={(e) => setShippingMethod(e.target.value)}
        className="w-full border text-gray-800 rounded p-2 mb-4"
      >
        <option value="Standard">Standard Shipping</option>
        <option value="Express">Express Shipping</option>
      </select>
      <button 
        onClick={calculateShipping}
        className="bg-pink-500 text-white w-full py-2 rounded hover:bg-pink-600 transition-colors"
      >
        Calculate Shipping
      </button>
      {shippingCost && (
        <div className="mt-4 text-center text-gray-800 font-semibold">
          Estimated Shipping Cost: ${shippingCost.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
