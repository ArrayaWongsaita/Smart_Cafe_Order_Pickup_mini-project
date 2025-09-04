# Cafe Customer Client

A modern customer-facing web application for cafe ordering system built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Authentication**: Sign up, sign in, and session management with NextAuth.js
- **Menu System**: Browse cafe menu with detailed product information
- **Shopping Cart**: Add items to cart with quantity management
- **Order Management**: Place orders and track status
- **Real-time Updates**: Socket.io integration for live order updates
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Testing**: Unit tests with Vitest and React Testing Library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) (recommended package manager)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd client-customer
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and configure the following environment variables:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000

# Authentication Secret (generate a random 32+ character string)
AUTH_SECRET=your_super_secret_auth_key_here_minimum_32_chars
```

#### Environment Variables Explanation:

- `NEXT_PUBLIC_API_BASE_URL`: The base URL for your backend API server
- `NEXT_PUBLIC_SOCKET_URL`: The URL for Socket.io real-time communication
- `AUTH_SECRET`: A secret key for NextAuth.js session encryption (must be at least 32 characters)

### 4. Generate Auth Secret

To generate a secure AUTH_SECRET, you can use:

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🔧 Available Scripts

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Build

Build the application for production:

```bash
pnpm build
```

### Production

Start the production server (after building):

```bash
pnpm start
```

### Testing

Run unit tests:

```bash
# Run tests once
pnpm test:run

# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui
```

### Linting

Check code quality:

```bash
pnpm lint
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (home)/            # Home page
│   ├── (public)/          # Public pages (menu, order)
│   └── api/               # API routes
├── features/              # Feature-based modules
│   ├── auth/              # Authentication logic
│   ├── cart/              # Shopping cart functionality
│   ├── menu/              # Menu management
│   ├── order/             # Order processing
│   └── user/              # User management
├── infrastructure/        # External service integrations
├── shared/               # Shared utilities and components
│   ├── components/        # Reusable UI components
│   ├── config/           # Configuration files
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   ├── schema/           # Validation schemas
│   └── types/            # TypeScript type definitions
```

## 🧪 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Testing**: Vitest, React Testing Library
- **Icons**: Lucide React

## 🔌 Backend Integration

This client application requires a backend API server running. Make sure to:

1. Start your backend API server on the configured port (default: 8000)
2. Ensure the backend supports the following endpoints:
   - Authentication endpoints
   - Menu management
   - Order processing
   - Socket.io for real-time updates

## 🚀 Deployment

### Environment Variables for Production

When deploying to production, ensure you set the environment variables:

- `NEXT_PUBLIC_API_BASE_URL`: Your production API URL
- `NEXT_PUBLIC_SOCKET_URL`: Your production Socket.io server URL
- `AUTH_SECRET`: A secure random string (different from development)

### Vercel Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

## 📝 Development Notes

- The application uses feature-based architecture for better code organization
- Environment validation is handled by Zod schemas
- All forms use React Hook Form with Zod validation
- State management follows the single responsibility principle
- Testing covers critical user flows and business logic

## 🐛 Troubleshooting

### Common Issues

1. **Module not found errors**: Run `pnpm install` to ensure all dependencies are installed
2. **Environment variable issues**: Check that `.env.local` exists and contains all required variables
3. **API connection errors**: Verify that the backend server is running and accessible
4. **Build errors**: Run `pnpm lint` to check for code quality issues

### Getting Help

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Consult [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under the MIT License.
