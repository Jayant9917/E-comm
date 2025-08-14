import { useState, useRef, useEffect } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../../redux/slices/productsSlice";
import { fetchProductsByFilters } from "../../redux/slices/productsSlice";


const SearchBar = ({ isOpen, setIsOpen, onOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      if (onOpen) onOpen();
    } else {
      if (onClose) onClose();
    }
  }, [isOpen, onOpen, onClose]);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  };

  return (
    <div
      className={`${isOpen
        ? "fixed left-0 top-0 flex items-center justify-center w-full bg-white h-24 z-50 border-b border-gray-200 transition-all duration-300"
        : "flex items-center transition-all duration-300"}`}
      style={isOpen ? { maxWidth: '100vw', overflow: 'hidden' } : {}}
    >
      {isOpen ? (
        <form onSubmit={handleSearch} 
        className="relative flex items-center justify-center w-full">
          <div className="relative w-full md:w-1/2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            {/* Search Icon*/}
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          {/* Close Button */}
          <button type="button" onClick={() => setIsOpen(false)}>
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6 text-gray-700 "/>
        </button>
      )}
    </div>
  );
}

export default SearchBar
