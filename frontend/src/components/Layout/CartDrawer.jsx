import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart, cleanupCartState } from "../../redux/slices/cartSlice";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  // Clean up cart state on mount
  useEffect(() => {
    dispatch(cleanupCartState());
  }, [dispatch]);

  // Fetch user cart when user logs in
  useEffect(() => {
    if (user && userId) {
      // If we have a valid cart with products and it belongs to the user, no need to fetch
      if (cart && cart.products && cart.products.length > 0 && cart.user === userId) {
        return;
      }
      
      // Only fetch if we don't have a cart, cart is empty, or cart doesn't belong to user
      if (!cart || !cart.products || cart.products.length === 0 || cart.user !== userId) {
        dispatch(fetchCart({ userId }))
          .catch((error) => {
            // Handle fetch error silently - user can still use existing cart
          });
      }
    }
  }, [user, userId, cart, dispatch]);

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform 
        transition-transform duration-300 flex flex-col z-50  
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* Cart Header */}
      {/* Cart contents with scrollable area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your Cart is empty.</p>
        )}
        {/* Component for cart contents */}
      </div>

      {/* Checkout Button fixed at the bottom*/}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              CheckOut
            </button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
              Shipping, Taxes and Discount code calculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
