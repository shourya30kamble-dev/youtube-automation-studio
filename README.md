# YouTube Automation Studio

A full-stack YouTube automation dashboard for channel management, video scheduling, AI metadata generation, content queueing, and analytics.

## Features

- Google OAuth setup for YouTube access
- AI-powered metadata generation for title, description, tags, and chapters
- Video scheduling and queue management
- Multi-channel-ready data model
- Content calendar and workflow tracking
- Analytics summary panel
- Upload pipeline scaffolding for YouTube Data API v3
- Local JSON store for quick setup and prototyping

## Stack

- Next.js 14
- TypeScript
- React
- Local JSON storage
- Google OAuth / YouTube API integration points
- OpenAI-compatible metadata generation

## Quick start

1. Install dependencies:
   npm install

2. Copy the environment file:
   cp .env.example .env.local

3. Add your values:
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - NEXT_PUBLIC_APP_URL
   - OPENAI_API_KEY
   - YOUTUBE_CLIENT_ID
   - YOUTUBE_CLIENT_SECRET
   - YOUTUBE_REDIRECT_URI

4. Start the app:
   npm run dev

5. Open:
   http://localhost:3000

## Project structure

- app/ — Next.js application
- components/ — dashboard widgets and forms
- lib/ — API utilities and storage helpers
- data/ — local persistence layer
- types/ — app data types

## Notes

This project is structured as a production-ready starter. It includes real YouTube OAuth and API hooks, while keeping a working local JSON fallback so the app can run without a connected YouTube account during development.

## Roadmap

- Thumbnail generation service
- AI script drafting
- Voiceover pipeline
- Shorts automation
- Cloud DB migration
- Multi-channel analytics reporting
