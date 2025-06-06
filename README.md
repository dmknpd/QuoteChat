# QuoteChat Application

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue)](https://react.dev/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)](https://redux-toolkit.js.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4+-orange)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-red)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A real-time chat application with integrated automatic motivational quote delivery.

## Description

The QuoteChat Application is a dynamic chat service designed to enhance user communication by incorporating real-time messaging capabilities with a unique feature: automated motivational quote generation and delivery. It serves as an engaging platform where users can manage their conversations and receive inspiring messages, blending traditional chat functionality with a uplifting, unexpected element.

This project addresses the need for interactive communication tools that offer more than just basic messaging. Its standout feature is the "auto-sender," which dispatches curated quotes to active chats at regular intervals, providing users with positive reinforcement and a distinct conversational experience.

### Key Functionalities
- Real-time message exchange between users.
- Comprehensive chat management: creation, editing, and deletion.
- Automated system for generating and delivering inspirational quotes.
- Search and filtering capabilities for efficient chat navigation.
- A toggle mechanism to activate or deactivate the auto-sender feature.

## Features

- **Real-time Communication**
  - Instantaneous message sending and receiving within selected chat sessions via WebSockets.
  - Dynamic updates to chat lists and last messages.

- **Comprehensive Chat Management**
  - **Create:** Easily initiate new chats with specified participant details.
  - **Edit:** Modify existing chat information (e.g., names).
  - **Delete:** Remove chats from the system.

- **Automated Quote Delivery (`Auto-Sender`)**
  - A toggleable feature that periodically sends motivational quotes to a random active chat.
  - Quotes are fetched from an external API (`https://stoic.tekloon.net/stoic-quote`).
  - Provides a unique, uplifting aspect to general conversations.

- **User Interface & Experience**
  - Intuitive and responsive design ensuring a smooth user experience across different devices.
  - Search bar for quick filtering of chats by name.
  - Visual toast notifications with sound for new auto-messages, including an option to directly navigate to the relevant chat.

- **State Management**
  - **Redux Toolkit:** Utilized for predictable and centralized state management, handling complex application states like chat lists, messages, and UI errors.
  - **Redux Thunks:** Manages asynchronous operations, such as API calls for fetching/creating chats and messages, ensuring a clean and robust data flow.

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: Version 18 or higher (LTS recommended).
- **npm** or **Yarn**: For package management.
- **MongoDB**: A running instance (local or cloud-hosted, e.g., MongoDB Atlas).

### Step-by-step Setup Instructions

** 1. Clone the repository: **

```bash
git clone https://github.com/dmknpd/QuoteChat.git
cd QuoteChat 
```

**2. Backend Setup:**

### Navigate into the backend directory and install backend dependencies:

```bash
cd backend
npm install
```

### Create a .env file in the backend directory. Populate it with your environment variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/quotechat # Replace with your MongoDB connection string
FRONT_HOST=http://localhost:3000 # Or the deployed frontend URL
```

### Start the backend server:

```bash
npm start
```

- The backend server will run on `http://localhost:5000` (or your specified PORT)

**3. Frontend Setup:**

### Open a new terminal session and navigate to the frontend directory and install frontend dependencies:

```bash
cd ../frontend
npm install
```

### Start the frontend development server:

```bash
npm start
```

-The frontend application will typically open in your default browser at `http://localhost:3000`

