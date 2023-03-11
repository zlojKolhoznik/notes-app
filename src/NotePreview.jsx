import "./bootstrap.min.css";
import { Link } from "react-router-dom";

export default function NotePreview(props) {
    let {note} = props;
    return (
        <div className="card border-primary m-4 p-0" style={{maxWidth: "20rem"}}>
            <div className="card-header text-muted d-flex justify-content-between align-items-center">
                {note.lastChanged.toLocaleString()}
                <button className="btn btn-link">
                    <i className="bi bi-heart"></i>
                </button>
            </div>
            <Link to={`/notes/${note.id}`} className="text-decoration-none text-light">
                <div className="card-body">
                    <h4 className="card-title">{note.title}</h4>
                    <p className="card-text">{note.content}</p>
                </div>
            </Link>
        </div>
    );
}