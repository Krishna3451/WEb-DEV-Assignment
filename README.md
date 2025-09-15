## Taskify — To‑Do App with Categories

A simple full‑stack project spec. The backend (Node.js/Express + MongoDB) is implemented; the frontend is not yet included.

### Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, CORS, dotenv
- Auth: JWT Bearer tokens

### Project Structure
```
Web-Dev Term 5 Project/
  backend/
    index.js
    middleware/verifyToken.js
    models/{User.js, Task.js}
    routes/{auth.js, task.js}
    package.json
    Project.md (original spec)
```

### Prerequisites
- Node.js 18+ and npm
- MongoDB database (Atlas or local)

### Backend Setup
1) Install dependencies
```bash
cd backend
npm install
```

2) Create a `.env` file in `backend/`
```bash
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRES_IN=7d
```

3) Run the server
```bash
npm run dev
# or
npm start
```

Server starts on `http://localhost:PORT` (default 4000).

### API Reference

Base URL: `http://localhost:4000`

Auth routes (no auth header required):
- POST `/auth/register`
  - Body:
  ```json
  { "name": "Alice", "email": "alice@test.com", "password": "secret123" }
  ```
  - Response: `201 Created`

- POST `/auth/login`
  - Body:
  ```json
  { "email": "alice@test.com", "password": "secret123" }
  ```
  - Response:
  ```json
  { "token": "<jwt>" }
  ```

Tasks routes (require `Authorization: Bearer <jwt>`):

- GET `/tasks?category=work`
  - Response:
  ```json
  [
    { "_id":"1","userId":"u","title":"Finish report","category":"work","isDone":false },
    { "_id":"2","userId":"u","title":"Send email","category":"work","isDone":true }
  ]
  ```

- POST `/tasks`
  - Body:
  ```json
  { "title": "Buy groceries", "description":"Milk, eggs, bread", "category":"personal" }
  ```
  - Response: `201 Created` with created task

- PATCH `/tasks/:id`
  - Body (example):
  ```json
  { "isDone": true }
  ```
  - Response: updated task

- DELETE `/tasks/:id`
  - Response: `204 No Content`

### Notes
- All task operations are scoped to the authenticated user.
- Common errors: `400` (missing fields), `401` (missing/invalid token), `404` (task not found), `409` (email already registered), `500` (server error).

### Next Steps (Frontend)
- Build pages per spec in `backend/Project.md`:
  - Login/Register (store JWT in `localStorage`)
  - Dashboard (list/filter by category, toggle done)
  - Task Form (add/update)


