const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
    //
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// @route POST /api
// @desc Upload image to Cloudinary

router.post("/", upload.single("image"), async (req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Function to handle the stream upload to cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    }else{
                        reject(error);
                    }
                });
                //Use Streamify to convert the file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // Call the Stream Upload function
        const result = await streamUpload(req.file.buffer);

        // Respond with the uploaded image URL
        res.json({ imageUrl: result.secure_url });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = router;