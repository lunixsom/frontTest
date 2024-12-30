import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';

const ListaInventario = () => {
    const [listainventario, setListaInventario] = useState([]); // Estado para almacenar el inventario

    // Función para obtener la lista de inventario
    const obtenerInventario = useCallback(async () => {
        try {
            const respuesta = await axios.get('http://localhost:9000/inventario/inventario');
            // Cambia la URL si es necesario
            setListaInventario(respuesta.data);
        } catch (error) {
            console.error('Error al obtener el inventario:', error);
            Swal.fire('Error', 'No se pudo cargar el inventario', 'error');
        }
    }, []);

    // Confirmar eliminación de un producto
    const confirmarEliminación = async (id) => {
        const resultado = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (resultado.isConfirmed) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL_PRODUCTOS}/${id}`);
                Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
                obtenerInventario(); // Refresca la lista después de eliminar
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
            }
        }
    };

    // useEffect para obtener los datos al montar el componente
    useEffect(() => {
        obtenerInventario();
    }, [obtenerInventario]);

    return (
        <>
            <h1 className='container mt-5 text-center'>Lista de Inventario</h1>
            <div className='container mt-5 text-center'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listainventario.length === 0 ? (
                            <tr>
                                <td colSpan="4">No hay elementos en el inventario</td>
                            </tr>
                        ) : (
                            listainventario.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.nombre}</td>
                                    <td>${item.precio}</td>
                                    <td>{item.cantidad}</td>
                                    <td>
                                        <button
                                            className='btn btn-danger mx-2'
                                            onClick={() => confirmarEliminación(item._id)}
                                        >
                                            Eliminar
                                        </button>
                                        <button className='btn btn-warning'>Editar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                        {/* Rellenar la tabla con filas vacías */}
                        {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={`empty-row-${index}`}>
                                <td style={{ height: '40px' }}></td>
                                <td style={{ height: '40px' }}></td>
                                <td style={{ height: '40px' }}></td>
                                <td style={{ height: '40px' }}></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ListaInventario;
