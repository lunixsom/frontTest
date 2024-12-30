import React from 'react';
import {  Routes, Route } from 'react-router-dom';

// Importar los componentes
import Home from './componentes/Home';
import Formulario from './componentes/Formulario';
import Navegacion from './componentes/Navegacion';
import Usuarios from './componentes/Usuarios';
import Error from './componentes/Error';
import Inventario from './componentes/Inventario';
import ListaInventario from './componentes/ListaInventario';
import EditarForm from './componentes/EditarForm'

const App = () => {
  return (
    <>
      {/* Incluye el componente de navegación */}
      <Navegacion />

      {/* Definición de rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/editar/:id" element={<EditarForm />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/listainventario" element={<ListaInventario />} />
        <Route path="*" element={<Error />} /> {/* Ruta para errores 404 */}
      </Routes>
    </>
  );
};

export default App;
