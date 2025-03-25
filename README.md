# Smart Poultry Farming System

A modern microservices-based system for managing poultry farming operations efficiently.

## Overview

This system helps poultry farmers monitor and manage their birds, track environmental conditions, manage feeding schedules, and monitor bird health in real-time.

## Features

- Bird Management (tracking, monitoring)
- Environmental Monitoring
- Feed Management
- Health Monitoring
- Real-time Data Collection

## Tech Stack

- Node.js & Express.js
- SQLite Database
- Docker Support
- Kubernetes Ready
- Jenkins Pipeline

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm or yarn
- Docker (optional)

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/DodyRUBAGUMYA/24RP15338-SMART-POULTRY-FARMING.git
   cd 24RP15338-SMART-POULTRY-FARMING
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Docker Setup

1. Build the container:
   ```bash
   docker build -t smart-poultry-farm .
   ```

2. Run with Docker Compose:
   ```bash
   docker-compose up
   ```

## API Endpoints

### Birds Management

- `GET /api/birds` - Get all birds
- `GET /api/birds/:id` - Get bird by ID
- `POST /api/birds` - Add new bird
- `PUT /api/birds/:id` - Update bird details

### Environment Monitoring

- `GET /api/environment` - Get environmental data
- `POST /api/environment` - Record new environmental data

### Feed Management

- `GET /api/feed` - Get feeding records
- `POST /api/feed` - Add new feeding record

### Health Monitoring

- `GET /api/health` - Get health records
- `POST /api/health` - Add new health record

## Testing

Run the test suite:
```bash
npm test
```

## Deployment

The system can be deployed using:
- Docker containers
- Kubernetes cluster (configuration in k8s folder)
- Jenkins pipeline (configuration in jenkins folder)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
