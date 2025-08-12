import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";

// Images
import img1 from "../assets/women/aiony-haust-K0DxxljcRv0-unsplash.jpg";
import img2 from "../assets/Women/rafaella-mendes-diniz-et_78QkMMQs-unsplash.jpg";
import img3 from "../assets/Women/farshad-sheikhzad-IUR8isHHmgI-unsplash.jpg";
import img4 from "../assets/Women/david-nieto-PN_vlniJa78-unsplash.jpg";
import img5 from "../assets/Women/leyli-nova-gd0qpyteVFY-unsplash.jpg";
import img6 from "../assets/Women/kevin-torres-wwGTlaBRgJk-unsplash.jpg";
import img7 from "../assets/Women/josh-pereira-ANHQ4ZROiH8-unsplash.jpg";
import img8 from "../assets/Women/joeyy-lee-7x_1fK4Kgj8-unsplash.jpg";

import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
const placeholderProducts = [
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

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Sellers */}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Best Sellers</h2>
        <ProductDetails />
      </div>

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wear for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
