const { Router } = require('express');
const recetas = require('./recetas')
const dietas = require('./dietas')
const axios =  require('axios');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const { Receta, Dieta } = require('../db')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recetas', recetas)
router.use('/dietas', dietas)



module.exports = router;
