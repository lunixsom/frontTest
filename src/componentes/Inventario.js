import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../CSS/inventario.css';

const Inventario = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [productos, setProductos] = useState([]);
    const [editando, setEditando] = useState(null); // Guardar el ID del producto que se va a editar

    // Cargar productos desde el backend
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:9000/listainventario/inventario')
                setProductos(response.data);
            } catch (error) {
                console.error("Error al cargar productos", error);
            }
        };

        fetchProductos();
    }, []);

    // Manejo de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que los campos no estén vacíos
        if (!nombre || !precio || !cantidad) {
            Swal.fire({
                title: 'Error!',
                text: 'Por favor, complete todos los campos.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        if (editando) {
            // Editar producto
            try {
                await axios.put(`http://localhost:9000/listainventario/${editando}`, {
                    nombre,
                    precio,
                    cantidad
                });

                Swal.fire({
                    title: 'Producto editado!',
                    text: 'El producto ha sido editado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });

                // Limpiar los campos y terminar la edición
                setNombre('');
                setPrecio('');
                setCantidad('');
                setEditando(null);
               // fetchProductos(); // Recargar la lista de productos
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Hubo un problema al editar el producto.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
        } else {
            // Agregar producto
            try {
                await axios.post('http://localhost:9000/listainventario/register', {
                    nombre,
                    precio,
                    cantidad
                });

                Swal.fire({
                    title: 'Producto agregado!',
                    text: 'El producto ha sido agregado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });

                // Limpiar los campos después de enviar
                setNombre('');
                setPrecio('');
                setCantidad('');
               // fetchProductos(); // Recargar la lista de productos
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Hubo un problema al agregar el producto.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
        }
    };

    // Eliminar producto
/*     const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/listainventario/inventario/${id}`);
            Swal.fire({
                title: 'Producto eliminado!',
                text: 'El producto ha sido eliminado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
            setProductos(productos.filter((producto) => producto._id !== id));
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un problema al eliminar el producto.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    }; */

    // Iniciar edición de producto
/*     const handleEdit = (producto) => {
        setEditando(producto._id);
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setCantidad(producto.cantidad);
    }; */

    return (
        <div className="inventario-container">
            <h1>Inventario</h1>
            <p>Bienvenido a la sección de inventario. Aquí puedes agregar, editar o eliminar productos.</p>

            <form className="inventario-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del Producto</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre del producto"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="precio">Precio</label>
                    <input
                        type="number"
                        id="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        placeholder="Precio"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        type="number"
                        id="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        placeholder="Cantidad disponible"
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">
                    {editando ? 'Editar Producto' : 'Agregar Producto'}
                </button>
            </form>

        {/*     <h2>Lista de Productos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto._id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.cantidad}</td>
                            <td>
                                <button onClick={() => handleEdit(producto)}>Editar</button>
                                <button onClick={() => handleDelete(producto._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default Inventario;
