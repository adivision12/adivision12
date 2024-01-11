const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

// cloudinary.config({ 
//   cloud_name: 'dcgdg9ths', 
//   api_key: '775155217447482', 
//   api_secret: '_C2Sgsp89a4g3vFteDANAiw_vnk' 
// });

storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormats: ["png","jpg","jpeg"],
    },
  });

  module.exports={storage,cloudinary};