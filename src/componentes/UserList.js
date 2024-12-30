// src/components/UserList.js
import React from 'react';

const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};

export default UserList;

/* Recibe la lista users desde el componente padre.
Itera sobre la lista usando map para generar un elemento <li> para cada usuario.
Muestra la información del usuario (nombre y correo) en la lista. */