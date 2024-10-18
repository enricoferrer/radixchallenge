import React from 'react';
import './Sidebar.css';
import "./Dashboard/"

const Sidebar = ({onButtonClick }) => {

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <button onClick={() => onButtonClick("24horas")}>24 Horas</button>
        </li>
        <li>
          <button onClick={() => onButtonClick("48horas")}>48 Horas</button>
        </li>
        <li>
          <button onClick={() => onButtonClick("1semana")}>1 Semana</button>
        </li>
        <li>
          <button onClick={() => onButtonClick("1mes")}>1 Mês</button>
        </li>
      </ul>
      <button className="logout-button" onClick={() => onButtonClick("voltar")}>
        Deslogar
      </button>
    </div>
  );
};

export default Sidebar;