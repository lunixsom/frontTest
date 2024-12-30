import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/navegacion.css';



const Navegacion = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/formulario">Formulario</Link></li>
        <li><Link to="/usuarios">Usuarios</Link></li>
        <li><Link to="/inventario">Inventario</Link></li>
        <li><Link to="/listainventario">ListaInventarios</Link></li>
      </ul>
    </nav>
  );
};

export default Navegacion;
