import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS - Always allow Netlify and localhost
  const allowedOrigins = [
    'http://localhost:5173',
    'https://gyanvriksh.netlify.app',
  ];
  
  // Add any additional origins from environment variable
  if (process.env.FRONTEND_URL) {
    const envUrls = process.env.FRONTEND_URL.split(',').map(url => url.trim());
    envUrls.forEach(url => {
      if (url && !allowedOrigins.includes(url)) {
        allowedOrigins.push(url);
      }
    });
  }
  
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Type'],
  });
  
  console.log('🌐 CORS enabled for origins:', allowedOrigins);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('GyaanVriksh API')
    .setDescription('API for GyaanVriksh - The Tree of Family Wisdom')
    .setVersion('1.0')
    .addTag('stories', 'Story management endpoints')
    .addTag('families', 'Family management endpoints')
    .addTag('lessons', 'Lesson management endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on port: ${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  console.log(`💚 Health Check: http://localhost:${port}/api/health`);
  console.log(`\n⚠️  Make sure you have created the "stories" bucket in Supabase Storage!`);
}

bootstrap();


