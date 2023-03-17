import '../bootstrap.min.css';
import NavBar from './NavBar';
import EditNote from './EditNote';
import NotesContainer from './NotesContainer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useState } from 'react';
import { getNotes } from '../Firebase';
import { Route, Routes } from 'react-router-dom';
import {ToastContainer} from "react-toastify";

export const notes = [];
export let setUserId;
export let userId;

export const useReload = () => {
    let [val, setVal] = useState(0);
    return () => setVal(val + 1);
}

export default function App() {
    [userId, setUserId] = useState(null);
    let reload = useReload();
    if (!userId && document.location.pathname !== '/login' && document.location.pathname !== '/signup') {
        document.location.href = '/login';
    }
    if(userId && notes.length <= 0) {
        getNotes(notes, userId).then(() => reload());
    }
    return (
        <div className="App">
            <ToastContainer/>
            {userId && <NavBar logOut={() => setUserId(null)} reload={reload}/>}
            <Routes>
                <Route index element={<NotesContainer notes={notes}/>}/>
                <Route path="/favorites" element={<NotesContainer notes={notes.filter(note => note.isFavorite)} />}/>
                <Route path="/notes/:id" element={<EditNote notes={notes}/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/signup" element={<RegisterForm/>}/>
            </Routes>
        </div>
    );
}
