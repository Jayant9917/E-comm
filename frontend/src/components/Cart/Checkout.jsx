import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createCheckout } from "../../redux/slices/checkoutSlice";


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  const [CheckoutId, setCheckoutId] = useState(null);
  const [guestEmail, setGuestEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    
    // Validate guest email if user is not logged in
    if (!user && !guestEmail) {
      alert("Please enter your email address to continue with checkout");
      return;
    }
    
    if (cart && cart.products.length > 0) {
      // Prepare checkout data
      const checkoutData = {
        checkoutItems: cart.products,
        shippingAddress: shippingAddress,
        paymentMethod: "paypal",
        totalPrice: cart.totalPrice,
      };

      // Add user or guest identifier
      if (user) {
        // Authenticated user checkout
        checkoutData.userId = user._id;
      } else if (guestId) {
        // Guest checkout
        checkoutData.guestId = guestId;
        // Add guest email to shipping address for order confirmation
        checkoutData.shippingAddress = {
          ...shippingAddress,
          email: guestEmail
        };
      }

      const res = await dispatch(createCheckout(checkoutData));
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      // For guest users, we don't need Authorization header
      const headers = {};
      const userToken = localStorage.getItem("userToken");
      
      if (userToken) {
        headers.Authorization = `Bearer ${userToken}`;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${CheckoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        { headers }
      );
      await handleFinalizeCheckout(CheckoutId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinalizeCheckout = async (CheckoutId) => {
    try {
      // For guest users, we don't need Authorization header
      const headers = {};
      const userToken = localStorage.getItem("userToken");
      
      if (userToken) {
        headers.Authorization = `Bearer ${userToken}`;
      }

      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${CheckoutId}/finalize`,
        {},
        { headers }
      );
      navigate("/order-confirmation");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading Cart...</p>;
  }

  if (error) {
    return <p>Error Loading Cart... {error}</p>;
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your Cart is empty...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 ">Email</label>
            <input
              type="email"
              value={user ? user.email : guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={user ? "Your Email" : "Guest Email"}
              disabled={!!user}
              required={!user}
            />
            {!user && (
              <p className="text-sm text-gray-500 mt-1">
                Your email will be used for order confirmation and updates
              </p>
            )}
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          {/* First Name */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 ">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            {/* last Name */}
            <div>
              <label className="block text-gray-700 ">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 ">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 ">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          {/* Country */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6">
            {!CheckoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay With Paypal</h3>
                {/* Paypal component */}
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment failed. Try Again Later")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
