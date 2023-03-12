import { initializeApp } from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {
    collection,
    doc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where,
    setDoc,
    serverTimestamp,
    deleteDoc
} from 'firebase/firestore';

export let app;

export default function initializeFirebase() {
    const firebaseConfig = {
        apiKey: 'AIzaSyCv5boKiHH6jXk6Cp491m7oOLPqtkHB7Ww',
        appId: '1:871581441255:web:f6ed273b1b4214ab6ad642',
        authDomain: 'step-exam.firebaseapp.com',
        messagingSenderId: '871581441255',
        projectId: 'step-exam',
        storageBucket: 'step-exam.appspot.com'
    };
    app = initializeApp(firebaseConfig);
}

export const getNotes = async (arr, userId) => {
    let db = getFirestore(app);
    let q = query(collection(db, 'notes'), where('userId', '==', userId));
    let snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        if (arr.filter(note => note.id === doc.data().id).length <= 0) {
            arr.push(doc.data());
        }
    });
}

export const updateNote = data => {
    let db = getFirestore(app);
    let noteRef = doc(db, 'notes', data.id);
    updateDoc(noteRef, {
        title: data.title,
        content: data.content,
        lastChanged: serverTimestamp()
    });
}

export const setFavorite = note => {
    let db = getFirestore(app);
    let noteRef = doc(db, 'notes', note.id);
    updateDoc(noteRef, {isFavorite: note.isFavorite});
}

export const addNote = async note => {
    let db = getFirestore(app);
    let noteRef = doc(db, 'notes', note.id);
    await setDoc(noteRef, {
        content: note.content,
        id: note.id,
        lastChanged: serverTimestamp(),
        title: note.title,
        userId: note.userId
    });
}

export const removeNote = note => {
    let db = getFirestore(app);
    let noteRef = doc(db, 'notes', note.id);
    deleteDoc(noteRef);
}

export const signIn = async (email, password) => {
    let auth = getAuth(app);
    try {
        let result = await signInWithEmailAndPassword(auth, email, password);
        return result.user.uid;
    } catch (error) {
        throw error;
    }
}

export const signUp = async (email, password) => {
    let auth = getAuth(app);
    try {
        let result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user.uid;
    } catch (error) {
        throw error;
    }
}
