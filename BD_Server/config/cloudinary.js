
const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect =()=>{
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });

    }catch(error){
        console.error('Error connecting to cloudinary:', error);

    }
}

//uploads files to media server(cloudinary) and deletes from the local server