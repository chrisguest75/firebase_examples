import { initializeApp } from "firebase/app";

const firebaseConfig = {
    "projectId": process.env.REACT_APP_PROJECT_ID,
    "appId": process.env.REACT_APP_APP_ID,
    "storageBucket": process.env.REACT_APP_STORAGEBUCKET,
    "apiKey": process.env.REACT_APP_APIKEY,
    "authDomain": process.env.REACT_APP_AUTHDOMAIN,
    "messagingSenderId": process.env.REACT_APP_MESSAGINGSENDERID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
