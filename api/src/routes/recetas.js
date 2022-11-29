const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env
const { Receta, Dieta } = require('../db');
const router = Router();
const ApiJson = require("../utils/ApiJson.json")



router.get('/', async (req, res) => {



    const { name } = req.query;
    try {
        // let apiInfo = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=eb03026795b5406ebc9eb762e927701c&number=100&addRecipeInformation=true")


        let datosApi = await ApiJson?.map((e) => {
            return {
                id: e.id,
                nombre: e.title,
                resumen_de_plato: e.sumary,
                health_score: e.healthScore,
                paso_a_paso: e.analyzedInstructions,
                image: e.image,
                tipo_de_plato: e.dishTypes,
                Dietas: e.diets,
                created: false,
            }
        })

        //Para relacionar los datos de la api con los creados busqué los datos de la api y los guardé en una variable

        let recetasDb = await Receta.findAll({
            include: {
                model: Dieta
            }
        })

        //Uní en una nueva variable los dstos de la api y los traídos de la Db

        let recetasAll = datosApi.concat(recetasDb)


        //Busco los datos por nombre

        if (name) {
            const busqueda = recetasAll.filter((recetas) =>
                recetas.nombre.toLowerCase().includes(name));
            if (busqueda) {
                return res.status(200).json(busqueda);
            } else {
                return res.status(400).json({ error: 'No se encontro la busqueda.' })
            }
        }
        res.status(200).json(recetasAll);
    } catch (error) {
        console.log(error);
    };

})



router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        if (id.includes('-')) {
            console.log(id);
            let result = await Receta.findByPk(id, {
                include: {
                    model: Dieta
                }
            })
            return res.status(200).json(result);
        } else {
            // const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=eb03026795b5406ebc9eb762e927701c`)

            const result = ApiJson.filter((element) => parseInt(element.id) === parseInt(id))
            console.log(result);
            if (result) {
                res.status(200).json(result[0])
            } else {
                res.status(400).json({ error: 'No se encontro la receta' })
            }
        }
    }
    catch (error) {
        console.log(error);
    }
})


router.post('/create', async (req, res) => {
    let { nombre, resumen_del_plato, health_score, paso_a_paso, dietas } = req.body;
    try {
        let existReceta = await Receta.findAll({ where: { nombre: nombre } })

        if (!existReceta.length) {
            let newReceta = await Receta.create({
                nombre,
                resumen_del_plato,
                health_score,
                paso_a_paso,
                created: true
            })
            let resultado = await newReceta.setDieta(dietas);
            res.status(200).json({ message: 'Receta creada con éxito!!' })
        }
        else {
            res.status(400).json({ error: 'Receta existente!' })

        }
    } catch (error) {
        console.log(error);
    }
})

//-------------------------------------------------------
module.exports = router;