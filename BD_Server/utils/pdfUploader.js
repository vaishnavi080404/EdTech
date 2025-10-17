const cloudinary = require("cloudinary").v2;

const uploadPdfToCloudinary = async (pdfBuffer, folderName,fileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",   
        folder: folderName,
        access_mode: "public",
        public_id: fileName  
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          return reject(error);
        }
        resolve(result);
      }
    ).end(pdfBuffer);
  });
};

module.exports = {uploadPdfToCloudinary}  ;// 👈 make sure this is here





// const cloudinary = require('cloudinary').v2;

// exports.uploadPdfToCloudinary = (buffer, folder, resourceType = 'auto') => {
//     return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//              resource_type: "raw",   // because PDF is not an image
        
//             (error, result) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(result);
//                 }
//             }
//         );

//         // This is the key part: we write the buffer to the stream
//         uploadStream.end(buffer);
//     });
// };


