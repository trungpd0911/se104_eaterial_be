const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storageUser = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
    params: {
        folder: "avatarUser4FOOD",
    }
});

const storageDish = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
    params: {
        folder: "imageDish4FOOD",
    }
});

const uploadCloudUser = multer({ storage: storageUser });
const uploadCloudDish = multer({ storage: storageDish });


module.exports = {
    uploadCloudUser,
    uploadCloudDish,
};