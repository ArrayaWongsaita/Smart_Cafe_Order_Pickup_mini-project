# Cafe Management System - Backend Server

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A modern cafe management system built with NestJS, featuring real-time order tracking, menu management, and barista workflow optimization.

## Features

- 🛡️ **Authentication & Authorization** - JWT-based auth with role-based access control
- 📋 **Menu Management** - CRUD operations for menu items and categories
- 🛒 **Order Management** - Real-time order processing with WebSocket support
- 👨‍🍳 **Barista Dashboard** - Live order tracking and status updates
- 📊 **Pagination & Filtering** - Efficient data handling with pagination
- 📝 **API Documentation** - Auto-generated Swagger documentation
- 🧪 **Testing** - Comprehensive unit and integration tests

## Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Socket.IO for WebSocket connections
- **Authentication**: JWT with bcrypt
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Validation**: class-validator & class-transformer

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher) - `npm install -g pnpm`
- **PostgreSQL** (v13 or higher)
- **Git**

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cafe/server
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure your `.env` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cafe_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your-refresh-secret-key"
JWT_REFRESH_EXPIRES_IN="30d"

# App Configuration
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000,http://localhost:5173"
```

### 4. Database Setup

#### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE cafe_db;

# Exit PostgreSQL
\q
```

#### Generate Prisma Client

```bash
pnpm prisma generate
```

#### Run Database Migrations

```bash
# Apply all migrations
pnpm prisma migrate deploy

# Or reset database and apply migrations (development only)
pnpm reset:db
```

#### Seed Database (Optional)

```bash
pnpm seed:db
```

### 5. Build and Run

#### Development Mode

```bash
# Start in development mode with hot reload
pnpm start:dev

# Or start in watch mode
pnpm start --watch
```

#### Production Mode

```bash
# Build the application
pnpm build

# Start in production mode
pnpm start:prod
```

#### Debug Mode

```bash
pnpm start:debug
```

## API Documentation

### Swagger UI

Once the server is running, you can access the interactive API documentation:

- **Local Development**: http://localhost:3000/api/docs
- **Swagger JSON**: http://localhost:3000/api/docs-json

### Main API Endpoints

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/auth/login`       | User login          |
| POST   | `/auth/register`    | User registration   |
| POST   | `/auth/refresh`     | Refresh JWT token   |
| GET    | `/menus/categories` | Get menu categories |
| GET    | `/menus/items`      | Get menu items      |
| GET    | `/health`           | Health check        |

### WebSocket Endpoints

**Namespace**: `/order`

| Event                          | Description                    | Role     |
| ------------------------------ | ------------------------------ | -------- |
| `order:create`                 | Create new order               | Customer |
| `order:track`                  | Track order status             | Customer |
| `order:join-new-orders`        | Join barista room              | Barista  |
| `order:get-all-orders`         | Get all orders with pagination | Barista  |
| `order:update-status`          | Update order status            | Barista  |
| `order:status-update`          | Listen for status updates      | All      |
| `order:new-order-notification` | Listen for new orders          | Barista  |

## Database Management

### Prisma Commands

```bash
# Generate Prisma client
pnpm prisma generate

# Apply migrations
pnpm prisma migrate deploy

# Create new migration
pnpm prisma migrate dev --name <migration-name>

# Reset database (development only)
pnpm prisma migrate reset

# View database in Prisma Studio
pnpm prisma studio

# Format schema file
pnpm prisma format

# Validate schema
pnpm prisma validate
```

### Custom Database Commands

```bash
# Seed database with sample data
pnpm seed:db

# Reset database and seed (development only)
pnpm reset:db
```

## Testing

### Run Tests

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:cov

# E2E tests
pnpm test:e2e

# Debug tests
pnpm test:debug
```

### Test Structure

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.spec.ts
│   │   └── usecases/*.spec.ts
│   ├── order/
│   │   ├── order.gateway.spec.ts
│   │   └── usecases/*.spec.ts
│   └── health/
│       └── controller/*.spec.ts
└── test/
    └── app.e2e-spec.ts
```

## Development Tools

### Code Quality

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Fix linting issues
pnpm lint --fix
```

### Database Tools

```bash
# Open Prisma Studio (Database GUI)
pnpm prisma studio
# Access at: http://localhost:5555
```

## Project Structure

```
src/
├── modules/                 # Feature modules
│   ├── auth/               # Authentication & authorization
│   ├── health/             # Health check endpoints
│   ├── menus/              # Menu management
│   ├── order/              # Order management & WebSocket
│   └── users/              # User management
├── shared/                 # Shared utilities
│   ├── config/             # Configuration files
│   ├── decorators/         # Custom decorators
│   ├── exceptions/         # Custom exceptions
│   ├── filters/            # Exception filters
│   ├── guards/             # Auth guards
│   ├── interceptors/       # Custom interceptors
│   ├── pipes/              # Validation pipes
│   ├── prisma/             # Prisma service
│   └── types/              # Type definitions
├── app.module.ts           # Root module
└── main.ts                 # Application entry point
```

## Environment Variables

| Variable                 | Description                  | Example                                    |
| ------------------------ | ---------------------------- | ------------------------------------------ |
| `DATABASE_URL`           | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET`             | JWT signing secret           | `your-secret-key`                          |
| `JWT_EXPIRES_IN`         | JWT token expiration         | `7d`                                       |
| `JWT_REFRESH_SECRET`     | Refresh token secret         | `your-refresh-secret`                      |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration     | `30d`                                      |
| `PORT`                   | Server port                  | `3000`                                     |
| `NODE_ENV`               | Environment mode             | `development`                              |
| `CORS_ORIGIN`            | CORS allowed origins         | `http://localhost:3000`                    |

## WebSocket Usage Examples

### Customer Order Tracking

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000/order');

// Track order
socket.emit('order:track', { orderCode: 'ORD001' });

// Listen for updates
socket.on('order:status-update', (data) => {
  console.log('Order status:', data.data.status);
});
```

### Barista Dashboard

```javascript
const socket = io('http://localhost:3000/order', {
  extraHeaders: {
    authorization: 'Bearer YOUR_BARISTA_JWT_TOKEN',
  },
});

// Join barista room
socket.emit('order:join-new-orders');

// Listen for new orders
socket.on('order:new-order-notification', (order) => {
  console.log('New order:', order);
});

// Update order status
socket.emit('order:update-status', {
  orderId: 'order-uuid',
  status: 'READY',
});
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**

   ```bash
   # Check if PostgreSQL is running
   sudo service postgresql status

   # Verify DATABASE_URL in .env
   # Ensure database exists
   ```

2. **Prisma Migration Issues**

   ```bash
   # Reset migrations (development only)
   pnpm prisma migrate reset

   # Generate client after schema changes
   pnpm prisma generate
   ```

3. **Port Already in Use**

   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9

   # Or change PORT in .env
   ```

4. **WebSocket Connection Issues**
   - Check CORS configuration
   - Verify JWT token format
   - Ensure proper namespace (`/order`)

### Debugging

```bash
# Enable debug mode
DEBUG=* pnpm start:dev

# View application logs
pnpm start:dev --verbose

# Database query debugging
# Add to .env: DATABASE_URL with ?debug=true
```

## Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets
- [ ] Configure proper CORS origins
- [ ] Set up database backup
- [ ] Configure reverse proxy (nginx)
- [ ] Set up SSL certificates
- [ ] Configure monitoring

### Build for Production

```bash
# Install dependencies
pnpm install --frozen-lockfile

# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate deploy

# Build application
pnpm build

# Start production server
pnpm start:prod
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
