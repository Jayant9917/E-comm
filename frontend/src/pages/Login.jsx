import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginIMG from "../assets/login.webp";
import { loginUser, clearGuestId } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { mergeCart, forceRefreshCart } from "../redux/slices/cartSlice";

const Login = () => {
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
      try {
        // Check if there's a guest cart with products to merge
        const hasGuestCart = cart && cart.products && Array.isArray(cart.products) && cart.products.length > 0;
        
        if (hasGuestCart && guestId) {
          // Merge guest cart into user cart
          dispatch(mergeCart({ guestId, user }))
            .then((result) => {
              if (result.payload) {
                // Force refresh cart state with merged cart
                dispatch(forceRefreshCart(result.payload));
                // Clear guest ID from auth state
                dispatch(clearGuestId());
              }
              navigate(isCheckoutRedirect ? "/checkout" : "/");
            })
            .catch((error) => {
              // Even if merge fails, navigate to checkout
              navigate(isCheckoutRedirect ? "/checkout" : "/");
            });
        } else {
          // No guest cart to merge, just navigate
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        }
      } catch (error) {
        // If there's any error, just navigate to checkout
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
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
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            type="submit"
          >
            Sign In
          </button>
          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800 ">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={loginIMG}
            alt="login image"
            className="w-full h-[750px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
