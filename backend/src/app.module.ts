import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [PostsModule, AuthModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
