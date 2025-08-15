import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";


const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Clear the cart when the order is confirmed
  useEffect(() => {
    // Clear cart from Redux state
    dispatch(clearCart());
  }, [dispatch]);

  const handleViewOrders = () => {
    navigate("/my-order");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-emerald-700 mb-4">
            Thank you for your order!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your order has been successfully placed and confirmed. You will receive an email confirmation shortly.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-8 w-8 mx-auto mb-2 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <p>Order Confirmed</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full h-8 w-8 mx-auto mb-2 flex items-center justify-center">
                <span className="text-yellow-600 font-semibold">2</span>
              </div>
              <p>Processing & Shipping</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full h-8 w-8 mx-auto mb-2 flex items-center justify-center">
                <span className="text-green-600 font-semibold">3</span>
              </div>
              <p>Delivered to You</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleViewOrders}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            View My Orders
          </button>
          <button
            onClick={handleContinueShopping}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
