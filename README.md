## 🧰 Express + Supabase Backend Starter Kit

A clean, modular, and ready-to-use backend starter kit built with **Express.js** and integrated with **Supabase** (PostgreSQL + Auth + Storage). Designed to kickstart your next backend project with scalability and developer experience in mind.

### ✨ Features

* ⚙️ Express.js setup with routing and middleware
* 🧪 Health check and test endpoint
* 🔐 Authentication system (Register, Login, Logout)
* 👥 User CRUD APIs (Get, Create, Update, Delete)
* 🌐 CORS & JSON body parser enabled
* ⚡ Dotenv for secure config
* 🔒 JWT token-based session handling
* 🚀 Nodemon for auto-reloading in development
* 🧹 ESLint + Prettier for clean and consistent code
* 🧱 Modular folder structure (routes, controllers, config, middleware)

---

```
src/
├── config/           → Supabase & env config
├── controllers/      → Request logic
├── middlewares/      → Error handling, auth (future)
├── routes/           → API endpoints
├── app.js            → App initialization
└── server.js         → Entry point
```

---

### 🛠️ Getting Started

1. Clone the project
2. Install dependencies with `npm install`
3. Create a `.env` file and add your Supabase credentials and JWT secret
4. Run the server with `npm run dev`

Environment Variables required in `.env`:

```
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-or-service-role-key
JWT_SECRET=your_super_secret_key
```

---

### 🌍 API Endpoints

#### ✅ Health Check



### 🔐 Authentication APIs

**POST** `/api/auth/register`
Register a new user.
**Body:**

* name
* email
* password
* phone
* address
* dob

**POST** `/api/auth/login`
Login with email and password.
**Body:**

* email
* password

  **Returns:** JWT token and user data.

**POST** `/api/auth/logout`
Logs out the user by blacklisting the token (in-memory).
  **Headers:**

  * Authorization: Bearer {token}

---

### 👥 User Management APIs

**GET** `/api/users`
Returns all users.

**GET** `/api/users/:id`
Returns a single user by UID.

**POST** `/api/users`
Creates a new user.
**Body:**

* name
* email
* phone
* address
* dob
* pic\_url
* password

**PUT** `/api/users/:id`
Updates an existing user by UID.
**Body:**

* name
* email
* phone
* address
* dob
* pic\_url
* password

**DELETE** `/api/users/:id`
Deletes a user by UID.


