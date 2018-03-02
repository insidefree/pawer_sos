import constants from '../constants'

const INITIAL_STATE = {
    selectedAcident: null,
    acidentsList: [],
    refreshLoadingAcidents: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case constants.SELECT_ACIDENT:
            return {
                ...state,
                selectedAcident: state.acidentsList.filter(acident => acident.id == acident.payload)[0]
            }
        case constants.FETCH_ACIDENTS_LIST:
            return {
                ...state,
                acidentsList: action.payload,
            }
        case constants.FETCH_ACIDENTS_LIST_FIRST_LOAD:
            return {
                ...state,
                acidentsList: action.payload.acidentsList,
            }
        case constants.FETCH_ACIDENTS_LIST_BY_BATCH:
            return {
                ...state,
                acidentsList: state.acidentsList.concat(action.payload.acidentsList),
            }
        case constants.START_LOADING_ACIDENTS:
            return {
                ...state,
                loading: true,
            }
        case constants.END_LOADING_ACIDENTS:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}