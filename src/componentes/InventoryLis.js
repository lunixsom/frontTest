// src/components/InventoryList.js
import React from 'react';

const InventoryList = ({ inventories }) => {
  return (
    <ul>
      {inventories.map((inventory) => (
        <li key={inventory._id}>
          {inventory.name} - {inventory.quantity} unidades - ${inventory.price}
        </li>
      ))}
    </ul>
  );
};

export default InventoryList;
/* 
El componente espera recibir una lista de objetos 
de inventario desde su componente padre. Esta propiedad contiene
 los productos que se desean mostrar. */