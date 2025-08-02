Project Frontend Setup
This document provides instructions on how to set up and run the frontend of this project.

Prerequisites
Before you begin, ensure you have Node.js and npm installed on your machine.

Getting Started
Follow these steps to get the frontend development environment running.

1. Navigate to the Frontend Directory
First, open your terminal and change your current directory to the frontend folder.

cd frontend

2. Install Dependencies
Next, install the required npm packages. This project uses Tailwind CSS for styling and Lucide for icons.

Run the following command to install Tailwind CSS and its Vite integration:

npm install tailwindcss @tailwindcss/vite

Then, install the Lucide React icon library:

npm install lucide-react

Alternatively, you can install all dependencies at once if they are listed in your package.json:

npm install

3. Run the Development Server
Once the dependencies are installed, you can start the development server.

npm run dev

This command will start the Vite development server. You should see output in your terminal indicating that the server is running, usually on a local port like http://localhost:5173.

You can now open your web browser and navigate to the provided URL to see the application. The server will automatically reload the page whenever you make changes to the source files.

Happy coding!