import React from 'react';
import s from './Card.module.css'
import { Link } from 'react-router-dom';
import imageDefault from '../../images/food.jpg'


export default function Card({id, nombre, imagen, dietas, dietaDb}) {
  console.log(dietaDb && dietaDb, 'asdasd');
  return (
    <div className={s.card}>
      <h3>{nombre}</h3>
      <div className={s.imagen}>
        <img src={imagen ? imagen : imageDefault} alt="" />
        </div>
        <div className={s.dietas}>
        <span>Tipos de dietas: {dietas ? dietas : dietaDb?.map((e) => e.name)}</span>
        </div>
        <div className={s.button}>
          
        <Link to={`/receta/${id}`}>Ver más</Link>
        </div>
    </div>
  )
}
