// Centralized image management for products images

// Get base URL from environment or default to localhost for development
const getBaseUrl = () => {
  // Check multiple indicators for production environment
  const isProduction = process.env.NODE_ENV === 'production' || 
                      process.env.VERCEL || 
                      process.env.VERCEL_ENV === 'production' ||
                      !process.env.NODE_ENV; // Default to production if NODE_ENV is not set
  
  return isProduction 
    ? process.env.BACKEND_URL || 'https://e-comm-zeta-two.vercel.app'
    : 'http://localhost:9000';
};

// Helper function to generate image URLs dynamically
const getImageUrl = (path) => `${getBaseUrl()}${path}`;

// Male product images - using functions to generate URLs at runtime
const getMaleImages = () => ({
  male1: getImageUrl('/images/male/andrew-davie-Lw6z9_fw1oU-unsplash.jpg'),
  male2: getImageUrl('/images/male/clarisse-meyer-5xbdx3TqPnw-unsplash.jpg'),
  male3: getImageUrl('/images/male/eve-maier-2oFjdqRp4mc-unsplash.jpg'),
  male4: getImageUrl('/images/male/mark-broadhead-jIH2R3YhKUY-unsplash.jpg'),
  male5: getImageUrl('/images/male/filip-rankovic-grobgaard-fDeUJwHy9RA-unsplash.jpg'),
  male6: getImageUrl('/images/male/diego-sanchez-mPEuuh1JZSA-unsplash.jpg'),
  male7: getImageUrl('/images/male/taylor-Xqb7GmV_VoQ-unsplash.jpg'),
  male8: getImageUrl('/images/male/dieter-blom-YAHCLVsRUBw-unsplash.jpg'),
  male9: getImageUrl('/images/male/patrick-t-kindt-KIcQzWym6O0-unsplash.jpg'),
  male10: getImageUrl('/images/male/malen-almonacid-trossi-fca3dsg8vz0-unsplash.jpg'),
  male11: getImageUrl('/images/male/malen-almonacid-trossi-CKhsaj5dbRI-unsplash.jpg'),
  male12: getImageUrl('/images/male/whereslugo-lBVOaVl4yy8-unsplash.jpg'),
  male13: getImageUrl('/images/male/malen-almonacid-trossi-MWUFWEexgDE-unsplash.jpg'),
  male14: getImageUrl('/images/male/olena-bohovyk-0f3rGmmRLtc-unsplash.jpg'),
  male15: getImageUrl('/images/male/andrew-davie-4LAQaUoHHUA-unsplash.jpg'),
  male16: getImageUrl('/images/male/glassesshop-WidHA6plUik-unsplash.jpg'),
  male17: getImageUrl('/images/male/de-andre-bush-HSpZ0Ffj0xY-unsplash.jpg'),
  male18: getImageUrl('/images/male/sorin-sirbu-_3iI0mADqho-unsplash.jpg'),
  male19: getImageUrl('/images/male/justus-menke-c08DhK2MCcE-unsplash.jpg'),
  male20: getImageUrl('/images/male/ali-morshedlou-WMD64tMfc4k-unsplash.jpg'),
  male21: getImageUrl('/images/male/ben-tofan-liy0P6AmGPM-unsplash.jpg'),
  male22: getImageUrl('/images/male/dillon-kydd-K6yX5vHHUs0-unsplash.jpg'),
  male23: getImageUrl('/images/male/ehimetalor-akhere-unuabona-5YWoFhRuux8-unsplash.jpg'),
  male24: getImageUrl('/images/male/elijah-hiett-umfpFoKxIVg-unsplash.jpg'),
  male25: getImageUrl('/images/male/joel-mott-zQ0WfMS7PTU-unsplash.jpg'),
});

// For backward compatibility
const maleImages = getMaleImages();

// Female product images - using functions to generate URLs at runtime
const getFemaleImages = () => ({
  female1: getImageUrl('/images/female/ardy-arjun-QNsHqLjy1BY-unsplash.jpg'),
  female2: getImageUrl('/images/female/david-nieto-PN_vlniJa78-unsplash.jpg'),
  female3: getImageUrl('/images/female/dom-hill-nimElTcTNyY-unsplash.jpg'),
  female4: getImageUrl('/images/female/rafaella-mendes-diniz-AoL-mVxprmk-unsplash.jpg'),
  female5: getImageUrl('/images/female/rafaella-mendes-diniz-et_78QkMMQs-unsplash.jpg'),
  female6: getImageUrl('/images/female/ayo-ogunseinde-6W4F62sN_yI-unsplash.jpg'),
  female7: getImageUrl('/images/female/kevin-torres-wwGTlaBRgJk-unsplash.jpg'),
  female8: getImageUrl('/images/female/ayo-ogunseinde-sibVwORYqs0-unsplash.jpg'),
  female9: getImageUrl('/images/female/kevin-torres-9z9fxr_7Z-k-unsplash.jpg'),
  female10: getImageUrl('/images/female/kevin-torres-ixOKHPKGRYs-unsplash.jpg'),
  female11: getImageUrl('/images/female/kevin-torres-Hs4KIgOjKGI-unsplash.jpg'),
  female12: getImageUrl('/images/female/kevin-torres-JeOMG_7hNLs-unsplash.jpg'),
  female13: getImageUrl('/images/female/kevin-torres-wCiTJj4r_3s-unsplash.jpg'),
  female14: getImageUrl('/images/female/kevin-torres-YQgPJvS5vxs-unsplash.jpg'),
  female15: getImageUrl('/images/female/kevin-torres-JeOMG_7hNLs-unsplash.jpg'),
  female16: getImageUrl('/images/female/kevin-torres-9z9fxr_7Z-k-unsplash.jpg'),
  female17: getImageUrl('/images/female/kevin-torres-ixOKHPKGRYs-unsplash.jpg'),
  female18: getImageUrl('/images/female/kevin-torres-Hs4KIgOjKGI-unsplash.jpg'),
  female19: getImageUrl('/images/female/kevin-torres-JeOMG_7hNLs-unsplash.jpg'),
  female20: getImageUrl('/images/female/kevin-torres-wCiTJj4r_3s-unsplash.jpg'),
  female21: getImageUrl('/images/female/kevin-torres-YQgPJvS5vxs-unsplash.jpg'),
  female22: getImageUrl('/images/female/kevin-torres-JeOMG_7hNLs-unsplash.jpg'),
  female23: getImageUrl('/images/female/kevin-torres-9z9fxr_7Z-k-unsplash.jpg'),
  female24: getImageUrl('/images/female/kevin-torres-ixOKHPKGRYs-unsplash.jpg'),
  female25: getImageUrl('/images/female/kevin-torres-Hs4KIgOjKGI-unsplash.jpg'),
});

// For backward compatibility
const femaleImages = getFemaleImages();

// All images combined for easy access - using dynamic functions
const getAllImages = () => ({
  ...getMaleImages(),
  ...getFemaleImages(),
});

// For backward compatibility
const allImages = getAllImages();

// Helper function to get image by product ID
const getProductImage = (productId, gender = "male") => {
  if (gender === "male") {
    return getMaleImages()[productId] || null;
  } else if (gender === "female") {
    return getFemaleImages()[productId] || null;
  }
  return null;
};

// Helper function to get all images for a specific gender
const getImagesByGender = (gender) => {
  if (gender === "male") {
    return getMaleImages();
  } else if (gender === "female") {
    return getFemaleImages();
  }
  return {};
};

module.exports = {
  maleImages,
  femaleImages,
  allImages,
  getProductImage,
  getImagesByGender,
};
