 import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function ListaInventario() {

    const [listaInventario, setListaInventario] = useState([]);

    useEffect(() => {
        const obtenerListaInventario = async () => {
            try {
                const respuesta = await axios.get('http://localhost:9000/listaInventario/inventario');
                setListaInventario(respuesta.data);
                console.log(respuesta);
                console.log(respuesta.status);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        obtenerListaInventario();
    }, []);

    const eliminarUsuario = async (id) => {
        try {
            const respuesta = await axios.delete(`http://localhost:9000/listaInventario/${id}`);
            console.log('Respuesta al eliminar:', respuesta); // Añade este log
            if (respuesta.status === 200) {
                setListaInventario((prevLista) => prevLista.filter((usuario) => usuario._id !== id));
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    const confirmarEliminación = (id) => {
        Swal.fire({
            title: "Estás seguro?",
            text: "Esto no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUsuario(id); // Llamar a la función de eliminación
                Swal.fire({
                    title: "Usuario Eliminado!",
                    text: "El archivo se ha eliminado.",
                    icon: "success"
                });
            }
        });
    };

    const manejarEdicion = (id) => {
        console.log("Editar producto con ID:", id);
       
    };

    return (
        <>
            <h1 className='container mt-5 text-center'>
                Usuarios habilitados
            </h1>
            <div className='container mt-5 text-center'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ListaInventario</th>
                            <th>cantidad</th>
                            <th>precio</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaInventario.map((usuario) => (
                            <tr key={usuario._id}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.cantidad}</td>
                                <td>{usuario.precio}</td>
                                
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => confirmarEliminación(usuario._id)}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => manejarEdicion(usuario._id)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ListaInventario;
 

  


