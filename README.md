---

# 🎬 Movies App — Backend (NestJS)

This is the backend API for the **Movies App**, built using **NestJS** and **TypeScript**.
It provides simple authentication and movie management using a **local JSON file** (no database) and **local file uploads** for posters.

---

## 🚀 Features

### 🔐 Authentication

* Simple in-memory authentication (NO JWT, NO database)
* Hardcoded credentials (for assignment):

```
email: aman@test.com  
password: password
```

### 🎥 Movie Management

* Create new movies
* Update existing movies
* Store movies inside a local JSON file:

  ```
  data/movies.json
  ```
* Upload movie posters to the local `uploads/` directory
* Return absolute URLs for frontend display
* Each user only sees **their own movies** (userId stored with each movie)

---

## 🛠️ Tech Stack

| Technology          | Purpose                   |
| ------------------- | ------------------------- |
| **NestJS**          | Backend framework         |
| **TypeScript**      | Type safety               |
| **Multer**          | File uploads              |
| **Node FS**         | JSON file storage         |
| **Express Adapter** | Used internally by NestJS |

---

## ⚙️ Environment Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/amanofficial321/MoviesAppBE.git
cd MoviesAppBE
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file in the root

```
PORT=5000
Frontend_URL=http://localhost:3000
```

> No database config required since this project uses a JSON file.

### 4️⃣ Run the server

```bash
npm run start:dev
```

Backend runs on:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## 📁 File Storage Setup

### **Movie Data Storage**

Movies are stored in:

```
/data/movies.json
```

Example structure:

```json
[
  {
    "id": "uuid",
    "title": "Movie Title",
    "publishingYear": "2023",
    "posterPath": "/uploads/xyz.jpg",
    "userId": "1"
  }
]
```

### **Poster Uploads**

Uploaded images go into:

```
/uploads
```

These are served statically so the frontend receives full URLs.

---

## 🔒 How Authentication Works

1. User submits email + password
2. Backend compares with hardcoded credentials
3. If valid → Backend returns `userId`
4. Frontend stores this in **sessionStorage**
5. All movie operations include `userId` to associate records

No JWT, no cookies—simple and clean for assignment purposes.

---

## 📁 Folder Structure (Overview)

```
src/
 ├── auth/
 ├── movies/
 ├── main.ts
 └── app.module.ts

data/
 └── movies.json

uploads/
 └── (uploaded images)
```

---

## 📝 Notes

* CORS enabled for `http://localhost:3000`
* All images return full URLs for frontend display
* No database → JSON file read/write using Node FS

---
