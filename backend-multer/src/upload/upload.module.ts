import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    // TODO
  ],
  controllers: [UploadController],
})
export class UploadModule {}
