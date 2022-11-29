import axios from 'axios';

const url = 'http://localhost:3001'

export function getAllRecetas() {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/recetas`, {

            })
            return dispatch({
                type: 'GET_ALL_RECETAS',
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDietas() {
    return async function (dispatch) {
        try {
            const dietas = await axios.get(`/dietas`)
            return dispatch({
                type: 'GET_DIETAS',
                payload: dietas.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getRecetasByName(name) {
    return async function (dispatch) {
        try {
            const searchName = await axios.get(`/recetas?name=${name}`)
            return dispatch({
                type: 'GET_RECETAS_BY_NAME',
                payload: searchName.data
            })
        } catch (error) {
            alert("Receta no encontrada!!")
            console.log(error);
        }
    }
}

export function getRecetasDetails(idReceta) {
    return async function (dispatch) {
        try {
            const recetasDetails = await axios.get(`/recetas/${idReceta}`)
            return dispatch({
                type: 'GET_RECETAS_DETAILS',
                payload: recetasDetails.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function ordenAlf(payload) {
    return {
        type: 'FILTER_ORDEN_ALFAB',
        payload
    }
}

export function filterByDiets(payload) {
    return {
        type: 'FILTER_BY_DIETS',
        payload
    }
}


export function createRecetas(payload) {
    return async function (dispatch) {
        try {
            let result = await axios.post(`/recetas/create`, payload);
    
            if (result.error) return alert(result.error);
            console.log(result);
            alert(result.data.message)
          
        }catch(error){
            console.log(error);
            alert('ERROR!! Receta ya existente!!')
        }
    }
}
