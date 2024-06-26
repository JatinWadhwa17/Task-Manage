Task Management Application
This repository contains code for a Task Management Application with CRUD operations implemented using Next.js for both frontend and backend functionality.

Features
View Tasks: Display a list of tasks with titles, descriptions, and due dates.
Add Task: Ability to add a new task with title, description, and due date.
View Details: View detailed information of each task.
Edit Task: Modify existing task details.
Delete Task: Remove tasks from the list.

Technologies Used
Framework: Next.js
Backend: Node.js with Express
Frontend UI Framework: Material-UI
State Management: Redux Toolkit
HTTP Client: Axios
Routing: Next.js Routing (React Router equivalent)
Getting Started
Prerequisites
Node.js installed on your machine
npm (Node Package Manager)
Installation


Clone the repository:

git clone https://github.com/your-username/task-management-app.git
cd task-management-app


Install dependencies:
cd backend
npm install

This will install dependencies listed in package.json for both the backend (Node.js with Express) and frontend (Next.js with Material-UI, Redux Toolkit, Axios).

Install frontend dependencies:

npm install @mui/material @emotion/react @emotion/styled @reduxjs/toolkit react-redux axios

@mui/material: Material-UI library components for the frontend UI.
@emotion/react, @emotion/styled: Required for styling with Material-UI.
@reduxjs/toolkit, react-redux: Redux Toolkit and React-Redux for state management.
axios: HTTP client for making requests to the backend API.

Running the Application
Start the development server:

cd backend
node index.js
This command starts both the backend server (Node.js with Express) on http://localhost:5000 

To start Next.js frontend development server on http://localhost:3000. write cd ..  npm run dev

Usage
Open your browser and go to http://localhost:3000 to view and interact with the Task Management Application.
Perform CRUD operations (Create, Read, Update, Delete) on tasks as per the application's functionalities.
API Endpoints
GET /api/tasks: Retrieves all tasks.
POST /api/tasks: Creates a new task.
PUT /api/tasks/:id: Updates an existing task by ID.
DELETE /api/tasks/:id: Deletes a task by ID.
Additional Notes
The application uses Next.js for server-side rendering and client-side functionality.
State management is handled using Redux Toolkit.
Axios is used for making HTTP requests to the backend API.
Error handling is implemented for both frontend and backend components.
