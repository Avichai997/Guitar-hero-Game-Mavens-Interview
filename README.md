# mavens° Web App Game

This project is a proof-of-concept web app game to test user reaction time and quick decision-making. It includes a frontend built with Vite + React + TypeScript and a backend built with Express + TypeScript.

## Project Structure

.
├── client
│ ├── index.html
│ ├── package.json
│ ├── package-lock.json
│ ├── public
│ │ └── vite.svg
│ ├── README.md
│ ├── src
│ │ ├── App.scss
│ │ ├── App.tsx
│ │ ├── index.scss
│ │ ├── main.tsx
│ │ └── vite-env.d.ts
│ ├── tsconfig.app.json
│ ├── tsconfig.json
│ ├── tsconfig.node.json
│ └── vite.config.ts
├── mavens° FS assignment.pdf
├── README.md
└── server
├── nodemon.json
├── package.json
├── package-lock.json
├── src
│ ├── app.ts
│ ├── controllers
│ │ └── userController.ts
│ ├── models
│ │ └── User.ts
│ ├── routes
│ │ └── userRoutes.ts
│ └── server.ts
└── tsconfig.json

## Requirements

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

## Installation

### Server

Run in new terminal:

```bash
cd server
# Install the dependencies
npm install
# Make sure MongoDB is running. If you have MongoDB installed, you can start it with:
mongod
# Run the backend server:
npm run dev
```

### Client

Run in new terminal:

```bash
cd client
# Install the dependencies
npm install
# Run the frontend development server:npm run dev
npm run dev
```

## Running the App

Make sure both the backend and frontend servers are running.

Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the web app.

## API Endpoints

### User

- `POST /api/users` - Add a new user with their username and steps completed successfully.
- `GET /api/users` - Get the list of users sorted by the number of steps they reached.

## Project Details

- **Frontend**: Vite + React + TypeScript
- **Backend**: Express + TypeScript
- **Database**: MongoDB

## Contact

If you have any questions, feel free to contact us.

---

**Note**: This project is a minimal viable product (MVP) and may not include advanced features or security measures.
