import React from 'react';
import s from './NavBar.module.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className={s.navBar}>
      <h1>Foods</h1>
      <ul>
        <Link to='/home'><li>Home</li></Link>
        <Link to='/crear/receta'><li>Recetas</li> </Link>
      </ul>
    </nav>

  )
}
