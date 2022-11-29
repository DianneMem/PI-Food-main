const { Router } = require('express');
const { Dieta } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const infoDb = await Dieta.findAll();
        console.log(infoDb);
        return res.status(200).json(infoDb);
    } catch (error) {
        console.log(error);
    }
})



module.exports = router;
