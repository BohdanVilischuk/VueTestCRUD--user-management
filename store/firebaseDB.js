import firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBSHq_4BEgR9OqNpJfHO6NN79DiQGEdkTs",
    authDomain: "vuedata-91be3.firebaseapp.com",
    projectId: "vuedata-91be3",
    storageBucket: "vuedata-91be3.appspot.com",
    messagingSenderId: "348011366248",
    appId: "1:348011366248:web:6bcbcce0ce16767d60f8dd",
    measurementId: "G-GFM63RNKBM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()