import constants from '../constants'
import { acidentsRef } from '../firebase'

export const fetchAcidentsFirstLoad = () => {
    return dispatch => {
        dispatch({ type: constants.START_LOADING_ACIDENTS })
        var lastKnownAcident = null
        var pageQuery = acidentsRef
        pageQuery
            .on('value', snapshot => {
                let acidentsList = []
                snapshot.forEach(childSnapshot => {
                    const { founderName, phoneNumber, dwLink } = childSnapshot.val()
                    acidentsList.push({ founderName, phoneNumber, dwLink })
                    lastKnownAcident = childSnapshot.val()
                });
                dispatch({ type: constants.END_LOADING_ACIDENTS })
                dispatch({
                    type: constants.FETCH_ACIDENTS_LIST_FIRST_LOAD,
                    payload: { acidentsList }
                })
            })
    }
}