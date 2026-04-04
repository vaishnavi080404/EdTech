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







