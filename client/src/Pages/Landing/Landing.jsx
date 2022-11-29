import React from 'react'
import s from '../Landing/Landing.module.css';
import { Link } from 'react-router-dom';


export default function Landing() {
  return (
    <div className={s.contenedor}>
      <h1>Foods Henry!!</h1>
      <div className={s.Bienvenida}>
        <p>Bienvenidos a la página de las mejores comidas para todos los gustos, ingresa!!</p>
      </div>
      <div className={s.button}>
        <Link to="/home">Ingresar</Link>
      </div>

    </div>
  )
}
