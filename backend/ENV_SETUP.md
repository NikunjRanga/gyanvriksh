# Environment Variables Setup

Create a `.env` file in the backend directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gyanvriksh?schema=public"

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_STORAGE_BUCKET="stories"

# Server
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL="http://localhost:5173"

# JWT (for future auth)
JWT_SECRET="your-jwt-secret-key"
```

## Getting Supabase Credentials

1. Go to https://supabase.com
2. Create a new project
3. Go to Settings > API
4. Copy the Project URL (SUPABASE_URL)
5. Copy the anon/public key (SUPABASE_ANON_KEY)
6. Copy the service_role key (SUPABASE_SERVICE_ROLE_KEY)
7. Go to Storage and create a bucket named "stories"

## Database Setup

1. In Supabase, go to Settings > Database
2. Copy the connection string (DATABASE_URL)
3. Update the password in the connection string


