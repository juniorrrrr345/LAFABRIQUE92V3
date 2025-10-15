export async function uploadToR2(r2Bucket, file, filename) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    await r2Bucket.put(filename, arrayBuffer);
    
    const url = `https://pub-20bda410e99f48a8a3d03bb93e540e08.r2.dev/${filename}`;
    return url;
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
}

export function getR2Url(filename) {
  return `https://pub-20bda410e99f48a8a3d03bb93e540e08.r2.dev/${filename}`;
}