import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import firebase from 'firebase'
import * as authActions from './module/auth/actions'

/**
 * connected-react-router를 사용하기 위해서 history를 직접 만들어야 한다.
 * history.push기능을 redux에서 바로 사용하기 위해 추가
 */
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router'

// module/index.js -> 다음과 같이 index.js는 생략 가능
import { configureStore } from './module'

const history = createBrowserHistory();

// Redux store 생성
const store = configureStore(history);


//firebase 환경변수
var firebaseConfig = {
    apiKey: "AIzaSyDuleCznnA-Rppk2twoeeBS2lZ8tAKs_nA",
    authDomain: "react-board-6c9f9.firebaseapp.com",
    databaseURL: "https://react-board-6c9f9.firebaseio.com",
    projectId: "react-board-6c9f9",
    storageBucket: "react-board-6c9f9.appspot.com",
    messagingSenderId: "324400022113",
    appId: "1:324400022113:web:257336cdf4c05417"
  };
//firebase 초기화

  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged((user)=>{
      store.dispatch(authActions.updateUser(user));
      // if(user){
      //   store.dispatch(push('/'))
      // } else {
      //   store.dispatch(push('/sign-in'))
      // }
  })

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
