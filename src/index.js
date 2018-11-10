import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBk8sT3zd_pvVEOiRWw02PwNuYMkh_dwo8",
    authDomain: "pseudoinst.firebaseapp.com",
    databaseURL: "https://pseudoinst.firebaseio.com",
    projectId: "pseudoinst",
    storageBucket: "pseudoinst.appspot.com",
    messagingSenderId: "583749657015"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
