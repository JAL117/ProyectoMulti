import React from 'react';
import { Link } from 'react-router-dom';
import motoSafe from '../assets/image/logoMotoSafe.png';
import '../Style/inicio.css';

export const Inicio = () => {
  return (
      <div className="inicio-container">
        <div className="inicio-contact-links">
          <h2>Contactanos</h2>
          <h2>Acerca de</h2>
        </div>
        <h1 className='titulo'> MOTOSAFE </h1>
        <div className="inicio-form">
          <div>
            <h2> Inicio de Sesión </h2>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Usuario"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
              />
            </div>
            <div>
              <Link to="/home">
                <button type="submit">Aceptar</button>
              </Link>
            </div>
          </div>
          <div>
            <img src={motoSafe} alt="Logo Motosafes" />
          </div>
        </div>
      </div>
  );
}