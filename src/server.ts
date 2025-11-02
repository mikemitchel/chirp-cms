import express from 'express'
import { getPayload } from 'payload'
import config from '@payload-config'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const start = async () => {
  const payload = await getPayload({ config })

  payload.logger.info(`✅ Payload CMS initialized successfully!`)
  payload.logger.info(`📦 Database: SQLite`)
  payload.logger.info(`📚 Collections: ${payload.config.collections.length} configured`)

  // REST API endpoints using Payload Local API
  app.get('/api/articles', async (req, res) => {
    try {
      const articles = await payload.find({
        collection: 'articles',
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      })
      res.json(articles)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  })

  app.get('/api/articles/:id', async (req, res) => {
    try {
      const article = await payload.findByID({
        collection: 'articles',
        id: req.params.id,
      })
      res.json(article)
    } catch (error) {
      res.status(404).json({ error: 'Article not found' })
    }
  })

  app.get('/api/events', async (req, res) => {
    try {
      const events = await payload.find({
        collection: 'events',
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      })
      res.json(events)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  })

  app.get('/api/events/:id', async (req, res) => {
    try {
      const event = await payload.findByID({
        collection: 'events',
        id: req.params.id,
      })
      res.json(event)
    } catch (error) {
      res.status(404).json({ error: 'Event not found' })
    }
  })

  app.get('/api/djs', async (req, res) => {
    try {
      const djs = await payload.find({
        collection: 'listeners',
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      })
      res.json(djs)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  })

  app.get('/api/pages', async (req, res) => {
    try {
      const pages = await payload.find({
        collection: 'pages',
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      })
      res.json(pages)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  })

  app.get('/api/podcasts', async (req, res) => {
    try {
      const podcasts = await payload.find({
        collection: 'podcasts',
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      })
      res.json(podcasts)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  })

  app.get('/api/announcements', async (req, res) => {
    try {
      const announcements = await payload.find({
        collection: 'announcements',
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      })
      res.json(announcements)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  })

  app.get('/api/media', async (req, res) => {
    try {
      const media = await payload.find({
        collection: 'media',
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      })
      res.json(media)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  })

  app.get('/api/venues', async (req, res) => {
    try {
      const venues = await payload.find({
        collection: 'venues',
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      })
      res.json(venues)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  })

  // Root and admin routes
  app.get('/', (_req, res) => {
    res.json({
      message: 'CHIRP Radio CMS API',
      version: '1.0.0',
      endpoints: {
        articles: '/api/articles',
        events: '/api/events',
        djs: '/api/djs',
        pages: '/api/pages',
        podcasts: '/api/podcasts',
        announcements: '/api/announcements',
        media: '/api/media',
        venues: '/api/venues'
      },
      note: 'Payload v3 admin UI requires Next.js integration. Use REST API endpoints or Payload Local API.'
    })
  })

  app.get('/admin', (_req, res) => {
    res.send(`
      <html>
        <head><title>CHIRP CMS</title></head>
        <body style="font-family: system-ui; max-width: 800px; margin: 50px auto; padding: 20px;">
          <h1>CHIRP Radio CMS</h1>
          <p>Payload CMS v3 requires Next.js for the admin UI.</p>
          <h2>Available REST API Endpoints:</h2>
          <ul>
            <li><a href="/api/articles">/api/articles</a></li>
            <li><a href="/api/events">/api/events</a></li>
            <li><a href="/api/djs">/api/djs</a></li>
            <li><a href="/api/pages">/api/pages</a></li>
            <li><a href="/api/podcasts">/api/podcasts</a></li>
            <li><a href="/api/announcements">/api/announcements</a></li>
            <li><a href="/api/media">/api/media</a></li>
            <li><a href="/api/venues">/api/venues</a></li>
          </ul>
          <p>To add data, run: <code>npm run seed</code></p>
        </body>
      </html>
    `)
  })

  app.listen(PORT, () => {
    payload.logger.info(`🚀 REST API server listening on http://localhost:${PORT}`)
    payload.logger.info(`📡 Available endpoints:`)
    payload.logger.info(`   GET /api/articles`)
    payload.logger.info(`   GET /api/articles/:id`)
    payload.logger.info(`   GET /api/events`)
    payload.logger.info(`   GET /api/events/:id`)
    payload.logger.info(`   GET /api/djs`)
    payload.logger.info(`   GET /api/pages`)
    payload.logger.info(`   GET /api/podcasts`)
    payload.logger.info(`   GET /api/announcements`)
    payload.logger.info(`   GET /api/media`)
    payload.logger.info(`   GET /api/venues`)
  })
}

start()
