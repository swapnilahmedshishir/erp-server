# Mini ERP – Inventory & Sales Management System (Backend)

A secure and scalable backend API for a **Mini ERP (Inventory & Sales Management System)** built with **Node.js, Express.js, TypeScript, MongoDB, and JWT Authentication**.

This project was developed as part of a **Full Stack (MERN) Technical Assessment** and follows a modular, feature-based architecture with role-based access control.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Zod Validation
- Multer (Image Upload)
- Cloudinary (Optional)
- bcrypt
- Express Middleware

---

# ✨ Features

## Authentication

- JWT Authentication
- Secure Login
- Protected Routes

## Role Based Authorization

Three different user roles are implemented:

- **Admin**
  - Full Access

- **Manager**
  - Manage Products
  - Create Sales

- **Employee**
  - View Products
  - Create Sales

---

# 📦 Product Module

- Create Product
- Update Product
- Delete Product
- Get Product Details
- Product List
- Product Image Upload
- Search Products
- Pagination

### Product Fields

- Product Name
- SKU
- Category
- Purchase Price
- Selling Price
- Stock Quantity
- Product Image

---

# 💰 Sales Module

- Create Sale
- Multiple Product Selection
- Quantity Management
- Automatic Stock Reduction
- Prevent Insufficient Stock Sales
- Grand Total Calculation
- Sale History

---

# 📊 Dashboard Module

Provides the following statistics:

- Total Products
- Total Sales
- Total Revenue
- Low Stock Products

---

# 📁 Project Structure

# Backend (erp-server)

```
erp-server
│
├── src
│   │
│   ├── config
│   │   ├── db.ts
│   │   ├── env.ts
│   │   └── cloudinary.ts (optional)
│   │
│   ├── constants
│   │   ├── role.ts
│   │   ├── message.ts
│   │   └── http.ts
│   │
│   ├── interfaces
│   │   ├── common.interface.ts
│   │   ├── jwt.interface.ts
│   │   └── pagination.interface.ts
│   │
│   ├── middlewares
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── validateRequest.ts
│   │   ├── globalErrorHandler.ts
│   │   └── notFound.ts
│   │
│   ├── modules
│   │   │
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.route.ts
│   │   │   ├── auth.validation.ts
│   │   │   └── auth.interface.ts
│   │   │
│   │   ├── user
│   │   │   ├── user.model.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.route.ts
│   │   │   └── user.interface.ts
│   │   │
│   │   ├── product
│   │   │   ├── product.model.ts
│   │   │   ├── product.controller.ts
│   │   │   ├── product.service.ts
│   │   │   ├── product.route.ts
│   │   │   ├── product.validation.ts
│   │   │   └── product.interface.ts
│   │   │
│   │   ├── sale
│   │   │   ├── sale.model.ts
│   │   │   ├── sale.controller.ts
│   │   │   ├── sale.service.ts
│   │   │   ├── sale.route.ts
│   │   │   ├── sale.validation.ts
│   │   │   └── sale.interface.ts
│   │   │
│   │   └── dashboard
│   │       ├── dashboard.controller.ts
│   │       ├── dashboard.service.ts
│   │       └── dashboard.route.ts
│   │
│   ├── routes
│   │   └── index.ts
│   │
│   ├── types
│   │   ├── express.d.ts
│   │   └── common.ts
│   │
│   ├── utils
│   │   ├── AppError.ts
│   │   ├── catchAsync.ts
│   │   ├── sendResponse.ts
│   │   ├── jwt.ts
│   │   ├── pagination.ts
│   │   ├── queryBuilder.ts
│   │   └── uploader.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── uploads/
│
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/swapnilahmedshishir/erp-server.git
```

```bash
cd erp-server
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment Variables

Create a `.env` file in the project root.

Example:

```env
NODE_ENV=development

PORT=5001

DATABASE_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

## 4. Seed Default Users

```bash
npm run seed
```

---

## 5. Start Development Server

```bash
npm run dev
```

---

## 6. Build Project

```bash
npm run build
```

---

## 7. Start Production Server

```bash
npm start
```

---

# 🔐 Default Login Credentials

## Admin

| Field    | Value           |
| -------- | --------------- |
| Email    | admin@gmail.com |
| Password | 123456          |

---

## Manager

| Field    | Value             |
| -------- | ----------------- |
| Email    | manager@gmail.com |
| Password | 123456            |

---

## Employee

| Field    | Value              |
| -------- | ------------------ |
| Email    | employer@gmail.com |
| Password | 123456             |

---

# 🛡️ Security

- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Password Hashing (bcrypt)
- Request Validation (Zod)
- Global Error Handling
- Proper HTTP Status Codes

---

# 🧪 Available Scripts

```bash
npm run dev
```

Runs the application in development mode.

```bash
npm run build
```

Compiles the TypeScript project.

```bash
npm start
```

Runs the production build.

```bash
npm run seed
```

Seeds default users into the database.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run lint:fix
```

Automatically fixes lint issues.

```bash
npm run format
```

Formats the source code using Prettier.

---

# 📌 API Base URL

```
https://erp-server-dxkg.onrender.com/api/v1
```

---

# 📄 License

This project was developed for a technical assessment and is intended for educational and evaluation purposes.
