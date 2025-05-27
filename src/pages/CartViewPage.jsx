import React from "react";
import { FiTrash2 } from "react-icons/fi";

const cartItems = []; 

const CartViewPage = () => {
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-2">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-500">Cart is empty.</div>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center border-b pb-4 last:border-b-0"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded mr-4 border"
                                />
                                <div className="flex-1">
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-sm text-gray-500">
                                        Quantity:{" "}
                                        <span className="font-medium">{item.quantity}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Price: {item.currency} {item.price.toFixed(2)}
                                    </div>
                                </div>
                                <button
                                    className="ml-4 text-red-500 hover:text-red-700"
                                    title="Remove"
                                >
                                    <FiTrash2 size={20} />
                                </button>
                            </div>
                        ))}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                            <div className="text-lg font-bold">
                                Total: USD {total.toFixed(2)}
                            </div>
                            <button
                                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition text-base font-semibold"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartViewPage;