// Centralized image management for products images

// Male product images
const maleImages = {
  male1: 'http://localhost:9000/images/male/andrew-davie-Lw6z9_fw1oU-unsplash.jpg',
  male2: 'http://localhost:9000/images/male/clarisse-meyer-5xbdx3TqPnw-unsplash.jpg',
  male3: 'http://localhost:9000/images/male/eve-maier-2oFjdqRp4mc-unsplash.jpg',
  male4: 'http://localhost:9000/images/male/mark-broadhead-jIH2R3YhKUY-unsplash.jpg',
  male5: 'http://localhost:9000/images/male/filip-rankovic-grobgaard-fDeUJwHy9RA-unsplash.jpg',
  male6: 'http://localhost:9000/images/male/diego-sanchez-mPEuuh1JZSA-unsplash.jpg',
  male7: 'http://localhost:9000/images/male/taylor-Xqb7GmV_VoQ-unsplash.jpg',
  male8: 'http://localhost:9000/images/male/dieter-blom-YAHCLVsRUBw-unsplash.jpg',
  male9: 'http://localhost:9000/images/male/patrick-t-kindt-KIcQzWym6O0-unsplash.jpg',
  male10: 'http://localhost:9000/images/male/malen-almonacid-trossi-fca3dsg8vz0-unsplash.jpg',
  male11: 'http://localhost:9000/images/male/malen-almonacid-trossi-CKhsaj5dbRI-unsplash.jpg',
  male12: 'http://localhost:9000/images/male/whereslugo-lBVOaVl4yy8-unsplash.jpg',
  male13: 'http://localhost:9000/images/male/malen-almonacid-trossi-MWUFWEexgDE-unsplash.jpg',
  male14: 'http://localhost:9000/images/male/olena-bohovyk-0f3rGmmRLtc-unsplash.jpg',
  male15: 'http://localhost:9000/images/male/andrew-davie-4LAQaUoHHUA-unsplash.jpg',
  male16: 'http://localhost:9000/images/male/ola-dybul-Vem-vji88aA-unsplash.jpg',
  male17: 'http://localhost:9000/images/male/de-andre-bush-HSpZ0Ffj0xY-unsplash.jpg',
  male18: 'http://localhost:9000/images/male/sorin-sirbu-_3iI0mADqho-unsplash.jpg',
  male19: 'http://localhost:9000/images/male/justus-menke-c08DhK2MCcE-unsplash.jpg',
};

// Female product images  
const femaleImages = {
  female1: 'http://localhost:9000/images/female/ardy-arjun-QNsHqLjy1BY-unsplash.jpg',
  female2: 'http://localhost:9000/images/female/david-nieto-PN_vlniJa78-unsplash.jpg',
  female3: 'http://localhost:9000/images/female/dom-hill-nimElTcTNyY-unsplash.jpg',
  female4: 'http://localhost:9000/images/female/rafaella-mendes-diniz-AoL-mVxprmk-unsplash.jpg',
  female5: 'http://localhost:9000/images/female/rafaella-mendes-diniz-et_78QkMMQs-unsplash.jpg',
  female6: 'http://localhost:9000/images/female/ayo-ogunseinde-6W4F62sN_yI-unsplash.jpg',
  female7: 'http://localhost:9000/images/female/kevin-torres-wwGTlaBRgJk-unsplash.jpg',
  female8: 'http://localhost:9000/images/female/drew-colins-LIEQsu5JuoM-unsplash.jpg',
  female9: 'http://localhost:9000/images/female/shlomi-platzman-VF0dgmBSf9Q-unsplash.jpg',
  female10: 'http://localhost:9000/images/female/david-wayne-_kYDvlhDmwM-unsplash.jpg',
  female11: 'http://localhost:9000/images/female/allef-vinicius-vXbNfW5K_AA-unsplash.jpg',
  female12: 'http://localhost:9000/images/female/josh-pereira-ANHQ4ZROiH8-unsplash.jpg',
  female13: 'http://localhost:9000/images/female/max-titov-gNDsuaRMQ6s-unsplash.jpg',
  female14: 'http://localhost:9000/images/female/mahdi-chaghari-fNEMSHWktOM-unsplash.jpg',
  female15: 'http://localhost:9000/images/female/ola-dybul-25xVzk7X1xk-unsplash (1).jpg',
  female16: 'http://localhost:9000/images/female/joeyy-lee-7x_1fK4Kgj8-unsplash.jpg',
  female17: 'http://localhost:9000/images/female/alma-RzIGme6q2WY-unsplash.jpg',
  female18: 'http://localhost:9000/images/female/corey-saldana-An_-fZt7NdM-unsplash.jpg',
  female19: 'http://localhost:9000/images/female/icons8-team-6LZuSzSwso0-unsplash.jpg',
  female20: 'http://localhost:9000/images/female/masi-mohammadi-FgGVblkZTyA-unsplash.jpg',
};

// All images combined for easy access
const allImages = {
  ...maleImages,
  ...femaleImages,
};

// Helper function to get image by product ID
const getProductImage = (productId, gender = 'male') => {
  if (gender === 'male') {
    return maleImages[productId] || null;
  } else if (gender === 'female') {
    return femaleImages[productId] || null;
  }
  return null;
};

// Helper function to get all images for a specific gender
const getImagesByGender = (gender) => {
  if (gender === 'male') {
    return maleImages;
  } else if (gender === 'female') {
    return femaleImages;
  }
  return {};
};

module.exports = {
  maleImages,
  femaleImages,
  allImages,
  getProductImage,
  getImagesByGender
};
