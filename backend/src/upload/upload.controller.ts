import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { SupabaseService } from '../supabase/supabase.service';
import { memoryStorage } from 'multer';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get('test')
  @ApiOperation({ summary: 'Test Supabase Storage connection' })
  async testConnection() {
    try {
      const bucketName = 'stories';
      const adminClient = this.supabaseService.getAdminClient();
      
      console.log('Testing Supabase Storage connection...');
      console.log('Supabase URL:', process.env.SUPABASE_URL);
      console.log('Service Role Key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
      console.log('Service Role Key length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length);
      
      const { data: buckets, error } = await adminClient.storage.listBuckets();
      
      if (error) {
        console.error('Storage listBuckets error:', error);
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          originalError: (error as any).originalError,
        });
        
        // Try to extract more details from the error
        const errorInfo: any = {
          success: false,
          error: error.message,
          errorName: error.name,
          message: 'Cannot connect to Supabase Storage',
        };
        
        // Check if there's an originalError with more details
        if ((error as any).originalError) {
          errorInfo.originalError = String((error as any).originalError);
        }
        
        // Check if it's a network error
        if (error.message?.includes('fetch') || error.message?.includes('network')) {
          errorInfo.suggestion = 'This appears to be a network connectivity issue. Check: 1) Your internet connection, 2) Firewall settings, 3) SUPABASE_URL is correct';
        }
        
        return errorInfo;
      }

      console.log('Buckets retrieved:', buckets);
      const bucket = buckets?.find((b) => b.name === bucketName);
      const bucketExists = !!bucket;
      
      return {
        success: true,
        bucketExists,
        bucketName,
        isPublic: bucket?.public || false,
        totalBuckets: buckets?.length || 0,
        buckets: buckets?.map((b) => ({ name: b.name, public: b.public })) || [],
        message: bucketExists
          ? bucket?.public
            ? `Bucket "${bucketName}" exists and is public (ready for uploads)`
            : `Bucket "${bucketName}" exists but is NOT public. Please make it public in Supabase Dashboard → Storage → ${bucketName} → Settings → Make Public`
          : `Bucket "${bucketName}" does not exist. Please create it in Supabase Dashboard.`,
      };
    } catch (error) {
      console.error('Test connection error:', error);
      console.error('Error stack:', error.stack);
      return {
        success: false,
        error: error.message,
        errorStack: error.stack,
        message: 'Failed to test Supabase connection',
      };
    }
  }

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

    try {
      return await this.uploadService.uploadStoryFile(file);
    } catch (error) {
      console.error('Upload controller error:', error);
      throw new BadRequestException(error.message || 'Failed to upload file');
    }
  }
}
