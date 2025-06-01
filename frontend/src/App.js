import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <div className="App">
      <main className="main">
        <Sidebar />
        <Chat />
      </main>
    </div>
  );
}

export default App;
