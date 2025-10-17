const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, quality, height) => {
  const options = {
    folder,
    resource_type: 'auto',
  };

  if (quality) {
    options.quality = quality;
  }

  if (height) {
    options.height = height;
  }

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log("Uploading file from:", file.tempFilePath);
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
