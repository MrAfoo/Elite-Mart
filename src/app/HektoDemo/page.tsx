'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ShippingForm from '../components/ShippingForm';
import CartTotals from '../components/CartTotals';
import { toast } from 'react-hot-toast';


export default function HektoDemo() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [isShippingComplete, setIsShippingComplete] = useState(false);
    const [shippingRate, setShippingRate] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            toast('Please provide shipping information to continue', {
                duration: 7000,
                icon: '🚚',
                style: {
                    background: '#F6F5FF',
                    color: 'black',
                    
                },
            });
        }, 100);

        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);
     


    const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const tax = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
    const total = subtotal + shippingRate + tax;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#F6F5FF] flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-[#FB2E86] mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600">Start shopping to add products to your cart!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="w-full h-[200px] md:h-[286px] bg-[#F6F5FF] flex flex-col items-center justify-center px-4">
                <div className="text-center w-full max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                        Hekto Demo
                    </h1>
                </div>
            </div>

            {/* Main Section */}
            <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 py-6">
                {/* Left Section */}
                <div className="w-full md:w-2/3 bg-white p-6 md:p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl text-gray-800 font-bold mb-4">Hekto Demo</h2>
                    <p className="text-gray-500 mb-6">Cart / Information / Shipping / Payment</p>

                    

                    {/* Shipping Form */}
                    <ShippingForm onShippingComplete={(rate) => {
                        setShippingRate(rate);
                        setIsShippingComplete(true);
                    }} />
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/3 bg-white p-6 md:p-8 rounded-lg shadow-md">
                    <div className="space-y-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <img
                                    src={item.image?.asset?.url || '/placeholder.jpg'}
                                    alt={item.name}
                                    width={60}
                                    height={60}
                                    className="rounded border object-cover"
                                />
                                <div className="flex-1 mx-4">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-500 text-sm">Color: {item.color}</p>
                                    <p className="text-gray-500 text-sm">Size: {item.size}</p>
                                </div>
                                <p className="font-semibold">${item.price}</p>
                            </div>
                        ))}
                    </div>

                    {/* Enhanced Cart Totals */}
                    <CartTotals 
    subtotal={subtotal}
    shippingRate={shippingRate}
    tax={tax}
    isShippingComplete={isShippingComplete}
    onProceedToPayment={() => router.push('/payment')}
/>


                    
                </div>
            </div>
        </div>
    );
}