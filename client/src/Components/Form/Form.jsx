import React from 'react'
import s from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as actions from '../../Redux/actions'


export default function Form() {

    const [error, setError] = useState('');
    const [inputs, setInputs] = useState('');

    const allDietas = useSelector((state) => (state.dietas))


    function validar(newReceta) {
        //nombre

        let errors = {};
        if (!newReceta.nombre) {
            errors.nombre = true;
            errors.msj = 'Debes agregar un nombre!!';
        } else if (!newReceta.nombre.match(/^[A-Za-z ]+$/)) {
            errors.nombre = true;
            errors.msj = 'Solo puede contener letras!!';
        } else if (parseInt(newReceta.nombre.length) >= 25) {
            errors.nombre = true;
            errors.msj = 'Debe contener menos de 25 caracteres';
        }
        else if (newReceta.resumen_del_plato.length <= 10) {
            errors.resumen_del_plato = 'Debe tener por lo menos 10 caracteres';
        }
        return errors;
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getDietas())
    }, [dispatch])

    const [newReceta, setNewReceta] = useState({
        nombre: '',
        resumen_del_plato: '',
        health_score: '',
        paso_a_paso: '',
        dietas: [],
    });

    const handleInputs = (e) => {
        setNewReceta({ ...newReceta, [e.target.name]: e.target.value })
        setError(validar(newReceta))
        console.log(newReceta);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReceta.nombre || !newReceta.resumen_del_plato || !newReceta.health_score || !newReceta.paso_a_paso || !newReceta.dietas) {

            alert("No puede tener elementos vacíos!!")



        } else {
            dispatch(actions.createRecetas(newReceta))

            setNewReceta({
                nombre: '',
                resumen_del_plato: '',
                health_score: '',
                paso_a_paso: '',
                dietas: []
            });
        }
    };


    const handleDietas = (e) => {
        let value = e.target.value;
        console.log(value);
        if (value === '') {
            return alert('Este campo no puede ser vacio')
        }
        if (newReceta.dietas.includes(value)) {
            return alert('La dieta ya fue añadida a la lista')
        }
        setNewReceta({
            ...newReceta,
            dietas: [...newReceta.dietas, e.target.value]
        })

    }

    const eliminarDieta = (id) => {
        setNewReceta({
            ...newReceta,
            dietas: newReceta.dietas.filter((dieta) => dieta !== id)
        })
    }






    return (
        <div className={s.cotenedorForm}>
            <h1>Crear Receta</h1>
            <form className={s.form} onSubmit={(e) => handleSubmit(e)}>

                <div className={s.items}>
                    <label>Nombre: </label>
                    <input onChange={(e) => handleInputs(e)} type="text"
                        name='nombre'
                        value={newReceta.nombre} />
                    <span>{error.nombre && error.msj}</span>
                </div>
                <br />

                <div className={s.items}>
                    <label>Resumen del plato: </label>
                    <input type="text"
                        name='resumen_del_plato'
                        value={newReceta.resumen_del_plato}
                        onChange={(e) => handleInputs(e)} />
                    <span>{error.resumen_del_plato && error.resumen_del_plato} </span>
                </div>
                <br />

                <div className={s.items}>
                    <label> Nivel de comida saludable: </label>
                    <input type="number"
                        name='health_score'
                        value={newReceta.health_score}
                        onChange={(e) => handleInputs(e)} />
                    <span>{error.health_score && error.health_score}</span>
                </div>
                <br />
                <div className={s.items2}>

                    <div className={s.items}>
                        <label> Paso a paso: </label>
                        <textarea type="text"
                            name='paso_a_paso'
                            value={newReceta.paso_a_paso}
                            onChange={(e) => handleInputs(e)} />
                        <span>{error.paso_a_paso && error.paso_a_paso}</span>
                    </div>
                    <br />

                    <div className={s.items}>
                        <label>Tipo de Dietas: </label>
                        <select name="dietas" id="" onChange={(e) => handleDietas(e)}>
                            <option selected={true} disabled={true} value={" "}> Selecciona una dieta: </option>
                            {allDietas.map((dieta) => {
                                return (
                                    <option key={dieta.id} value={dieta.id}>{dieta.name} </option>
                                )
                            })}
                        </select>
                        <span>{error.dieta && error.dieta}</span>
                        <div className={s.containerDietasSeleccionadas}>
                            {newReceta.dietas?.map((d, i) => {
                                let dieta = allDietas.filter((e) => e.id === d)
                                return <div className={s.dieta} key={i} onClick={(e) => eliminarDieta(dieta[0].id)}>{dieta[0].name}</div>
                            })}
                        </div>
                    </div>
                </div>

                <div className={s.button}>
                    <button type='submit' >Enviar </button>


                </div>
            </form>
        </div >
    )
}
