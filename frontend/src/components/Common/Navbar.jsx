import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { useState } from "react";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {searchOpen ? (
          <div className="w-full flex justify-center">
            <SearchBar isOpen={searchOpen} setIsOpen={setSearchOpen} />
          </div>
        ) : (
          <>
            {/* Left Logo */}
            <div className="">
              <Link to="/" className="text-2xl font-medium">
                Rabbit
              </Link>
            </div>
            {/* Center - Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <Link
                to="#"
                className="text-gray-700 hover:text-black text-sm font-medium uppercase"
              >
                Men
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-black text-sm font-medium uppercase"
              >
                Women
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-black text-sm font-medium uppercase"
              >
                Top Wear
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-black text-sm font-medium uppercase"
              >
                Bottom Wear
              </Link>
            </div>
            {/* Right - Social Icons */}
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="hover:text-black">
                <HiOutlineUser className="h-6 w-6 text-gray-700" />
              </Link>
              <button
                onClick={toggleCartDrawer}
                className="relative hover:text-black"
              >
                <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 pu-0.5">
                  4
                </span>
              </button>
              {/* Search */}
              <SearchBar isOpen={searchOpen} setIsOpen={setSearchOpen} />
              <button onClick={toggleNavDrawer} className="md:hidden">
                <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </>
        )}
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      {navDrawerOpen && (
        <div className="fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg z-50 md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={toggleNavDrawer}>
              <IoMdClose className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          {/* Add your mobile nav links/content here */}
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            <nav className="space-y-4">
              <Link
                to="#"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black"
              >
                Men
              </Link>
              <Link
                to="#"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black"
              >
                Women
              </Link>
              <Link
                to="#"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black"
              >
                Top Wear
              </Link>
              <Link
                to="#"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black"
              >
                Bottom Wear
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
