import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerIMG from "../assets/register.webp";
import { registerUser, clearGuestId } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart, forceRefreshCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      // Check if there's a guest cart with products to merge
      const hasGuestCart = cart && cart.products && Array.isArray(cart.products) && cart.products.length > 0;
      
      if (hasGuestCart && guestId) {
        // Merge guest cart into user cart
        dispatch(mergeCart({ guestId, user }))
          .then((result) => {
            if (result.payload) {
              // Check if the merged cart is now a user cart (has user field, no guestId)
              if (result.payload.user && !result.payload.guestId) {
                // Force refresh cart state with merged cart
                dispatch(forceRefreshCart(result.payload));
                // Clear guest ID from auth state
                dispatch(clearGuestId());
              } else {
                console.error("❌ Register: Cart merge failed - cart still has guest properties");
              }
            }
            navigate(isCheckoutRedirect ? "/checkout" : "/");
          })
          .catch((error) => {
            console.error("❌ Register: Cart merge failed:", error);
            // Even if merge fails, navigate to checkout
            navigate(isCheckoutRedirect ? "/checkout" : "/");
          });
      } else {
        // No guest cart to merge, just navigate
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  
  // Get error and loading state from Redux
  const { error, isLoading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium ">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Hey there!....
          </h2>
          <p className="text-center mb-6">
            Enter Your username and password to Login
          </p>
          
          {/* Error Message Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Full Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Password"
              required
              minLength={6}
            />
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="mt-6 text-center text-sm">
            You have an account?{" "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800 ">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={registerIMG}
            alt="login image"
            className="w-full h-[750px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
