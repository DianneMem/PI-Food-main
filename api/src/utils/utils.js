const diets = require('./dietasApi')
const { Dieta } = require('../db')


const cargarDbDiets = async () => {
    try {
        let dietExist = await Dieta.findAll();
        if (!dietExist.length) {
            await Dieta.bulkCreate(diets);
            console.log("DB cargada con dietas");
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { cargarDbDiets };