# Phase 4 Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file (see `ENV_SETUP.md` for details):
```bash
# Copy the example and fill in your values
cp ENV_SETUP.md .env
# Edit .env with your Supabase credentials
```

### 3. Set Up Supabase

#### Create Supabase Project
1. Go to https://supabase.com and create a new project
2. Wait for the database to be provisioned

#### Get Credentials
1. Go to Settings > API
2. Copy:
   - Project URL → `SUPABASE_URL`
   - anon/public key → `SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

#### Create Storage Bucket
1. Go to Storage in Supabase dashboard
2. Create a new bucket named `stories`
3. Make it public (or configure RLS policies)

#### Get Database Connection String
1. Go to Settings > Database
2. Copy the connection string
3. Replace `[YOUR-PASSWORD]` with your database password
4. Use this as `DATABASE_URL`

### 4. Initialize Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate

# (Optional) Open Prisma Studio to view data
npm run prisma:studio
```

### 5. Start the Server
```bash
npm run start:dev
```

The API will be available at:
- **API**: http://localhost:3000/api
- **Swagger Docs**: http://localhost:3000/api/docs

## API Endpoints

### Stories
- `POST /api/stories` - Create a story
- `GET /api/stories` - Get all stories (with optional filters: ?userId=, ?familyId=, ?tags=)
- `GET /api/stories/:id` - Get story by ID
- `PATCH /api/stories/:id` - Update story
- `DELETE /api/stories/:id` - Delete story

### Upload
- `POST /api/upload/story` - Upload audio/video file (multipart/form-data)

### Families
- `GET /api/families` - Get all families

### Lessons
- `GET /api/lessons` - Get all lessons

## Testing the API

### Using Swagger UI
1. Visit http://localhost:3000/api/docs
2. Try the endpoints directly from the browser

### Using cURL

#### Upload a file:
```bash
curl -X POST http://localhost:3000/api/upload/story \
  -F "file=@/path/to/your/audio.mp3"
```

#### Create a story:
```bash
curl -X POST http://localhost:3000/api/stories \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Grandfather's Story",
    "elderName": "Grandfather Ram",
    "mediaType": "audio",
    "mediaUrl": "https://your-supabase-url/stories/file.mp3",
    "description": "A story about..."
  }'
```

## Next Steps

1. **Connect Frontend**: Update frontend to call these APIs
2. **Add Authentication**: Implement Phase 2 (Auth) when ready
3. **Add AI Processing**: Implement Phase 5 (AI Transcription)
4. **Add Knowledge Mapping**: Implement Phase 6 (AI Knowledge Mapper)


