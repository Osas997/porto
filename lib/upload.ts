"use server";

import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET_NAME } from "@/lib/s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function uploadImage(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file uploaded" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Create unique filename
    const ext = path.extname(file.name) || ".png";
    const filename = `uploads/${uuidv4()}${ext}`;

    // Upload to Supabase S3
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    // Build the public URL from Supabase Storage
    const endpoint = process.env.ENDPOINT!;
    // Supabase S3 endpoint format: https://<project>.storage.supabase.co/storage/v1/s3
    // Public URL format:            https://<project>.storage.supabase.co/storage/v1/object/public/<bucket>/<key>
    const publicUrl = endpoint.replace(
      "/storage/v1/s3",
      `/storage/v1/object/public/${BUCKET_NAME}/${filename}`,
    );

    return { url: publicUrl };
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return { error: "Failed to upload image: " + error.message };
  }
}

export async function deleteImage(url: string): Promise<{ error?: string }> {
  try {
    // Extract the key from the public URL
    const bucketPrefix = `/storage/v1/object/public/${BUCKET_NAME}/`;
    const idx = url.indexOf(bucketPrefix);
    if (idx === -1) {
      return { error: "Invalid image URL" };
    }
    const key = url.substring(idx + bucketPrefix.length);

    await s3.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
    );

    return {};
  } catch (error: any) {
    console.error("Error deleting image:", error);
    return { error: "Failed to delete image: " + error.message };
  }
}
