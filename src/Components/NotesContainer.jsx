import '../bootstrap.min.css';
import NotePreview from './NotePreview';
import FloatingButton from './FloatingButton';
import { addNote } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { notes, userId } from './App';
import {Slide, toast} from "react-toastify";

const createNote = navigate => {
    let time = Math.floor(new Date().getTime() / 1000);
    let note = {
        id: `${time}_${userId}`,
        title: 'New note',
        content: '',
        userId: userId,
        lastChanged: {seconds: time}
    }
    notes.push(note);
    addNote(note).then(() => {
        toast.success('Note created successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            closeButton: true,
            draggable: false,
            transition: Slide,
            theme: 'dark'
        });
        navigate(`/notes/${note.id}`);
    });
}

export default function NotesContainer(props) {
    let {notes} = props;
    let navigate = useNavigate();
    return (
        <div className="container mw-100">
            <div className="row">
                {notes.map(note => {
                    return <NotePreview id={note.id} key={note.id} notes={notes}/>
                })}
            </div>
            <FloatingButton content={<i className="bi bi-pencil-fill"></i>} onClick={() => createNote(navigate)} />
        </div>
    );
}