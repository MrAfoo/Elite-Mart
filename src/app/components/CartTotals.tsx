'use client';

interface CartTotalsProps {
    subtotal: number;
    shippingRate: number;
    tax: number;
    isShippingComplete: boolean;
    onProceedToPayment: () => void;
}

const CartTotals = ({ subtotal, shippingRate, tax, isShippingComplete, onProceedToPayment }: CartTotalsProps) => {
    const total = subtotal + shippingRate + tax;

    return (
        <div>
            <div className="bg-[#F6F5FF] p-4 rounded-lg mt-6">
                <div className="space-y-3 ">
                    <div className="flex justify-between text-gray-800 text-lg font-semibold">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-800 text-lg">
                        <span>Shipping:</span>
                        <span>${shippingRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-800 text-lg">
                        <span>Tax:</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3">
                        <div className="flex justify-between text-xl font-bold text-black">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-4">
                    <span className="w-2 h-2 bg-[#2efba6] rounded-full inline-block mr-2"></span>
                    Shipping & taxes calculated at checkout
                </p>
            </div>

            <button
                className={`w-full py-3 mt-6 rounded transition ${
                    isShippingComplete
                        ? 'bg-[#FB2E86] hover:bg-pink-600 text-white'
                        : 'bg-gray-300 cursor-not-allowed'
                }`}
                onClick={onProceedToPayment}
                disabled={!isShippingComplete}
            >
                Proceed To Payment
            </button>
        </div>
    );
};

export default CartTotals;
