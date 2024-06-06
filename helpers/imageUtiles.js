import fs from 'node:fs/promises';
import Jimp from 'jimp';

export async function deleteFile(fileURL) {
  try {
    await fs.unlink(fileURL);
  } catch (error) {
    console.error('Error deleting temp file:', error);
  }
}

export async function resizeImage(imagePath, width, height) {
  const image = await Jimp.read(imagePath);
  await image.resize(width, height);
  await image.writeAsync(imagePath);
}
