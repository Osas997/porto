import { S3Client } from "@aws-sdk/client-s3";

export const BUCKET_NAME = "porto";

export const s3 = new S3Client({
  forcePathStyle: true,
  region: "ap-southeast-1",
  endpoint: process.env.ENDPOINT!,
  credentials: {
    accessKeyId: process.env.KEY_ID!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
});
