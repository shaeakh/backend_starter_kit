## 🧰 Express + Supabase Backend Starter Kit

A clean, modular, and ready-to-use backend starter kit built with **Express.js** and integrated with **Supabase** (PostgreSQL + Auth + Storage). Designed to kickstart your next backend project with scalability and developer experience in mind.

### ✨ Features

* ⚙️ Express.js setup with routing and middleware
* 🧪 Health check and test endpoint
* 🌐 CORS & JSON body parser enabled
* 🔐 Supabase integration (Database + Auth + Storage-ready)
* ⚡ Dotenv for secure config
* 🚀 Nodemon for auto-reloading in dev
* 🧹 ESLint + Prettier for clean code
* 🧱 Modular folder structure (routes, controllers, config, middleware)

---

### 📁 Folder Structure

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

```bash
git clone https://github.com/your-username/express-supabase-backend.git
cd express-supabase-backend
npm install
cp .env.example .env  # Add your Supabase credentials
npm run dev
```

---

### 🌍 Example Endpoint

```http
GET /api/health
```

Returns status and a test query from Supabase.

---

Let me know if you want me to create the full `README.md` including setup instructions, API usage, or contribution guidelines!
