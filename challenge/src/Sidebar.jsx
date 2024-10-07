import React from 'react';
import './Sidebar.css'; // Importar estilos
import { useNavigate } from 'react-router-dom';

const Sidebar = ({onSelect }) => {
  const navigate = useNavigate();
  
  function voltar() {
    setTimeout(() => {
      navigate('/');
    }, 500);
  }

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <button onClick={() => onSelect('24horas')}>24 Horas</button>
        </li>
        <li>
          <button onClick={() => onSelect('48horas')}>48 Horas</button>
        </li>
        <li>
          <button onClick={() => onSelect('1semana')}>1 Semana</button>
        </li>
        <li>
          <button onClick={() => onSelect('1mes')}>1 Mês</button>
        </li>
      </ul>
      <button className="logout-button" onClick={voltar}>
        Deslogar
      </button>
    </div>
  );
};

export default Sidebar;