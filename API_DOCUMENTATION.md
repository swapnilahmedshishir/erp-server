# API Documentation (Backend)

## Base URL

```
https://erp-server-dxkg.onrender.com/api/v1
```

> Replace with your live backend URL after deployment.

---

# Authentication

All protected endpoints require a valid JWT Access Token.

```
Authorization: Bearer <access_token>
```

---

# Authentication Module

## Login

Authenticate a user and return an access token.

### Endpoint

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful.",
  "data": {
    "accessToken": "jwt_access_token"
  }
}
```

---

# Product Module

## Get All Products

### Endpoint

```http
GET /products
```

### Query Parameters

| Parameter  | Description     |
| ---------- | --------------- |
| page       | Page number     |
| limit      | Number of items |
| searchTerm | Search product  |
| sortBy     | Sort field      |
| sortOrder  | asc / desc      |

### Example

```http
GET /products?page=1&limit=10&searchTerm=laptop
```

---

## Get Product By ID

### Endpoint

```http
GET /products/:id
```

---

## Create Product

### Endpoint

```http
POST /products
```

### Authorization

ADMIN, MANAGER

### Content-Type

```
multipart/form-data
```

### Form Data

| Field         | Type   |
| ------------- | ------ |
| name          | string |
| sku           | string |
| category      | string |
| purchasePrice | number |
| sellingPrice  | number |
| stock         | number |
| image         | file   |

### Success Response

```json
{
  "success": true,
  "message": "Product created successfully."
}
```

---

## Update Product

### Endpoint

```http
PATCH /products/:id
```

### Authorization

ADMIN, MANAGER

### Content-Type

```
multipart/form-data
```

---

## Delete Product

### Endpoint

```http
DELETE /products/:id
```

### Authorization

ADMIN

---

# Sales Module

## Create Sale

### Endpoint

```http
POST /sales
```

### Authorization

ADMIN, MANAGER, EMPLOYEE

### Request Body

```json
{
  "products": [
    {
      "product": "PRODUCT_ID",
      "quantity": 2
    },
    {
      "product": "PRODUCT_ID",
      "quantity": 1
    }
  ]
}
```

### Backend Business Logic

- Validate Product Availability
- Validate Stock Quantity
- Reduce Product Stock
- Calculate Grand Total
- Save Sale History

### Success Response

```json
{
  "success": true,
  "message": "Sale created successfully.",
  "data": {
    "_id": "...",
    "grandTotal": 1500
  }
}
```

---

## Get All Sales

### Endpoint

```http
GET /sales
```

### Query Parameters

| Parameter | Description    |
| --------- | -------------- |
| page      | Page Number    |
| limit     | Items per page |

---

## Get Sale Details

### Endpoint

```http
GET /sales/:id
```

---

# Dashboard Module

## Dashboard Statistics

### Endpoint

```http
GET /dashboard
```

### Authorization

ADMIN, MANAGER, EMPLOYEE

### Response

```json
{
  "success": true,
  "data": {
    "totalProducts": 50,
    "totalSales": 30,
    "totalRevenue": 125000,
    "lowStockProducts": [
      {
        "_id": "...",
        "name": "Keyboard",
        "stock": 3
      }
    ]
  }
}
```

---

# User Module

## Create User

```http
POST /users
```

Authorization:

```
ADMIN
```

---

## Get User

```http
GET /users/:id
```

Authorization:

```
ADMIN
```

---

## Update User

```http
PATCH /users/:id
```

Authorization:

```
ADMIN
```

---

## Delete User

```http
DELETE /users/:id
```

Authorization:

```
ADMIN
```

---

# Roles & Permissions

| Module          | Admin | Manager | Employee |
| --------------- | :---: | :-----: | :------: |
| Dashboard       |  ✅   |   ✅    |    ✅    |
| View Products   |  ✅   |   ✅    |    ✅    |
| Create Product  |  ✅   |   ✅    |    ❌    |
| Update Product  |  ✅   |   ✅    |    ❌    |
| Delete Product  |  ✅   |   ❌    |    ❌    |
| Create Sale     |  ✅   |   ✅    |    ✅    |
| View Sales      |  ✅   |   ✅    |    ❌    |
| User Management |  ✅   |   ❌    |    ❌    |

---

# Standard API Response

## Success

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {}
}
```

---

## Validation Error

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation Error",
  "errorDetails": [
    {
      "path": "email",
      "message": "Email is required."
    }
  ]
}
```

---

## Unauthorized

```json
{
  "success": false,
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## Forbidden

```json
{
  "success": false,
  "statusCode": 403,
  "message": "Forbidden"
}
```

---

## Not Found

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Resource not found."
}
```

---

# Default Test Accounts

## Admin

```
Email: admin@gmail.com
Password: 123456
```

## Manager

```
Email: manager@gmail.com
Password: 123456
```

## Employee

```
Email: employer@gmail.com
Password: 123456
```

---

# Notes

- All protected APIs require a valid JWT Access Token.
- Product image upload uses `multipart/form-data`.
- Search, Pagination, Sorting, and Filtering are supported where applicable.
- Stock is automatically reduced after a successful sale.
- Selling unavailable or insufficient stock is prevented through backend validation.
- API responses follow a consistent structure with appropriate HTTP status codes.
