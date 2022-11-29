import s from "./Details.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRecetasDetails } from '../../Redux/actions'
import foodDefault from '../../images/food.jpg'


export default function Details(props) {
    const id = props.match.params.id;


    const dispatch = useDispatch();
    const receta = useSelector((state) => state.recetaDetail);

    useEffect(() => {
        dispatch(getRecetasDetails(id));
    }, [dispatch, id]);
    console.log(receta);
    
    return (
        <div className={s.containerTotal}>
            <div className={s.containerImagePts}>
                <img className={s.img} src={receta.image ? receta.image : foodDefault} alt="imagen" />
                <div className={s.puntuacion}>
                    <span>Puntuación: </span>
                    <p>{receta.health_score ? receta.health_score : receta.healthScore}</p>
                </div>
            </div>
            
            <h1>{receta.title ? receta.title : receta.nombre}</h1>

            <p>Resumen: <br />
                {
                    receta.summary ?
                        receta.summary.replaceAll(/<\/?[^>]+(>|$)/g, "")
                        : receta.resumen_del_plato
                }
            </p>

            <div>Paso a paso:
                {receta.analyzedInstructions ?
                    { ...receta.analyzedInstructions }[0]?.steps?.map((step, i) => {
                        return (
                            <div>
                                <span>Paso {i + 1}: {step.step}</span><br />
                            </div>
                        )
                    })
                    : receta.paso_a_paso}
            </div>

            <div className={s.types}>
                <p>Tipo de dieta: {receta.diets ? receta.diets : receta.Dieta?.map((e) => e.name)}</p>
                {receta.dishTypes && <p>Tipo de plato: {receta.dishTypes}</p>}
            </div>


        </div>
    )
}
