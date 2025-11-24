import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { memoryStorage } from 'multer';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('story')
  @ApiOperation({ summary: 'Upload a story media file (audio/video)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 500 * 1024 * 1024, // 500MB limit
      },
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype.startsWith('audio/') ||
          file.mimetype.startsWith('video/')
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only audio and video files are allowed'), false);
        }
      },
    }),
  )
  async uploadStory(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return this.uploadService.uploadStoryFile(file);
  }
}

