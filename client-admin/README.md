# Cafe Admin Client

Admin panel application for cafe management system built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Authentication System**: Secure login/logout with NextAuth.js
- **Order Management**: View and manage cafe orders
- **Real-time Updates**: Socket.io integration for live updates
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Modern UI Components**: Built with Radix UI and Lucide React icons
- **State Management**: Zustand for efficient state handling
- **Form Validation**: React Hook Form with Zod schema validation
- **Testing**: Vitest for unit testing

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** (recommended package manager)
- **Git**

## 🛠️ Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd client-admin
```

### 2. Install Dependencies

This project uses **pnpm** as the package manager:

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and configure the following environment variables:

```bash
# Authentication Secret (minimum 32 characters)
AUTH_SECRET=your_super_secret_auth_key_here_minimum_32_characters_long

# API Base URL - Backend server endpoint
API_BASE_URL=http://localhost:8000

# Socket.io URL - Real-time communication endpoint
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000/order
```

**Required Environment Variables:**

- `AUTH_SECRET`: Secret key for NextAuth.js (minimum 32 characters)
- `API_BASE_URL`: Backend API URL
- `NEXT_PUBLIC_SOCKET_URL`: Socket.io server URL with order namespace

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server (runs on port 3001):

```bash
pnpm dev
```

The application will be available at [http://localhost:3001](http://localhost:3001)

### Production Mode

#### Build the Application

```bash
pnpm build
```

#### Start Production Server

```bash
pnpm start
```

## 🧪 Testing

### Run Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with UI
pnpm test:ui
```

## 🔧 Additional Scripts

```bash
# Lint the code
pnpm lint

# Type checking
npx tsc --noEmit
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (home)/            # Home page
│   ├── (private)/         # Protected pages
│   └── api/               # API routes
├── features/              # Feature-based modules
│   ├── auth/              # Authentication feature
│   ├── orders/            # Orders management
│   ├── transitionNavigate/# Navigation transitions
│   └── user/              # User management
├── infrastructure/        # External integrations
│   └── api/               # API clients
└── shared/                # Shared utilities
    ├── components/        # Reusable components
    ├── hooks/             # Custom hooks
    ├── lib/               # Utility libraries
    ├── schema/            # Validation schemas
    └── types/             # TypeScript types
```

## 🛡️ Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: NextAuth.js v5
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Real-time**: Socket.io Client
- **Testing**: Vitest + Testing Library
- **HTTP Client**: Axios

## 🔗 Related Services

This admin client requires a backend API server to be running. Make sure your backend service is available at the configured `NEXT_PUBLIC_API_BASE_URL`.

## 📝 Development Notes

- The application runs on port **3001** to avoid conflicts with other local services
- Hot reload is enabled during development
- The project uses feature-based architecture for better code organization
- All forms include client-side validation using Zod schemas
