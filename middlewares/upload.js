const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
    params: async (req, file) => {
    if (!file) {
        // Handle case when no file is uploaded
        return {}; // Return an empty object or set default values
    }
        

    // Determine the folder based on file properties or request data
    let folder;
    if (file.fieldname === 'avatar') {
      folder = 'avatars';
    } else if (file.fieldname === 'documents') {
      folder = 'documents';
    } else {
      folder = 'misc';
    }
      
    // Define the transformation options for resizing the image
    const transformation = {
      width: 250, // New width
      height: 250, // New height
      crop: 'fill', // Crop the image to fit the specified dimensions
    };
      
    return {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png'], // Adjust the allowed formats as needed
      public_id: file.originalname, // Use original filename as the public ID
      transformation: [transformation], // Apply the transformation to the uploaded image
    };
  },
});

const upload = multer({ storage });

module.exports = upload;