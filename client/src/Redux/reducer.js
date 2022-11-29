

const initialState = {
    recetas: [],
    dietas: [],
    recetaDetail: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET_ALL_RECETAS':
            return {
                ...state,
                recetas: payload
            }

        case 'GET_DIETAS':
            console.log(payload);
            return {
                ...state,
                dietas: payload
            }

        case 'GET-RECETAS_BY_NAME':
            return {
                ...state,
                recetas: payload
            }

        case 'GET_RECETAS_DETAILS':
            return {
                ...state,
                recetaDetail: payload
            }

        case 'FILTER_ORDEN_ALFAB':
            let listRecetas = [...state.recetas]

            if (payload === 'A-Z') {
                listRecetas.sort((a, b) => a.name.localCompare(b.name))
            }

            if (payload === 'Z-A') {
                listRecetas.sort((a, b) => a.name.localCompare(b.name))
            }

            return {
                ...state,
                recetas: listRecetas
            }
       
        
        default:
            return state;

    }
}

export default rootReducer;