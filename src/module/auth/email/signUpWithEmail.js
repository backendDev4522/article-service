import {handleActions} from 'redux-actions'
import * as types from '../../actionTypes'
const initialState = {
    isLoadg: false,
    error: null,
}

export default handleActions({
    [types.SIGN_UP_WITH_EMAIL_REQUEST]: (state) => Object.assign({}, state, { isLoadg: true}),
    [types.SIGN_UP_WITH_EMAIL_SUCCESS]: (state) => Object.assign({}, state, { isLoading: false}),
    [types.SIGN_UP_WITH_EMAIL_FAILED]: (state,action) => Object.assign({}, state, { isLoading: true, error: action.payload})
},initialState)