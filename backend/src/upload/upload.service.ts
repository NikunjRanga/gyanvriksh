import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly bucketName: string;

  constructor(
    private supabaseService: SupabaseService,
    private configService: ConfigService,
  ) {
    this.bucketName = this.configService.get<string>('SUPABASE_STORAGE_BUCKET') || 'stories';
  }

  private generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    return `${timestamp}-${random}.${extension}`;
  }

  async uploadStoryFile(file: Express.Multer.File) {
    const fileName = this.generateFileName(file.originalname);
    const filePath = `stories/${fileName}`;

    // Upload to Supabase Storage
    const uploadResult = await this.supabaseService.uploadFile(
      this.bucketName,
      filePath,
      file.buffer,
      file.mimetype,
    );

    // Get public URL
    const publicUrl = this.supabaseService.getPublicUrl(this.bucketName, filePath);

    return {
      url: publicUrl,
      path: filePath,
      fileName: fileName,
      size: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname,
    };
  }
}

