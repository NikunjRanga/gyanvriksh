import { IsString, IsOptional, IsArray, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MediaType {
  AUDIO = 'audio',
  VIDEO = 'video',
}

export class CreateStoryDto {
  @ApiProperty({ description: 'Story title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Name of the storyteller/elder' })
  @IsString()
  elderName: string;

  @ApiProperty({ enum: MediaType, description: 'Type of media' })
  @IsEnum(MediaType)
  mediaType: MediaType;

  @ApiProperty({ description: 'Media file URL from Supabase Storage' })
  @IsString()
  mediaUrl: string;

  @ApiPropertyOptional({ description: 'File size in bytes' })
  @IsOptional()
  mediaSize?: number;

  @ApiPropertyOptional({ description: 'Story description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Prompt/question used' })
  @IsOptional()
  @IsString()
  prompt?: string;

  @ApiPropertyOptional({ description: 'Date of the story', default: 'now' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ description: 'Tags for categorization', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Family ID if associated with a family' })
  @IsOptional()
  @IsString()
  familyId?: string;
}

