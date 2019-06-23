import {createAction} from 'redux-actions'
import * as articleAPI from '../../api/articleAPI'
import * as types from '../actionTypes'
export const updateUser = createAction(types.UPDATE_USER)

const addArticleRequest = createAction(types.ADD_ARTICLE_REQUEST)
const addArticleSuccess = createAction(types.ADD_ARTICLE_SUCCESS)
export const addArticleFailed = createAction(types.ADD_ARTICLE_FAILED)

export const addArticle = ({file, content}) => {
    return (dispatch, getState) =>{
        dispatch(addArticleRequest());
        const state = getState();
        const userId = state.auth.user.uid;
        const userDisplayName = state.auth.user.displayName
        const userProfileUrl = state.auth.user.photoURL;



        articleAPI.addArticle({
            file,
            content,
            userId,
            userDisplayName,
            userProfileUrl,
        })
        .then(() =>{
            dispatch(addArticleSuccess())
        })
        .catch((error)=>{
            dispatch(addArticleFailed(error))
        })
    }
}

/**
 * 페이스북 로그인
 * 
 */

const signInWithFacebookRequest = createAction(types.SIGN_IN_WITH_FACEBOOK_REQUEST);
const signInWithFacebookSuccess = createAction(types.SIGN_IN_WITH_FACEBOOK_SUCCESS);
export const signInWithFacebookFailed = createAction(types.SIGN_IN_WITH_FACEBOOK_FAILED);


export const signInWithFacebook = () => {
    return (dispatch) =>{
        dispatch(signInWithFacebookRequest());
        authAPI.signInWithFacebook()
            .then(()=>{
                dispatch(signInWithFacebookSuccess())
            })
            .catch((error)=>{
                dispatch(signInWithFacebookFailed())
            })
    }
}

const signInWithGoogleRequest = createAction(types.SIGN_IN_WITH_GOOGLE_REQUEST);
const signInWithGoogleSuccess = createAction(types.SIGN_IN_WITH_GOOGLE_SUCCESS);
export const signInWithGoogleFailed = createAction(types.SIGN_IN_WITH_GOOGLE_FAILED);


export const signInWithGoogle = () => {
    return (dispatch) =>{
        dispatch(signInWithGoogleRequest());
        authAPI.signInWithGoogle()
            .then(()=>{
                dispatch(signInWithGoogleSuccess())
            })
            .catch((error)=>{
                dispatch(signInWithGoogleFailed())
            })
    }
}


const signUpWithEmailRequest = createAction(types.SIGN_UP_WITH_EMAIL_REQUEST);
const signUpWithEmailSuccess = createAction(types.SIGN_UP_WITH_EMAIL_SUCCESS);
export const signUpWithEmailFailed = createAction(types.SIGN_UP_WITH_EMAIL_FAILED);


export const signUpWithEmail = (email, password) => {
    return (dispatch) =>{
        dispatch(signUpWithEmailRequest());
        authAPI.signUpWithEmail(email,password)
            .then(()=>{
                dispatch(signUpWithEmailSuccess())
            })
            .catch((error)=>{
                dispatch(signUpWithEmailFailed())
            })
    }
}


const signOutRequest = createAction(types.SIGN_OUT_REQUEST);
const signOutSuccess = createAction(types.SIGN_OUT_SUCCESS);
const signOutFailed = createAction(types.SIGN_OUT_FAILED);


export const signOut = () => {
    return (dispatch) =>{
        dispatch(signOutRequest());
        authAPI.signOut()
            .then(()=>{
                dispatch(signOutSuccess())
            })
            .catch((error)=>{
                dispatch(signOutFailed())
            })
    }
}



