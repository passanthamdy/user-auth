# Full-Stack Authentication App

This is a full-stack authentication application built using **NestJS** (backend) with **MongoDB** and a **Vite React** (frontend) app. The app supports user registration, login, protected routes, JWT authentication, and custom error handling.

## 🛠 Technologies Used

### Backend (NestJS)
- **NestJS** - Backend framework for scalable applications.
- **MongoDB** - NoSQL database for user storage.
- **Mongoose** - ODM for MongoDB.
- **JWT** - Authentication with access & refresh tokens.
- **ConfigModule** - Environment variable management.

### Frontend (Vite React)
- **React** - Frontend library.
- **Redux Toolkit** - State management.
- **React Hook Form** - Form validation.
- **React Bootstrap** - UI components.
- **Vite** - Fast frontend tooling.

---

## 🚀 Installation & Setup

### Backend (NestJS)
1. **Clone the repository** and navigate to the backend folder:
    ```sh
    git clone <repository-url>
    cd backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file** in the root directory:
    ```ini
    PORT=7000
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    JWT_EXPIRES_IN=15m
    JWT_REFRESH_EXPIRES_IN=7d
    MONGODB_URI= your db link
    FRONTEND_URL=http://localhost:5173
    ```

4. **Run the backend server**:
    ```sh
    npm run start:dev
    ```

---

### Frontend (Vite React)
1. **Navigate to the frontend folder**:
    ```sh
    cd frontend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file** in the root directory:
    ```ini
    VITE_BASE_URL=http://localhost:7000 or your backend url 
    ```

4. **Run the frontend application**:
    ```sh
    npm run dev
    ```

---

## 🔗 API Endpoints (Backend)

| Method | Endpoint                   | Description                          |
|--------|----------------------------|--------------------------------------|
| **POST**   | `/users/actions/signup`  | Register a new user                 |
| **POST**   | `/users/actions/login`     | Login and receive tokens            |
| **POST**   | `/users/actions/refresh-token` | Refresh access token                |
| **GET**    | `/users/actions/me`        | Get the authenticated user (protected) |

---

## 📦 Postman Collection

To test the backend API, import the provided Postman collection:

1. Open Postman.
2. Click on **"Import"**.
3. Choose the file `UserAuth.postman_collection.json`.
4. Click **"Import"**.

The collection includes all endpoints with example requests and responses.
