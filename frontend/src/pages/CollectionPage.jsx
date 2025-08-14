import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";

// Images
import img1 from "../assets/Men/malen-almonacid-trossi-CKhsaj5dbRI-unsplash.jpg";
import img2 from "../assets/Men/eve-maier-2oFjdqRp4mc-unsplash.jpg";
import img3 from "../assets/Men/patrick-t-kindt-KIcQzWym6O0-unsplash.jpg";
import img4 from "../assets/Men/andrew-davie-4LAQaUoHHUA-unsplash.jpg";
import img5 from "../assets/Men/andrew-davie-Lw6z9_fw1oU-unsplash.jpg";
import img6 from "../assets/Men/taylor-Xqb7GmV_VoQ-unsplash.jpg";
import img7 from "../assets/Men/malen-almonacid-trossi-MWUFWEexgDE-unsplash.jpg";
import img8 from "../assets/Men/mark-broadhead-jIH2R3YhKUY-unsplash.jpg";
import img9 from "../assets/Men/clarisse-meyer-5xbdx3TqPnw-unsplash.jpg";
import img10 from "../assets/Men/diego-sanchez-mPEuuh1JZSA-unsplash.jpg";
import img11 from "../assets/Men/justus-menke-c08DhK2MCcE-unsplash.jpg";
import img12 from "../assets/Men/whereslugo-lBVOaVl4yy8-unsplash.jpg";


import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

// Shuffle function to randomize products
function shuffleArray(array) {
  return array
    ? array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    : [];
}

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const SidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams}));
  }, [dispatch, collection, searchParams])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    //Close sidebar if clicked outside
    if (SidebarRef.current && !SidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to close sidebar
    document.addEventListener("mousedown", handleClickOutside);
    // Clean event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filters */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
      </button>

      {/* Filter Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50
        left-0 w-60 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
        ref={SidebarRef}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>

        {/* Sort Options */}
        <SortOptions />
        
        {/* Product Grid */}
        <ProductGrid products={shuffleArray(products)} loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default CollectionPage;
