import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {

  async generatePresignedUrl(
    fileExtension: string,
    contentType: string,
  ): Promise<{ uploadUrl: string; imagePath: string }> {
    // TODO
  }
}
