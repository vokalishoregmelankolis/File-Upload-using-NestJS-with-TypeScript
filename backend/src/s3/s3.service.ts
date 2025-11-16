import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test-key',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test-secret',
      },
      endpoint: process.env.S3_ENDPOINT || 'https://s3.nafkhanzam.com',
      forcePathStyle: true,
    });
    this.bucketName = process.env.S3_BUCKET_NAME || 'test-bucket';
  }

  async generatePresignedUrl(
    fileExtension: string,
    contentType: string,
  ): Promise<{ uploadUrl: string; imagePath: string }> {
    const imagePath = `posts/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: imagePath,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 3600,
    });

    return { uploadUrl, imagePath };
  }
}
