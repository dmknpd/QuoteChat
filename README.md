# QuoteChat Application

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue)](https://react.dev/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)](https://redux-toolkit.js.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4+-orange)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-red)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

[**Live Demo**](https://quotechat-a817.onrender.com) | [**Backend API**](https://quotechat-e1qu.onrender.com)

*Note: Before using the live demo, please visit the [Backend API](https://quotechat-e1qu.onrender.com) link to "wake up" the backend server, as it might be in sleep mode.*

A real-time chat application with integrated automatic motivational quote delivery.

## Description

The QuoteChat Application is a dynamic chat service designed to enhance user communication by incorporating real-time messaging capabilities with a unique feature: automated motivational quote generation and delivery. It serves as an engaging platform where users can manage their conversations and receive inspiring messages, blending traditional chat functionality with a uplifting, unexpected element.

This project addresses the need for interactive communication tools that offer more than just basic messaging. Its standout feature is the "auto-sender," which dispatches curated quotes to active chats at regular intervals, providing users with positive reinforcement and a distinct conversational experience.

### Key Functionalities
  - User-to-Bot Messaging: Users can send messages to a chat and receive responses from a bot.
  - Automated Quote Responses: The bot automatically generates and sends inspirational quotes in response to user messages.
  - Comprehensive Chat Management: Ability to create, edit, and delete chats (interactions with bots).
  - Chat Search and Filtering: Search and filtering functionalities for efficient navigation through bot chats.
  - Auto-Sender Toggle: A mechanism to activate or deactivate the bot's automatic quote sending feature.

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

**1. Clone the repository:**

```bash
git clone https://github.com/dmknpd/QuoteChat.git
cd QuoteChat 
```

**2. Backend Setup:**

- Navigate into the backend directory and install backend dependencies:

```bash
cd backend
npm install
```

- Create a .env file in the backend directory. Populate it with your environment variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/quotechat # Replace with your MongoDB connection string
FRONT_HOST=http://localhost:3000 # Or the deployed frontend URL
```

- Start the backend server:

```bash
npm start
```

- The backend server will run on `http://localhost:5000` (or your specified PORT)

**3. Frontend Setup:**

- Open a new terminal session and navigate to the frontend directory and install frontend dependencies:

```bash
cd ../frontend
npm install
```

- Start the frontend development server:

```bash
npm start
```

- The frontend application will typically open in your default browser at `http://localhost:3000`

## Usage

#### Once both the backend and frontend services are operational:

**1. Access the Application: Open your web browser and navigate to `http://localhost:3000`.**

**2. Manage Chats:**
  - Create: Click the `+` icon in the sidebar's search bar to open the chat creation modal. Enter the required details and save.
  - Select: Click on any chat in the left sidebar to load its conversation history in the main chat window.
  - Edit: Click the `edit` icon next to a chat in the sidebar or in the chat window header to update its details.
  - Delete: Click the `X` icon next to a chat in the sidebar to remove it.

**3. Send Messages: In the active chat window, type your message in the input field at the bottom and press Enter or click the send button.**

**4. Utilize Auto-Sender:**
  - Click the `Start Auto-Sender` button in the sidebar to enable the automatic quote delivery.
  - Quotes will be sent to a random chat at intervals (e.g., every 5 seconds, as configured in the backend).
  - Click `Stop Auto-Sender` to pause this feature.

**5. Notifications: When a new auto-message arrives, a toast notification will appear in the bottom-right corner of your screen, accompanied by a sound. Clicking this notification will switch you to the corresponding chat.**

**6. Search Chats: Use the search bar in the sidebar to filter your chat list by participant names.**

## API Endpoints

#### Base URL: http://localhost:5000/api
 
### Chats

- **Get All Chats:**

  - `GET /chats`
  - Successful Response (200):

    ```json
    [
      {
      "_id": "654321098765432109876543",
      "firstName": "John",
      "lastName": "Doe",
      "lastMessage": {
        "_id": "123456789012345678901234",
        "chat": "654321098765432109876543",
        "text": "Hello there!",
        "createdAt": "2025-06-05T12:00:00.000Z"
      },
      "createdAt": "2025-06-01T10:00:00.000Z",
      "updatedAt": "2025-06-05T12:00:00.000Z"
      }
    ]
    ```

  - Error Responses:

    - `500 Internal Server Error`:

      ```json
      {
      "error": "Failed to fetch chats"
      }
      ```

- **Create New Chat:**

  - `POST /chats`
  - Request body:

    ```json
    {
      "firstName": "Jane",
      "lastName": "Smith"
    }
    ```

  - Successful Response (201 Created)::

    ```json
    {
      "_id": "newChatId12345",
      "firstName": "Jane",
      "lastName": "Smith",
      "createdAt": "2025-06-06T11:00:00.000Z",
      "updatedAt": "2025-06-06T11:00:00.000Z",
      "lastMessage": null
    }
    ```

   - Error Responses:

      - `400 Bad Request` - Invalid input (e.g., missing fields, validation errors):
  
        ```json
        {
          "errors": {
            "firstName": "First name is required."
          }
        }
        ```
  
      - `500 Internal Server Error`:
      
          ```json
          {
          "error": "Failed to create chat"
          }
          ```

- **Update Existing Chat:**

  - `PATCH /chats/:id`
  - Request body:

    ```json
    {
      "firstName": "Jane",
      "lastName": "Smith"
    }
    ```

  - Successful Response (201 Created)::

    ```json
    {
      "_id": "newChatId12345",
      "firstName": "Jane",
      "lastName": "Smith",
      "createdAt": "2025-06-06T11:00:00.000Z",
      "updatedAt": "2025-06-06T11:00:00.000Z",
      "lastMessage": null
    }
    ```

   - Error Responses:

      - `400 Bad Request` - Invalid input:
  
        ```json
        {
          "errors": {
            "firstName": "First name is required."
          }
        }
        ```
  
     - `404 Not Found` - Chat not found:
  
        ```json
        {
          "error": "Chat not found"
        }
        ```
  
      - `500 Internal Server Error`:
      
          ```json
          {
          "error": "Failed to update chat"
          }
          ```

- **Delete Chat:**

  - `DELETE /chats/:id`
  - Request body:

    ```json
    {
      "firstName": "Jane",
      "lastName": "Smith"
    }
    ```

  - Successful Response (200)::

    ```json
    {
        "message": "Chat deleted successfully"
    }
    ```

   - Error Responses:

     - `404 Not Found` - Chat not found:

        ```json
        {
          "error": "Chat not found"
        }
        ```

      - `500 Internal Server Error`:
      
          ```json
          {
          "error": "Failed to delete chat"
          }
          ```

### Messages

- **Get Messages for a Chat:**

  - `GET /chats/messages/:chatId`
  - Successful Response (200):

    ```json
    [
        {
          "_id": "messageId1",
          "chat": "chatId123",
          "text": "Hi there!",
          "isAutoMessage": false,
          "createdAt": "2025-06-05T10:00:00.000Z"
        },
        {
          "_id": "messageId2",
          "chat": "chatId123",
          "text": "The greatest glory in living lies not in never falling, but in rising every time we fall.",
          "isAutoMessage": true,
          "createdAt": "2025-06-05T10:05:00.000Z"
        }
    ]
    ```

  - Error Responses:

    - `404 Not Found` - Chat not found:
  
        ```json
        {
          "error": "Chat not found"
        }
        ```

    - `500 Internal Server Error`:

      ```json
      {
        "error": "Failed to fetch messages"
      }
      ```

- **Send Message to a Chat:**

  - `POST /chats/messages/:chatId`
  - Request body:

    ```json
    {
      "text": "This is a new message."
    }
    ```

  - Successful Response (201 Created)::

    ```json
    {
      "_id": "newMessageId456",
      "chat": "chatId123",
      "text": "This is a new message.",
      "isAutoMessage": false,
      "createdAt": "2025-06-06T12:00:00.000Z"
    }
    ```

   - Error Responses:

      - `400 Bad Request` - Invalid input (e.g., empty text):
  
          ```json
          {
            "error": "Message text is required"
          }
          ```

      - `404 Not Found` - Chat not found:
        
          ```json
          {
            "error": "Chat not found"
          }
          ```

      - `500 Internal Server Error`:
      
          ```json
          {
          "error": "Failed to send message"
          }
          ```

### Auto-Sender

- **Get Auto-Sender State**

  - `GET /auto-sender`
  - Successful Response (200):

    ```json
      {
      "enabled": true
      }
    ```

  - Error Responses:

    - `500 Internal Server Error`:

      ```json
      {
        "error": "Failed to fetch messages"
      }
      ```

- **Toggle Auto-Sender Status:**

  - `POST /auto-sender`
  - Request body:

    ```json
    {
      "enabled": true
    }
    ```

  - Successful Response (200)::

    ```json
    {
      "enabled": true,
    }
    ```

   - Error Responses:

      - `400 Bad Request` - Invalid input (e.g., empty text):
  
          ```json
          {
            "error": "Invalid input"
          }
          ```

      - `500 Internal Server Error`:
      
          ```json
          {
          "error": "Failed to toggle auto-sender"
          }
          ```

## Project Structure

### The project is logically separated into backend (Node.js/Express) and frontend (React), facilitating independent development and deployment.

```bash
.
├── backend/                  # Node.js Express API for server-side operations
│   ├── controllers/          # Handles API request logic and interacts with services/models
│   ├── models/               # Defines MongoDB schemas for chats and messages
│   ├── routes/               # Defines API endpoints for chats, messages, and auto-sender
│   ├── utils/                # General utility functions (e.g., error formatting, quote fetching)
│   ├── validators/           # Data validation schemas (e.g., Joi for chat input)
│   ├── .env                  # Environment variables for database connection, port etc.
│   ├── index.js              # Main entry point for the backend server
│   └── package.json          # Backend dependencies and scripts
└── frontend/                 # React application for the user interface
    ├── public/               # Static assets (HTML, images, sounds)
    │   └── sounds/
    │       └── notification.mp3 # Notification sound file
    ├── src/                  # Source code for the React application
    │   ├── api/              # Functions for interacting with the backend API
    │   │   └── api.js
    │   ├── components/       # Reusable React UI components
    │   │   ├── ChatList/
    │   │   ├── ChatListItem/
    │   │   ├── ChatModal/
    │   │   ├── ChatWindow/
    │   │   ├── MessageItem/
    │   │   └── Sidebar/
    │   ├── socket/           # Socket.IO client setup for real-time communication
    │   │   └── socket.js
    │   ├── store/            # Redux Toolkit store and slices for state management
    │   │   ├── chatSlice.js    # Manages chat-related state and async actions
    │   │   ├── messageSlice.js # Manages message-related state and async actions
    │   │   └── store.js        # Configures the Redux store
    │   ├── App.css           # Main application-wide CSS
    │   ├── App.js            # Root component of the React application
    │   ├── index.css         # Global CSS styles
    │   └── index.js          # Entry point for React DOM rendering
    └── package.json          # Frontend dependencies and scripts
```

## Dependencies

### Backend Dependencies

| Package       | Purpose                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------- |
| **express**   | Web framework for building APIs and web servers                                           |
| **mongoose**  | MongoDB object modeling tool for Node.js, used for managing data schemas                  |
| **dotenv**    | Loads environment variables from a `.env` file                                            |
| **axios**     | Promise-based HTTP client for making API requests                                         |
| **socket.io** | Enables real-time, bidirectional, event-based communication                               |
| **joi**       | Object schema description language and validator for JavaScript                           |
| **cors**      | Express middleware that enables Cross-Origin Resource Sharing (CORS)                      |


### Frontend Dependencies

| Package                         | Purpose                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| **react**                       | JavaScript library for building user interfaces                                               |
| **react-dom**                   | React package for interacting with the DOM                                                    |
| **@reduxjs/toolkit**            | The official, opinionated, batteries-included toolset for Redux                               |
| **react-redux**                 | Official bindings to connect React components to the Redux store                              |
| **axios**                       | Promise-based HTTP client for making backend API requests                                     |
| **socket.io-client**            | Client-side library for enabling real-time communication with Socket.IO                       |
| **react-toastify**              | Easy-to-use toast notification component for React                                            |

