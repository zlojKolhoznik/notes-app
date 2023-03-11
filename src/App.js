import './App.css';
import './bootstrap.min.css';
import NavBar from "./NavBar";
import EditNote from "./EditNote";
import {Route, Routes, useNavigate} from "react-router-dom";
import NotesContainer from "./NotesContainer";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {useState} from "react";
import {app} from "./Firebase";
import {getFirestore, doc, getDocs, query, collection, where} from "firebase/firestore";

export const notes = [];
export let setUserId;

let userId;

const getNotes = (reload) => {
    let db = getFirestore(app);
    let q = query(collection(db, "notes"), where("userId", "==", userId));
    getDocs(q).then(snapshot => {
        snapshot.forEach(doc => {
            if (notes.filter(note => note.id === doc.data().id).length === 0) {
                notes.push(doc.data());
            }
        });
        reload();
    });
}

export const useReload = () => {
    let [val, setVal] = useState(0);
    return () => setVal(val + 1);
}

function App() {
    [userId, setUserId] = useState(null);
    let reload = useReload();
    if (!userId && document.location.pathname !== '/login' && document.location.pathname !== '/signup') {
        document.location.href = '/login';
    }
    if(userId && notes.length <= 0) {
        getNotes(reload);
    }
    return (
        <div className="App">
            {userId && <NavBar logOut={() => setUserId(null)} reload={reload}/>}
            <Routes>
                <Route index element={<NotesContainer notes={notes}/>}/>
                <Route path="/favorites" element={<NotesContainer notes={notes.filter(note => note.isFavorite)} />}/>
                <Route path={"/notes/:id"} element={<EditNote notes={notes}/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/signup" element={<RegisterForm/>}/>
            </Routes>
        </div>
    );
}

export default App;
