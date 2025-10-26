# CHIRP Radio CMS - Payload

Content Management System for CHIRP Radio built with Payload CMS.

## Features

- **Articles** - Blog posts and news articles with rich text, images, YouTube embeds
- **Events** - Event management with venue info, tickets, performers
- **DJs** - DJ profiles with bio, show info, contact details
- **Media** - Image upload and management with automatic resizing

## Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up MongoDB:**

   **Option A: Local MongoDB**

   ```bash
   # Install MongoDB (macOS)
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

   **Option B: MongoDB Atlas (Cloud)**
   - Create free account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Get connection string
   - Update `.env` with your connection string

3. **Configure environment variables:**

   ```bash
   # Edit .env file
   DATABASE_URI=mongodb://localhost/chirp-cms  # or your Atlas connection string
   PAYLOAD_SECRET=your-secret-key-here-change-in-production
   PORT=3000
   ```

4. **Start development server:**

   ```bash
   npm run dev
   ```

5. **Access admin panel:**
   - Open http://localhost:3000/admin
   - Create your first admin user

6. **Import existing data (optional):**
   ```bash
   npm run seed
   ```
   This will import articles, events, and DJ profiles from the JSON files.

## API Endpoints

### Articles

- `GET /api/articles` - List all articles
- `GET /api/articles/:id` - Get single article
- `GET /api/articles?where[featured][equals]=true` - Get featured articles

### Events

- `GET /api/events` - List all events
- `GET /api/events/:id` - Get single event
- `GET /api/events?where[date][greater_than_equal]=2025-01-01` - Get upcoming events

### DJs

- `GET /api/djs` - List all DJs
- `GET /api/djs/:id` - Get single DJ profile

### Media

- `GET /api/media` - List all media
- `GET /api/media/:id` - Get single media item

## Response Format

All API responses match the frontend's expected JSON structure:

**Article Example:**

```json
{
  "id": "article-001",
  "title": "Chicago Underground Music Scene",
  "slug": "chicago-underground-music-scene",
  "author": {
    "name": "Sarah Martinez",
    "id": "user-002",
    "profileImage": "https://..."
  },
  "featuredImage": "https://...",
  "excerpt": "...",
  "content": "...",
  "category": "Music Scene",
  "tags": ["chicago", "indie"],
  "publishedDate": "2024-12-01T10:00:00Z",
  "featured": true,
  "readTime": 8
}
```

## Deployment

### Build for production:

```bash
npm run build
```

### Run production server:

```bash
npm run serve
```

### Deploy to EC2 (or similar):

1. Copy project to server
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Set up environment variables
5. Run with PM2: `pm2 start dist/server.js --name chirp-cms`

## Project Structure

```
chirp-data/
├── src/
│   ├── collections/      # Content type definitions
│   │   ├── Articles.ts
│   │   ├── Events.ts
│   │   ├── DJs.ts
│   │   └── Media.ts
│   ├── seed/            # Data import scripts
│   │   └── import-data.ts
│   ├── payload.config.ts # Payload configuration
│   └── server.ts         # Express server
├── media/               # Uploaded images (git ignored)
├── .env                 # Environment variables
└── package.json
```

## Scripts

### Development

- `npm run dev` - Start development server
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check code formatting

### Production

- `npm run build` - Build for production
- `npm run start` - Run production server

### Data & Types

- `npm run seed` - Import data from JSON files
- `npm run generate:types` - Generate TypeScript types from Payload schema

## Development Workflow

### Pre-commit Checks

Git hooks are automatically set up via Husky when you run `npm install`.

Before each commit, the following checks run automatically:

- **ESLint** - Checks code quality and auto-fixes issues
- **Prettier** - Formats code consistently

This ensures consistent code quality and formatting across the team.

## Notes

- Admin panel runs at `/admin`
- REST API runs at `/api`
- GraphQL API runs at `/api/graphql`
- Images are stored in `media/` directory
- External image URLs are supported via `featuredImageUrl` fields
