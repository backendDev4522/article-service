import {combineReducers} from 'redux'
import signOut from './common/signOut'
import signInWithEmail from './email/signInWithEmail'
import signUpWithEmail from './email/signUpWithEmail'
import signInWithGoogle from './google/signInWithGoogle'
import signInWithFacebook from './facebook/signInWithFacebook'
import user from './common/user'

export default combineReducers({
    signOut,
    signInWithEmail,
    signUpWithEmail,
    signInWithFacebook,
    signInWithGoogle,
    user,
    
})

