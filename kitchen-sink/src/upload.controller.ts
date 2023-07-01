import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Entity } from '@siren-js/core';

import { SirenContent } from './siren-content.decorator';

import type { Express } from 'express';

@Controller('/upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  @SirenContent()
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return Entity.of({
      class: ['file'],
      properties: {
        fieldname: file.fieldname,
        filename: file.filename,
        mimetype: file.mimetype,
        originalname: file.originalname,
        path: file.path,
        size: file.size
      }
    });
  }
}
