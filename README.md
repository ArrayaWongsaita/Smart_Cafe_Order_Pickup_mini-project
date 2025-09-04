# Smart Cafe Order & Pickup System

ระบบสั่งซื้อและรับสินค้าออนไลน์สำหรับร้านกาแฟ พัฒนาด้วย Next.js และ NestJS พร้อมระบบ Real-time notifications

## 📖 ภาพรวมของโปรเจ็ค

ระบบนี้ประกอบด้วย 3 ส่วนหลัก:

- **Client Customer**: แอปพลิเคชันสำหรับลูกค้าในการสั่งซื้อสินค้า
- **Client Admin**: แอปพลิเคชันสำหรับพนักงานในการจัดการคำสั่งซื้อ
- **Server**: API Backend ที่พัฒนาด้วย NestJS พร้อม WebSocket สำหรับ Real-time

## 🏗️ สถาปัตยกรรมระบบ

```
┌─────────────────┐    ┌─────────────────┐
│   Customer App  │    │    Admin App    │
│   (Port 3000)   │    │   (Port 3001)   │
│   Next.js       │    │   Next.js       │
└─────────┬───────┘    └─────────┬───────┘
          │                      │
          └──────────┬───────────┘
                     │
                     ▼
          ┌─────────────────┐
          │   NestJS API    │
          │   (Port 3000)   │
          │   + WebSocket   │
          └─────────┬───────┘
                    │
                    ▼
          ┌─────────────────┐
          │   PostgreSQL    │
          │   Database      │
          └─────────────────┘
```

## 🚀 การเริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

- Node.js (v18 หรือสูงกว่า)
- pnpm (package manager)
- PostgreSQL Database
- Git

### 1. Clone Repository

```bash
git clone <repository-url>
cd cafe
```

### 2. ติดตั้ง Dependencies

```bash
# ติดตั้ง dependencies สำหรับทุก project
pnpm install -r
```

### 3. ตั้งค่า Database

```bash
# เริ่มต้น PostgreSQL และสร้าง database
createdb cafe_db

# ไปที่ server directory
cd server

# สร้างไฟล์ .env จาก template
cp .env.example .env

# แก้ไข .env ให้เชื่อมต่อกับ database ของคุณ
# DATABASE_URL="postgresql://username:password@localhost:5432/cafe_db"
```

### 4. Setup Database Schema

```bash
# อยู่ใน server directory
npx prisma migrate dev
npx prisma generate

# เพิ่มข้อมูลตัวอย่าง (optional)
npm run seed:db
```

### 5. เริ่มต้นใช้งาน

เปิด terminal แยกกัน 3 หน้าต่าง:

#### Terminal 1: เริ่ม Server

```bash
cd server
npm run start:dev
```

Server จะทำงานที่ `http://localhost:3000`

#### Terminal 2: เริ่ม Customer App

```bash
cd client-customer
npm run dev
```

Customer App จะทำงานที่ `http://localhost:3000`

#### Terminal 3: เริ่ม Admin App

```bash
cd client-admin
npm run dev
```

Admin App จะทำงานที่ `http://localhost:3001`

## 📁 โครงสร้างโปรเจ็ค

### `/server` - NestJS Backend API

**เทคโนโลยีหลัก:**

- NestJS Framework
- Prisma ORM
- PostgreSQL Database
- Socket.IO (WebSocket)
- JWT Authentication
- Swagger API Documentation

**Features:**

- 🔐 Authentication & Authorization (JWT)
- 👥 User Management (Customer, Barista, Admin roles)
- 🍽️ Menu Management
- 📋 Order Management
- 🔄 Real-time Order Updates
- 📚 API Documentation

**การใช้งาน:**

```bash
cd server

# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Database operations
npm run reset:db      # Reset และ seed database
npm run seed:db       # เพิ่มข้อมูลตัวอย่าง

# Testing
npm run test
npm run test:e2e
```

### `/client-customer` - Customer Web Application

**เทคโนโลยีหลัก:**

- Next.js 15 (App Router)
- React 19
- NextAuth.js (Authentication)
- Socket.IO Client
- Tailwind CSS + shadcn/ui
- Zustand (State Management)

**Features:**

- 🔐 User Authentication
- 🍽️ Browse Menu
- 🛒 Shopping Cart
- 📋 Place Orders
- 🔔 Real-time Order Status
- 📱 Responsive Design

**การใช้งาน:**

```bash
cd client-customer

# Development
npm run dev           # รันที่ port 3000

# Production
npm run build
npm run start

# Testing
npm run test
npm run test:ui       # Vitest UI
```

### `/client-admin` - Admin/Staff Web Application

**เทคโนโลยีหลัก:**

- Next.js 15 (App Router)
- React 19
- NextAuth.js (Authentication)
- Socket.IO Client
- Tailwind CSS + shadcn/ui
- Zustand (State Management)

**Features:**

- 🔐 Staff Authentication
- 📋 Order Management
- 👥 User Management
- 🍽️ Menu Management
- 🔔 Real-time Notifications
- 📊 Dashboard

**การใช้งาน:**

```bash
cd client-admin

# Development
npm run dev           # รันที่ port 3001

# Production
npm run build
npm run start

# Testing
npm run test
npm run test:ui       # Vitest UI
```

## 🔧 การกำหนดค่าสำคัญ

### Environment Variables

#### Server (.env)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/cafe_db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRES_IN="30d"
PORT=3000
NODE_ENV=development
CORS_ORIGIN="http://localhost:3000,http://localhost:3001"
```

#### Client Apps (.env.local)

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 👥 User Roles

- **CUSTOMER**: ลูกค้าทั่วไป - สั่งซื้อสินค้า, ดูสถานะคำสั่งซื้อ
- **BARISTA**: พนักงานทำเครื่องดื่ม - จัดการคำสั่งซื้อ, อัพเดทสถานะ
- **ADMIN**: ผู้ดูแลระบบ - จัดการเมนู, ผู้ใช้, และระบบทั้งหมด

## 🔄 Order Flow

1. **Customer** สั่งซื้อผ่าน Customer App
2. **Barista** ได้รับแจ้งเตือนผ่าน Admin App
3. **Barista** อัพเดทสถานะ: PREPARING → READY
4. **Customer** ได้รับแจ้งเตือน Real-time
5. **Customer** มารับสินค้า
6. **Barista** อัพเดทสถานะ: COMPLETED

## 🧪 Testing

```bash
# Server tests
cd server
npm run test
npm run test:e2e

# Client tests
cd client-customer  # หรือ client-admin
npm run test
npm run test:ui
```

## 📚 API Documentation

เมื่อ server ทำงานแล้ว สามารถดู API Documentation ได้ที่:

- Swagger UI: `http://localhost:3000/api`

## 🤝 การพัฒนา

### Git Workflow

1. Fork repository
2. สร้าง feature branch
3. Commit changes
4. Submit Pull Request

### Code Style

- ใช้ ESLint และ Prettier
- ตั้งชื่อ branch: `feature/description` หรือ `fix/description`
- Commit message: ใช้ Conventional Commits

## 📄 License

This project is licensed under the MIT License.

## 🆘 การแก้ไขปัญหาเบื้องต้น

### ปัญหาที่พบบ่อย

1. **Database connection error**

   - ตรวจสอบ PostgreSQL service
   - ตรวจสอบ DATABASE_URL ใน .env

2. **Port already in use**

   - ปิด process ที่ใช้ port อยู่
   - เปลี่ยน port ใน package.json

3. **CORS errors**
   - ตรวจสอบ CORS_ORIGIN ใน server/.env
   - ตรวจสอบ NEXT_PUBLIC_API_URL ใน client
