import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MulterModule} from "@nestjs/platform-express";
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import { diskStorage } from 'multer';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, 'plugins'),
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }}),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
