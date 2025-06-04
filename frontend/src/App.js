import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {
  return (
    <div className="App">
      <main className="main">
        <Sidebar />
        <ChatWindow />
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
}

export default App;
