import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { StoriesModule } from './stories/stories.module';
import { FamiliesModule } from './families/families.module';
import { LessonsModule } from './lessons/lessons.module';
import { UploadModule } from './upload/upload.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    SupabaseModule,
    StoriesModule,
    FamiliesModule,
    LessonsModule,
    UploadModule,
  ],
})
export class AppModule {}

