import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFileToCloudinary(
  filePath,
  newFileName,
  folder,
  size
) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: newFileName,
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ width: size, height: size }],
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
}

export async function downloadFileFromCloudinary(fileName, destinationPath) {
  try {
    const url = cloudinary.url(fileName);
    console.log('File downloaded successfully from Cloudinary');
  } catch (error) {
    console.error('Error downloading file from Cloudinary:', error);
  }
}
