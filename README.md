# Book Management Application

## Overview

This application provides functionalities for managing books with user registration and login processes. Users can register, login, view, add, update, and delete books through a web interface.

### Backend

- **Tech Stack**: TypeScript, TypeGraphQL, Apollo Server, MongoDB
- **Features**:
  - User registration and authentication using JWT tokens.
  - CRUD operations for managing books.
  - GraphQL API powered by Apollo Server.
  - Data storage and retrieval using MongoDB.

### Frontend

- **Tech Stack**:
  - **Framework**: Next.js
  - **State Management and GraphQL Client**: Apollo Client
  - **Styling**: Tailwind CSS

## Pages

### User Registration/Login

- **Description**: Allows users to register with their email, username, and password. Existing users can log in to access the application features.
- **Implementation**: Form-based authentication with validation.
- **Components**: Register and Login forms.

### Books CRUD Page

- **Description**: Displays a list of books with options to add, update, and delete books.
- **Features**:
  - View a list of books with their details (title, author, genre).
  - Add new books using a form.
  - Update existing books.
  - Delete books with confirmation prompts.
- **Components**: Book list, Add Book form, Edit and Delete buttons.

## Setup Instructions

### Prerequisites

- Node.js installed on your machine.
- MongoDB instance running (local or cloud-based).
- Packages listed in `package.json` installed via npm or yarn.

### Backend Setup

1. Navigate to the `server` directory.
2. Install dependencies: `npm install` or `yarn install`.
3. Set up environment variables (e.g., MongoDB URI, JWT secret).
4. Start the server: `npm start` or `yarn start`.

### Frontend Setup

1. Navigate to the `client` directory.
2. Install dependencies: `npm install` or `yarn install`.
3. Configure Apollo Client with the backend GraphQL endpoint.
4. Start the Next.js development server: `npm run dev` or `yarn dev`.
