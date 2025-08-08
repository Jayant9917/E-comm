import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";

// Images
import img1 from "../assets/women/aiony-haust-K0DxxljcRv0-unsplash.jpg";
import img2 from "../assets/women/oleg-ivanov-ykurGtWomMw-unsplash.jpg";
import img3 from "../assets/women/mahdi-chaghari-YKtDVRbpw2U-unsplash.jpg";
import img4 from "../assets/women/quan-nguyen-bYry70RTElE-unsplash.jpg";
import img5 from "../assets/women/alexander-jawfox-GNd5gstTSg8-unsplash.jpg";
import img6 from "../assets/women/young-teenage-girl-recording-reels-herself-outdoors-social-media.jpg";
import img7 from "../assets/women/joel-mott-qclr7hbOCwk-unsplash.jpg";
import img8 from "../assets/women/ismail-efe-top-w_5OeQBs118-unsplash.jpg";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const SidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 1,
          name: "Top For Girls",
          price: 100,
          images: [{ url: img1, altText: "product 1" }],
        },
        {
          _id: 2,
          name: "Casual Denim Shirt",
          price: 100,
          images: [{ url: img2, altText: "product 1" }],
        },
        {
          _id: 3,
          name: "Slim Fit Shirt",
          price: 100,
          images: [{ url: img3, altText: "product 1" }],
        },
        {
          _id: 4,
          name: "Goa Trip Outfit",
          price: 100,
          images: [{ url: img4, altText: "product 1" }],
        },
        {
          _id: 1,
          name: "Top For Girls",
          price: 100,
          images: [{ url: img5, altText: "product 1" }],
        },
        {
          _id: 2,
          name: "Casual Denim Shirt",
          price: 100,
          images: [{ url: img6, altText: "product 1" }],
        },
        {
          _id: 3,
          name: "Slim Fit Shirt",
          price: 100,
          images: [{ url: img7, altText: "product 1" }],
        },
        {
          _id: 4,
          name: "Goa Trip Outfit",
          price: 100,
          images: [{ url: img8, altText: "product 1" }],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
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
        <ProductGrid products={products}/>
      </div>
    </div>
  );
};

export default CollectionPage;
