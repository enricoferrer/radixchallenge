import React from 'react';
import './Sidebar.css';
import "./Dashboard/"

const Sidebar = ({onButtonClick }) => {

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <button onClick={() => onButtonClick("24horas")}>24 Hours</button>
        </li>
        <li>
          <button onClick={() => onButtonClick("48horas")}>48 Hours</button>
        </li>
        <li>
          <button onClick={() => onButtonClick("1semana")}>1 Week</button>
        </li>
        <li>
          <button onClick={() => onButtonClick("1mes")}>1 Month</button>
        </li>
      </ul>
      <button className="logout-button" onClick={() => onButtonClick("voltar")}>
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;