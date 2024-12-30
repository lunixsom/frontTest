/* 

const Home = () => {
    return (
        <div className="text-center mt-5 mb-5">
            <h1>Home</h1>
            <p>Esta es la página de inicio</p>
        </div>
    );
}

export default Home;  */

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import './Home.css'; // Archivo CSS personalizado */
/* import imagenPresentacion from './assets/presentacion.png'; // Importa una imagen local */

const Home = () => {
    return (
        <div className="home-container">
            {/* Sección principal */}
            <header className="text-center py-5 bg-primary text-white">
                <h1 className="display-3">Bienvenido a Mi Aplicación</h1>
                <p className="lead">Tu solución perfecta para cualquier necesidad</p>
            </header>

            {/* Sección de contenido */}
            <section className="container mt-5 mb-5 text-center">
                <div className="row">
                    <div className="col-md-6">
                        <h2>¿Quiénes somos?</h2>
                        <p>
                            Somos un equipo dedicado a crear experiencias increíbles para nuestros usuarios.
                            Nuestra misión es ofrecer calidad, eficiencia y resultados en cada paso del camino.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img
                           /*  src={imagenPresentacion} */
                            alt="Presentación"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </section>

            {/* Sección de características */}
            <section className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Características Principales</h2>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <i className="bi bi-lightning-fill fs-1 text-warning"></i>
                            <h3>Rápido</h3>
                            <p>Respuestas y servicios en tiempo récord.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="bi bi-lock-fill fs-1 text-success"></i>
                            <h3>Seguro</h3>
                            <p>Protegemos tu información con los más altos estándares.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="bi bi-stars fs-1 text-primary"></i>
                            <h3>Innovador</h3>
                            <p>Implementamos las últimas tecnologías.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-3 bg-dark text-white">
                <p>&copy; 2024 Mi Aplicación. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
