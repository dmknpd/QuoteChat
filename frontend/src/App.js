import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/Chat/ChatWindow";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <main className="main">
          <Sidebar />
          <ChatWindow />
          <ToastContainer position="top-right" autoClose={3000} />
        </main>
      </div>
    </ChatProvider>
  );
}

export default App;
