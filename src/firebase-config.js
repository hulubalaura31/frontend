import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAw3Oz63sepuvEcmXeFKkleVVFzDILKJww",
    authDomain: "searchbar-task.firebaseapp.com",
    projectId: "searchbar-task",
    storageBucket: "searchbar-task.appspot.com",
    messagingSenderId: "111103411623",
    appId: "1:111103411623:web:468dea2833c8998d626282",
    measurementId: "G-WY840WDS43"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);