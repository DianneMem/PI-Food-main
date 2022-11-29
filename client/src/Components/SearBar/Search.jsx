import React from 'react'
import s from './Search.module.css';


export default function Search({searchRecetas}) {
  return (
    <div className={s.buscar}>
      <input type='search' placeholder='Busca tu receta' onChange={(e) => searchRecetas(e)}/>
      <button className={s.btn} type='submit'>🔍</button>
    </div>
  )
}
