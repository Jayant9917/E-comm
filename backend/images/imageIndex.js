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

// Male product images
const maleImages = {
  male1: `${getBaseUrl()}/images/male/andrew-davie-Lw6z9_fw1oU-unsplash.jpg`,
  male2: `${getBaseUrl()}/images/male/clarisse-meyer-5xbdx3TqPnw-unsplash.jpg`,
  male3: `${getBaseUrl()}/images/male/eve-maier-2oFjdqRp4mc-unsplash.jpg`,
  male4: `${getBaseUrl()}/images/male/mark-broadhead-jIH2R3YhKUY-unsplash.jpg`,
  male5: `${getBaseUrl()}/images/male/filip-rankovic-grobgaard-fDeUJwHy9RA-unsplash.jpg`,
  male6: `${getBaseUrl()}/images/male/diego-sanchez-mPEuuh1JZSA-unsplash.jpg`,
  male7: `${getBaseUrl()}/images/male/taylor-Xqb7GmV_VoQ-unsplash.jpg`,
  male8: `${getBaseUrl()}/images/male/dieter-blom-YAHCLVsRUBw-unsplash.jpg`,
  male9: `${getBaseUrl()}/images/male/patrick-t-kindt-KIcQzWym6O0-unsplash.jpg`,
  male10: `${getBaseUrl()}/images/male/malen-almonacid-trossi-fca3dsg8vz0-unsplash.jpg`,
  male11: `${getBaseUrl()}/images/male/malen-almonacid-trossi-CKhsaj5dbRI-unsplash.jpg`,
  male12: `${getBaseUrl()}/images/male/whereslugo-lBVOaVl4yy8-unsplash.jpg`,
  male13: `${getBaseUrl()}/images/male/malen-almonacid-trossi-MWUFWEexgDE-unsplash.jpg`,
  male14: `${getBaseUrl()}/images/male/olena-bohovyk-0f3rGmmRLtc-unsplash.jpg`,
  male15: `${getBaseUrl()}/images/male/andrew-davie-4LAQaUoHHUA-unsplash.jpg`,
  male16: `${getBaseUrl()}/images/male/glassesshop-WidHA6plUik-unsplash.jpg`,
  male17: `${getBaseUrl()}/images/male/de-andre-bush-HSpZ0Ffj0xY-unsplash.jpg`,
  male18: `${getBaseUrl()}/images/male/sorin-sirbu-_3iI0mADqho-unsplash.jpg`,
  male19: `${getBaseUrl()}/images/male/justus-menke-c08DhK2MCcE-unsplash.jpg`,
  male20: `${getBaseUrl()}/images/male/ali-morshedlou-WMD64tMfc4k-unsplash.jpg`,
  male21: `${getBaseUrl()}/images/male/ben-tofan-liy0P6AmGPM-unsplash.jpg`,
  male22: `${getBaseUrl()}/images/male/dillon-kydd-K6yX5vHHUs0-unsplash.jpg`,
  male23: `${getBaseUrl()}/images/male/ehimetalor-akhere-unuabona-5YWoFhRuux8-unsplash.jpg`,
  male24: `${getBaseUrl()}/images/male/elijah-hiett-umfpFoKxIVg-unsplash.jpg`,
  male25: `${getBaseUrl()}/images/male/joel-mott-zQ0WfMS7PTU-unsplash.jpg`,
};

// Female product images
const femaleImages = {
  female1: `${getBaseUrl()}/images/female/ardy-arjun-QNsHqLjy1BY-unsplash.jpg`,
  female2: `${getBaseUrl()}/images/female/david-nieto-PN_vlniJa78-unsplash.jpg`,
  female3: `${getBaseUrl()}/images/female/dom-hill-nimElTcTNyY-unsplash.jpg`,
  female4: `${getBaseUrl()}/images/female/rafaella-mendes-diniz-AoL-mVxprmk-unsplash.jpg`,
  female5: `${getBaseUrl()}/images/female/rafaella-mendes-diniz-et_78QkMMQs-unsplash.jpg`,
  female6: `${getBaseUrl()}/images/female/ayo-ogunseinde-6W4F62sN_yI-unsplash.jpg`,
  female7: `${getBaseUrl()}/images/female/kevin-torres-wwGTlaBRgJk-unsplash.jpg`,
  female8: `${getBaseUrl()}/images/female/drew-colins-LIEQsu5JuoM-unsplash.jpg`,
  female9: `${getBaseUrl()}/images/female/shlomi-platzman-VF0dgmBSf9Q-unsplash.jpg`,
  female10: `${getBaseUrl()}/images/female/david-wayne-_kYDvlhDmwM-unsplash.jpg`,
  female11: `${getBaseUrl()}/images/female/allef-vinicius-vXbNfW5K_AA-unsplash.jpg`,
  female12: `${getBaseUrl()}/images/female/josh-pereira-ANHQ4ZROiH8-unsplash.jpg`,
  female13: `${getBaseUrl()}/images/female/max-titov-gNDsuaRMQ6s-unsplash.jpg`,
  female14: `${getBaseUrl()}/images/female/mahdi-chaghari-fNEMSHWktOM-unsplash.jpg`,
  female15: `${getBaseUrl()}/images/female/ola-dybul-25xVzk7X1xk-unsplash (1).jpg`,
  female16: `${getBaseUrl()}/images/female/joeyy-lee-7x_1fK4Kgj8-unsplash.jpg`,
  female17: `${getBaseUrl()}/images/female/alma-RzIGme6q2WY-unsplash.jpg`,
  female18: `${getBaseUrl()}/images/female/quan-nguyen-FiANPPQaaC8-unsplash.jpg`,
  female19: `${getBaseUrl()}/images/female/microsoft-365-7mBictB_urk-unsplash.jpg`,
  female20: `${getBaseUrl()}/images/female/beauty-portrait-young-adult.jpg`,
  female21: `${getBaseUrl()}/images/female/tony-saiko-IqxRGqjZOIk-unsplash.jpg`,
  female22: `${getBaseUrl()}/images/female/tony-saiko-HU1Me40RTGo-unsplash.jpg`,
  female23: `${getBaseUrl()}/images/female/aiony-haust-K0DxxljcRv0-unsplash.jpg`,
  female24: `${getBaseUrl()}/images/female/alex-beholder-J69l0Z2c-h0-unsplash.jpg`,
  female25: `${getBaseUrl()}/images/female/alexander-jawfox-GNd5gstTSg8-unsplash.jpg`,
  female26: `${getBaseUrl()}/images/female/anastase-maragos-aQCT1xrqA9I-unsplash.jpg`,
  female27: `${getBaseUrl()}/images/female/ayo-ogunseinde-yFsUYtBGjzo-unsplash.jpg`,
  female28: `${getBaseUrl()}/images/female/corey-saldana-An_-fZt7NdM-unsplash.jpg`,
  female29: `${getBaseUrl()}/images/female/corey-saldana-D2qbuc2e1Qc-unsplash.jpg`,
  female30: `${getBaseUrl()}/images/female/corey-saldana-kJpL9QiSnKs-unsplash.jpg`,
  female31: `${getBaseUrl()}/images/female/farshad-sheikhzad-IUR8isHHmgI-unsplash.jpg`,
  female32: `${getBaseUrl()}/images/female/farshad-sheikhzad-Oxmc8d-axcU-unsplash.jpg`,
  female33: `${getBaseUrl()}/images/female/icons8-team-6LZuSzSwso0-unsplash.jpg`,
  female34: `${getBaseUrl()}/images/female/ismail-efe-top-w_5OeQBs118-unsplash.jpg`,
  female35: `${getBaseUrl()}/images/female/jamar-crable-unfmZMNUDko-unsplash.jpg`,
  female36: `${getBaseUrl()}/images/female/jay-soundo-oYZt7fBawH4-unsplash.jpg`,
  female37: `${getBaseUrl()}/images/female/joel-mott-qclr7hbOCwk-unsplash.jpg`,
  female38: `${getBaseUrl()}/images/female/leyli-nova-gd0qpyteVFY-unsplash.jpg`,
  female39: `${getBaseUrl()}/images/female/mahdi-chaghari-YKtDVRbpw2U-unsplash.jpg`,
  female40: `${getBaseUrl()}/images/female/masi-mohammadi-FgGVblkZTyA-unsplash.jpg`,
  female41: `${getBaseUrl()}/images/female/mohammad-reza-hzujQQ5-cUM-unsplash.jpg`,
  female42: `${getBaseUrl()}/images/female/ola-dybul-Vem-vji88aA-unsplash.jpg`,
  female43: `${getBaseUrl()}/images/female/oleg-ivanov-QhR78CbFPoE-unsplash.jpg`,
  female44: `${getBaseUrl()}/images/female/oleg-ivanov-ykurGtWomMw-unsplash.jpg`,
  female45: `${getBaseUrl()}/images/female/pouya-hajiebrahimi-nlIEfm6soyw-unsplash.jpg`,
  female46: `${getBaseUrl()}/images/female/quan-nguyen-bYry70RTElE-unsplash.jpg`,
  female47: `${getBaseUrl()}/images/female/quan-nguyen-oeX3hyWcyWg-unsplash.jpg`,
  female48: `${getBaseUrl()}/images/female/sonnie-hiles-gG70fyu3qsg-unsplash.jpg`,
  female49: `${getBaseUrl()}/images/female/spenser-sembrat-bNc5C0rqBCw-unsplash.jpg`,
  female50: `${getBaseUrl()}/images/female/young-teenage-girl-recording-reels-herself-outdoors-social-media.jpg`,
};

// All images combined for easy access
const allImages = {
  ...maleImages,
  ...femaleImages,
};

// Helper function to get image by product ID
const getProductImage = (productId, gender = "male") => {
  if (gender === "male") {
    return maleImages[productId] || null;
  } else if (gender === "female") {
    return femaleImages[productId] || null;
  }
  return null;
};

// Helper function to get all images for a specific gender
const getImagesByGender = (gender) => {
  if (gender === "male") {
    return maleImages;
  } else if (gender === "female") {
    return femaleImages;
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
