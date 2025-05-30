import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProductApi from "../api/productAPI/useProductApi";

const OrderCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkoutOrders, getProductById } = useProductApi();

  const cartItems = location.state?.cartItems || [];
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productNames, setProductNames] = useState({});

  // Fetch product names for all cart items
  useEffect(() => {
    const fetchNames = async () => {
      const names = {};
      for (const item of cartItems) {
        if (!names[item.productId]) {
          try {
            const res = await getProductById(item.productId);
            if (res.status === 200) {
              names[item.productId] = res.data.name;
            }
          } catch {
            names[item.productId] = "Unknown Product";
          }
        }
      }
      setProductNames(names);
    };
    if (cartItems.length > 0) fetchNames();
  }, [cartItems, getProductById]);

  // Prevent repetitive requests
  const hasCheckedOut = useRef(false);

  useEffect(() => {
    if (hasCheckedOut.current || cartItems.length === 0) return;
    hasCheckedOut.current = true;

    const processCheckout = async () => {
      setLoading(true);
      const tempResults = [];
      for (const item of cartItems) {
        const order = {
          quantity: item.quantity,
          ProductId: item.productId,
          itemTotalPrice: item.itemTotalPrice,
        };
        try {
          const response = await checkoutOrders(order);
          tempResults.push({
            ...item,
            success: response.data,
            errorMsg: response.data === false ? "Not enough stock available" : "",
          });
        } catch {
          tempResults.push({
            ...item,
            success: false,
            errorMsg: "Not enough stock available",
          });
        }
      }
      setResults(tempResults);
      setLoading(false);
    };
    processCheckout();
  }, [cartItems, checkoutOrders]);

  const allSuccess =
    results.length === cartItems.length && results.every((r) => r.success);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Checkout</h2>
      {loading ? (
        <div className="text-center text-gray-500 py-8">
          Processing checkout...
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-4">
            {results.map((item, idx) => (
              <li
                key={item.cartItemId}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">
                    {productNames[item.productId] || "Loading..."}
                  </div>
                  <div className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total: {item.itemTotalPrice}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded text-white text-xs font-semibold ${
                    item.success ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {item.success ? "Success" : "Not enough stock available!"}
                </span>
              </li>
            ))}
          </ul>
          {allSuccess ? (
            <button
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-semibold"
              onClick={() => alert("Order placed!")}
            >
              Place Order
            </button>
          ) : (
            <button
              className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition font-semibold"
              onClick={() => navigate("/cart")}
            >
              Go Back to Cart
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default OrderCheckout;
