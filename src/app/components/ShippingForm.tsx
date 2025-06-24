'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
    calculateShippingRate, 
    validateAddress, 
     
} from '../lib/shipping/mockDHL';
import { generateOrderId, calculateDeliveryDate } from '../utils/shipping';

interface ShippingFormData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
}

interface ShippingFormProps {
    onShippingComplete: (rate: number) => void;
}

const ShippingForm = ({ onShippingComplete }: ShippingFormProps) => {
    const [formData, setFormData] = useState<ShippingFormData>({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
    });
   
    const [orderId, setOrderId] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setFormData({...formData, postalCode: value});
        } else {
            toast.error('Invalid postal code. Numbers only!');
        }
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setFormData({...formData, phone: value});
        } else {
            toast.error('Invalid phone number. Numbers only!');
        }
    };
    
    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
       
        const newOrderId = generateOrderId();
        // Calculate rate based on a default weight of 2kg
        const shippingRate = calculateShippingRate(2, formData.country as "United States" | "United Kingdom" | "Canada" | "Australia");
        
        setOrderId(newOrderId);
        setShowDetails(true);
        onShippingComplete(shippingRate);
    };
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-black">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-2 border rounded"
                />
               <input
                    type="tel"
                    placeholder="Phone Number (numbers only)"
                    value={formData.phone}
                    onChange={handlePhoneNumberChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full p-2 border rounded"
                />
                <select
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full text-gray-800 p-2 border rounded"
                >
                    <option value="">Select Country</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                </select>
                <input
                    type="text"
                    placeholder="Postal Code (numbers only)"
                    value={formData.postalCode}
                    onChange={handlePostalCodeChange}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    disabled={!isFormValid()}
                    className={`w-full p-3 rounded ${isFormValid() ? 'bg-[#FB2E86] text-white hover:bg-pink-600' : 'bg-gray-300'}`}
                >
                    Check Shipping Details
                </button>
            </form>

            {showDetails && (
                <div className="mt-8 p-6 border rounded-lg shadow-lg bg-[#F6F5FF]">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <p><strong>Order ID:</strong> {orderId}</p>
                        <p><strong>Name:</strong> {formData.fullName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>From:</strong> Karachi, Pakistan</p>
                        <p><strong>To:</strong> {formData.city}, {formData.country}</p>
                        <p><strong>Expected Delivery:</strong> {calculateDeliveryDate()}</p>
                        <p><strong>Shipping Rate:</strong> ${calculateShippingRate(2, formData.country as "United States" | "United Kingdom" | "Canada" | "Australia")}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingForm;