import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export let db;
export let app;

export default  function initializeFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCv5boKiHH6jXk6Cp491m7oOLPqtkHB7Ww",
        authDomain: "step-exam.firebaseapp.com",
        projectId: "step-exam",
        storageBucket: "step-exam.appspot.com",
        messagingSenderId: "871581441255",
        appId: "1:871581441255:web:f6ed273b1b4214ab6ad642"
    };
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
}