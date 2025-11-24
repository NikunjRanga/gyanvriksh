import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  private supabaseAdmin: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
    this.supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  getAdminClient(): SupabaseClient {
    return this.supabaseAdmin;
  }

  async uploadFile(bucket: string, path: string, file: Buffer, contentType: string) {
    const { data, error } = await this.supabaseAdmin.storage
      .from(bucket)
      .upload(path, file, {
        contentType,
        upsert: false,
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    return data;
  }

  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  async deleteFile(bucket: string, path: string) {
    const { error } = await this.supabaseAdmin.storage.from(bucket).remove([path]);
    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
}

