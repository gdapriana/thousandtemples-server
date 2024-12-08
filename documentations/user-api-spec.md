# 🔐 Authentication API Specification

## Overview

Welcome to our Authentication API! This document provides a comprehensive guide to our authentication endpoints, ensuring secure user management and access control.

## 🚪 Authentication Endpoints

### 1. User Registration `POST /register`

#### Request Payload

```json
{
  "username": "string",
  "password": "string",
  "confirmPassword": "string",
  "email": "string"
}
```

#### Validation Rules 🕵️‍♀️

- **Username**

  - Must be unique
  - Contains only alphanumeric characters
  - No spaces allowed
  - Example: `john123`, `user_2024`

- **Password**

  - Minimum length: 8 characters
  - Must match `confirmPassword`

- **Email**
  - Standard email format validation

#### Response Scenarios 📬

##### Success Response (200 OK)

```json
{
  "msg": "Registration successful"
}
```

##### Error Responses (400 Bad Request)

```json
{
  "error": [
    "Password must be at least 8 characters",
    "Passwords do not match",
    "Username already in use",
    "All fields are required",
    "Invalid username format"
  ]
}
```

### 2. User Login `POST /login`

#### Request Payload

```json
{
  "username": "string",
  "password": "string"
}
```

#### Response Scenarios 🔑

##### Success Response (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

##### Error Response (401 Unauthorized)

```json
{
  "error": "Invalid username or password"
}
```

### 3. User Logout `DELETE /logout`

#### Request Headers

```http
Authorization: Bearer <token>
```

#### Response Scenarios 🚪

##### Success Response (200 OK)

```json
{
  "msg": "Logout successful"
}
```

##### Error Response (401 Unauthorized)

```json
{
  "error": "Untauthorized"
}
```
