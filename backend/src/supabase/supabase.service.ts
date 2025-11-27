import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { fetch } from 'undici';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  private supabaseAdmin: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration. Please check your .env file.');
    }

    // Validate URL format
    if (!supabaseUrl.startsWith('https://')) {
      throw new Error('SUPABASE_URL must start with https://');
    }

    try {
      // Configure for Node.js environment with undici fetch
      this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
        global: {
          fetch: fetch as any,
        },
      });
      this.supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false },
        global: {
          fetch: fetch as any,
        },
      });
      console.log('Supabase clients initialized successfully');
      console.log('Supabase URL:', supabaseUrl);
    } catch (error) {
      console.error('Failed to initialize Supabase clients:', error);
      throw new Error(`Failed to initialize Supabase: ${error.message}`);
    }
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  getAdminClient(): SupabaseClient {
    return this.supabaseAdmin;
  }

  async uploadFile(bucket: string, path: string, file: Buffer, contentType: string) {
    try {
      const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
      console.log(`Upload attempt - Bucket: ${bucket}, Path: ${path}, Size: ${file.length} bytes`);
      console.log(`Supabase URL: ${supabaseUrl}`);
      console.log(`Content Type: ${contentType}`);
      
      // Try to upload directly
      const { data, error } = await this.supabaseAdmin.storage
        .from(bucket)
        .upload(path, file, {
          contentType,
          upsert: false,
        });

      if (error) {
        console.error('Supabase Storage Error Details:', {
          message: error.message,
          name: error.name,
          error: JSON.stringify(error),
        });

        // Handle specific error cases
        if (error.message?.includes('Bucket') || error.message?.includes('not found') || error.message?.includes('404')) {
          throw new Error(
            `Storage bucket "${bucket}" does not exist. Please create it in Supabase Dashboard → Storage → New bucket.`
          );
        }
        
        // Check for network/fetch errors
        const errorMsg = error.message?.toLowerCase() || '';
        if (errorMsg.includes('fetch') || errorMsg.includes('network') || errorMsg.includes('econnrefused') || errorMsg.includes('enotfound')) {
          throw new Error(
            `Cannot connect to Supabase Storage at ${supabaseUrl}. Please verify:\n1. SUPABASE_URL is correct (currently: ${supabaseUrl})\n2. SUPABASE_SERVICE_ROLE_KEY is valid\n3. Storage bucket "${bucket}" exists\n4. Your network can reach Supabase\n\nError: ${error.message}`
          );
        }
        
        throw new Error(`Upload failed: ${error.message || JSON.stringify(error)}`);
      }

      console.log('Upload successful:', data);
      return data;
    } catch (error) {
      console.error('Upload file error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Upload failed: ${error.message || 'Unknown error'}`);
    }
  }

  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    console.log(`Generated public URL for bucket: ${bucket}, path: ${path}`);
    console.log(`Public URL: ${data.publicUrl}`);
    return data.publicUrl;
  }

  async deleteFile(bucket: string, path: string) {
    const { error } = await this.supabaseAdmin.storage.from(bucket).remove([path]);
    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
}


