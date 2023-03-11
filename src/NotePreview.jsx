import "./bootstrap.min.css";
import { Link } from "react-router-dom";
import { useReload } from "./App";
import { app } from "./Firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const addToFavorites = (note, reload) => {
    if ("isFavorite" in note) {
        note.isFavorite = !note.isFavorite;
    } else {
        note.isFavorite = true;
    }

    let db = getFirestore(app);
    let noteRef = doc(db, "notes", `${note.id}`);
    updateDoc(noteRef, {
        isFavorite: note.isFavorite
    })

    reload();
}

export default function NotePreview(props) {
    let note = props.notes.find(note => note.id === +props.id);
    let reload = useReload()
    return (
        <div className="card border-primary m-4 p-0" style={{maxWidth: "20rem", height: "15rem", overflow: "hidden"}}>
            <div className="card-header text-muted d-flex justify-content-between align-items-center">
                {new Date(note.lastChanged.seconds * 1000).toLocaleString()}
                <button className="btn btn-link" onClick={() => addToFavorites(note, reload)}>
                    <i className={`bi bi-heart${note.isFavorite ? '-fill' : ''}`}></i>
                </button>
            </div>
            <Link to={`/notes/${note.id}`} className="text-decoration-none text-light">
                <div className="card-body">
                    <h4 className="card-title">{note.title}</h4>
                    <p className="card-text">{note.content.length >= 100 ? note.content.slice(0, 99) + "..." : note.content}</p>
                </div>
            </Link>
        </div>
    );
}