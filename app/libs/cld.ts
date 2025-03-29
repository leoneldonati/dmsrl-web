import { arrayBufferToBase64 } from "@utils/buffer";
import { v2 as cld } from "cloudinary";

cld.config({
  api_key: import.meta.env.CLD_KEY,
  api_secret: import.meta.env.CLD_SECRET,
  cloud_name: import.meta.env.CLD_NAME,
});
export async function uploadFile(buffer: ArrayBuffer, fileType: string) {
  const base64String = arrayBufferToBase64(buffer);
  const dataUri = `data:${fileType};base64,${base64String}`;

  try {
    const result = await cld.uploader.upload(dataUri, { folder: "dmsrl" });
    return {
      ok: true,
      uploadedAsset: {
        secureUrl: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        size: result.bytes,
      },
    };
  } catch (e) {
    return {
      ok: false,
      uploadedAsset: null,
    };
  }
}

export async function deleteFile(publicId: string) {
  try {
    await cld.uploader.destroy(publicId);

    return {
      ok: true,
    };
  } catch (e) {
    return {
      ok: false,
    };
  }
}
