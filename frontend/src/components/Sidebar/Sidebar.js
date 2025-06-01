import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="user_container">
          <img src="" alt="" className="user_icon" />
          <button className="log_button">Log in</button>
        </div>
        <div className="search">
          <input type="text" />
        </div>
      </div>
      <div className="chat_list_container">
        <h2 className="chat_title">Chats</h2>
        <div className="chat_list">
          <div className="chat_list_item">Alice</div>
          <div className="chat_list_item">Josefina</div>
          <div className="chat_list_item">Velazquez</div>
          <div className="chat_list_item">Piter</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
