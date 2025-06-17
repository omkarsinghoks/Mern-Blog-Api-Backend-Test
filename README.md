# MERN Stack Blogging Platform

**Author:** Omkar Singh  


---

## 1. Introduction

### 1.1 Project Overview

A full-stack blogging platform built using:

- **MongoDB** – Database
- **Express.js** – Backend API
- **React.js** – Frontend
- **Node.js** – Server

### 1.2 Features

- User authentication (Signup/Login with JWT)
- Role-based access (Admin, Author, Reader)
- Create, Read, Update, and Delete (CRUD) blog posts
- Commenting system for posts

---

## 2. Setup Instructions

### 2.1 Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Set up environment variables in `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

3. Run the server:

```bash
npm start
```

---

### 2.2 Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run the React app:

```bash
npm start
```

---

## 3. API Documentation

### 3.1 Authentication Endpoints

| Endpoint         | Method | Description                     | Access         |
|------------------|--------|---------------------------------|----------------|
| /api/auth/signup | POST   | Register a new user             | Public         |
| /api/auth/login  | POST   | Log in a user (returns JWT)     | Public         |
| /api/auth/me     | GET    | Get logged-in user details      | Private (JWT)  |

### 3.2 Blog Post Endpoints

| Endpoint         | Method | Description             | Access          |
|------------------|--------|-------------------------|-----------------|
| /api/posts       | POST   | Create a new blog post  | Author/Admin    |
| /api/posts       | GET    | Get all blog posts      | Public          |
| /api/posts/:id   | PUT    | Update a blog post      | Author/Admin    |
| /api/posts/:id   | DELETE | Delete a blog post      | Author/Admin    |

### 3.3 Comment Endpoints

| Endpoint                      | Method | Description         | Access           |
|-------------------------------|--------|---------------------|------------------|
| /api/posts/:id/comments       | POST   | Add a comment       | Logged-in users  |
| /api/comments/:id             | DELETE | Delete a comment    | Admin/Commenter  |

---

## 4. Database Schema

### 4.1 User Model

```js
{
  _id: ObjectId,
  name: String,
  email: String, // unique
  password: String, // hashed
  role: String // enum: ["admin", "author", "reader"]
}
```

### 4.2 Post Model

```js
{
  _id: ObjectId,
  title: String,
  content: String,
  author: { userId: ObjectId, name: String },
  tags: [String],
  comments: [
    {
      text: String,
      user: { userId: ObjectId, name: String },
      createdAt: Date
    }
  ]
}
```

---

## 5. Screenshots

> *(Insert screenshots of your application here)*

- Homepage – List of all blog posts  
- Login Page – User authentication  
- Dashboard – User’s posts (for authors/admins)  
- Admin Panel – Manage users/posts  

---

## 6. Postman Collection

- Import the provided `BloggingPlatform.postman_collection.json` file into Postman.
- Includes test cases for:
  - User registration and login
  - Creating and deleting posts
  - Adding and deleting comments

---

## 7. Conclusion

### 7.1 Challenges Faced

- Implementing secure JWT authentication
- Creating flexible role-based access control

### 7.2 Future Improvements

- Add user profiles with avatars and bio
- Implement post likes/dislikes
- Add pagination and search functionality

---

## GitHub Repository

[https://github.com/omkarsinghoks/MERN-Blog-Api-Backend](https://github.com/omkarsinghoks/MERN-Blog-Api-Backend)

---

**Submitted By:** Omkar Singh
