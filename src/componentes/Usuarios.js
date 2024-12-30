import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditar, setUsuarioEditar] = useState(null);
    const navigate = useNavigate(); // Inicializar el hook

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const respuesta = await axios.get(`${process.env.REACT_APP_API_URL_SERVER_GET}`);
                setUsuarios(respuesta.data);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        }
        obtenerUsuarios();
    }, []);

    const eliminarUsuario = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL_SERVER_DELETE}/${id}`);
            setUsuarios(usuarios.filter(usuario => usuario._id !== id));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }

    const confirmarEliminación = (id) => {
        Swal.fire({
            title: "Estás seguro?",
            text: "Esto no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUsuario(id);
                Swal.fire({
                    title: "Usuario Eliminado!",
                    text: "El archivo se ha eliminado.",
                    icon: "success"
                });
            }
        });
    }

    const editarUsuario = async (id, usuarioActualizado) => {
        try {
            const respuesta = await axios.put(`http://localhost:9000/user/${id}`, usuarioActualizado);
            setUsuarios(usuarios.map(usuario => usuario._id === id ? respuesta.data : usuario));
            Swal.fire({
                title: "Usuario Actualizado!",
                text: "El usuario ha sido actualizado.",
                icon: "success"
            });
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar el usuario.",
                icon: "error"
            });
        }
    }

    const mostrarFormularioEdicion = (id) => {
        navigate(`/editar/${id}`);
    }

    return (
        <>
            <h1 className='container mt-5 text-center'>Clientes Activos</h1>
            <div className='container mt-5 text-center'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario._id}>
                                <td>{usuario._id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => { confirmarEliminación(usuario._id) }}
                                    >
                                        Eliminar
                                    </button>
                                    <button 
                                        className='btn btn-warning'
                                        onClick={() => mostrarFormularioEdicion(usuario._id)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {usuarioEditar && (
                    <div className="modal">
                        <h2>Editar Usuario</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            editarUsuario(usuarioEditar._id, usuarioEditar);
                        }}>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input 
                                    type="text" 
                                    value={usuarioEditar.nombre}
                                    onChange={(e) => setUsuarioEditar({ ...usuarioEditar, nombre: e.target.value })}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    value={usuarioEditar.email}
                                    onChange={(e) => setUsuarioEditar({ ...usuarioEditar, email: e.target.value })}
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar cambios</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default Usuarios;
