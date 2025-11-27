# GyaanVriksh Backend API

NestJS backend for GyaanVriksh - The Tree of Family Wisdom

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Set up Prisma:
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations (after setting up Supabase)
npm run prisma:migrate
```

4. Start the development server:
```bash
npm run start:dev
```

## API Documentation

Once the server is running, visit:
- API Docs: http://localhost:3000/api/docs
- API Base: http://localhost:3000/api

## Database Schema

The Prisma schema includes:
- Users
- Families
- Family Members (Elders)
- Stories (with audio/video metadata)
- Lessons (AI-generated)
- Knowledge Nodes (for AI mapping)
- Family Tree Relations

## Endpoints

### Stories
- `POST /api/stories` - Create a story
- `GET /api/stories` - Get all stories
- `GET /api/stories/:id` - Get story by ID
- `PATCH /api/stories/:id` - Update story
- `DELETE /api/stories/:id` - Delete story

### Upload
- `POST /api/upload/story` - Upload story media file

### Families
- `GET /api/families` - Get all families

### Lessons
- `GET /api/lessons` - Get all lessons

## Environment Variables

See `.env.example` for required environment variables.


