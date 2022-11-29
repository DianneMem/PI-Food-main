import React from 'react'
import s from './CrearReceta.module.css'
import NavBar from '../../Components/NavBar/NavBar';
import Form from '../../Components/Form/Form';



export default function CrearReceta() {
  return (
    <div className={s.container}>
      < NavBar />

      <div className={s.containerForm}>
        <Form />
      </div>
    </div>
  )
}
