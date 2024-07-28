# mavens° Web App Game

This project is a proof-of-concept web app game to test user reaction time and quick decision-making. It includes a frontend built with Vite + React + TypeScript and a backend built with Express + TypeScript.

## Requirements

- Docker
- Docker Compose

## Installation

### Using Docker Compose

The easiest way to run the application is using Docker Compose. Follow these steps:

1. Make sure Docker and Docker Compose are installed on your machine.
2. Clone the repository and navigate to the project directory.
3. Run the following command to start the services:

```bash
docker-compose up --build
```

This command will build and start the frontend, backend, and MongoDB services.

## Opening the Application

Once the services are running, you can access the client and server in your web browser.

### Client

Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the web app.

### Server

The backend server runs on port 5000. You can access it at [http://localhost:5000](http://localhost:5000).

## API Endpoints

### User

- `POST /api/users` - Add a new user with their username and steps completed successfully.
- `GET /api/users` - Get the list of users sorted by the number of steps they reached.
- `POST /api/users/score` - Update the user's score based on their success.

## Project Details

- **Frontend**: Vite + React + TypeScript
- **Backend**: Express + TypeScript
- **Database**: MongoDB
