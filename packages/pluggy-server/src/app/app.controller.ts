import {Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';

import { AppService } from './app.service';
import {FileInterceptor} from "@nestjs/platform-express";
import { Express } from 'express';
import { Multer, diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('plugins')
  getPluginsList(): Promise<string[]> {
    return this.appService.getPluginsList();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
    	originalname: file.originalname,
    	filename: file.filename,
    };
    this.appService.UploadedFile(file);
    return response;
  }
}
