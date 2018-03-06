import constants from '../constants'

const INITIAL_STATE = {
    isAuth: false,
    currentUser: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case constants.AUTH_SIGN_UP_USER:
            return {
                ...state
            }
        case constants.AUTH_LOG_IN_USER:
            return {
                ...state
            }
        case constants.AUTH_REGISTER_FOR_PUSH_NOTIFICATIONS_ASYNC:
            return {
                ...state,
                currentUser: action.user
            }
        case constants.AUTH_LOG_IN_WITH_FACEBOOK:
            return {
                ...state,
            }
        case constants.AUTH_USER_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            }
        case constants.AUTH_USER_SIGN_OUT:
            return {
                ...state,
                isAuth: action.isAuth
            }
        default:
            return state
    }
}