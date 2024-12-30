import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditarForm() {
    const { id } = useParams(); // Obtener el ID desde la URL
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');

    // Cargar los datos del usuario al montar el componente
    useEffect(() => {
        // Obtener los datos del usuario desde la API
        axios.get(`http://localhost:9000/user/${id} `)
            .then((response) => {
                const usuario = response.data;
                console.log(id)
                setNombre(usuario.nombre);
                setEmail(usuario.email);
            })
            .catch((error) => {
                console.log('Error al cargar los datos del usuario:', error);
            });
    }, [id]);

    // Manejo del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const updatedUser = {
            nombre,
            email,
            //password,
        };

        // Enviar los datos modificados a la API

        axios.put(`http://localhost:9000/user/editar/${id}`, updatedUser)
            .then((response) => {
                console.log('Usuario actualizado correctamente');
                // Vaciar los campos después de guardar
            setNombre('');
            setEmail('');
            //setPassword('');    
            })
            .catch((error) => {
                console.log('Error al actualizar el usuario GG:', error);
            });
    };

    return (
        <div className="d-flex container mt-5">
            <Form className="w-75 shadow-lg p-4 rounded" onSubmit={handleSubmit}>
                <Form.Group className="mb-4" htmlFor="nombre">
                    <Form.Label className="fw-bold">Nombre</Form.Label>
                    <Form.Control
                    id="nombre" 
                        type="text" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} 
                        placeholder="Tu nombre" 
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-4" htmlFor="email">
                    <Form.Label className="fw-bold">Email</Form.Label>
                    <Form.Control 
                    id="email"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com" 
                        required
                    />
                </Form.Group>

                <div className="d-flex justify-content-between">
                    <Button variant="success" type="submit" className='mt-4'>Guardar cambios</Button>
                    <Button variant="outline-warning" className='mt-4' onClick={() => {
                    setNombre('');
                    setEmail('');
                    }}>Limpiar Campos</Button>
                </div>
            </Form>
        </div>
    );
};

export default EditarForm;