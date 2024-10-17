import React from "react";
import "./SideNav.css"; // Include custom styles

const SideNav = ({ onNewChatClick }) => (
  <div className="sidenav">
    <h2>Eureka</h2>
    <p>Your personal assistant</p>
    <button onClick={onNewChatClick}>New Chat</button>
    <button>History</button>
    <button>Help</button>
    <button>Settings</button>
  </div>
);

export default SideNav;
