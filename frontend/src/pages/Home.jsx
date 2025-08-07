import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";

// Images
import img1 from "../assets/women/aiony-haust-K0DxxljcRv0-unsplash.jpg";
import img2 from "../assets/women/oleg-ivanov-ykurGtWomMw-unsplash.jpg";
import img3 from "../assets/women/mahdi-chaghari-YKtDVRbpw2U-unsplash.jpg";
import img4 from "../assets/women/quan-nguyen-bYry70RTElE-unsplash.jpg";
import img5 from "../assets/women/alexander-jawfox-GNd5gstTSg8-unsplash.jpg";
import img6 from "../assets/women/young-teenage-girl-recording-reels-herself-outdoors-social-media.jpg";
import img7 from "../assets/women/joel-mott-qclr7hbOCwk-unsplash.jpg";
import img8 from "../assets/women/ismail-efe-top-w_5OeQBs118-unsplash.jpg";
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
