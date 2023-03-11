import "./bootstrap.min.css";
import NotePreview from "./NotePreview";

export default function NotesContainer(props) {
    let {notes} = props;
    return (
        <div className="container mw-100">
            <div className="row">
                {notes.map(note => <NotePreview id={note.id} key={note.id} notes={notes}/>)}
            </div>
        </div>
    );
}