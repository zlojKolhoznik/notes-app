import "./bootstrap.min.css";
import { useEffect } from "react";

const changeHandler = (e, note) => {
    let exitMode = document.getElementById("exitMode");
    let title = document.getElementById("title");
    let content = document.getElementById("content");
    if (title.value !== note.title || content.value !== note.content) {
        exitMode.value = "unsaved";
    }
    else {
        exitMode.value = "saved";
    }
}

const saveHandler = (e, note) => {
    e.preventDefault();
    let title = e.target.title;
    if (!title.value) {
        title.classList.add("is-invalid");
        return;
    }
    let content = e.target.content;
    let exitMode = e.target.exitMode;
    exitMode.value = "saved";
    note.title = title.value;
    note.content = content.value;

    document.location.href = "/";
}

const cancelHandler = () => {
    let exitMode = document.getElementById("exitMode");
    exitMode.value = "saved";
    document.location.href = "/";
}

const unloadHandler = (e) => {
    e = e || window.event;
    let exitMode = document.getElementById("exitMode");
    if (exitMode.value === "unsaved") {
        if (e) {
            e.returnValue = "You have unsaved changes!";
        }
        return "You have unsaved changes!";
    }
}

export default function EditNote(props) {
    let {note} = props;
    useEffect(() => {
        window.addEventListener("beforeunload", unloadHandler);
        return () => {
            window.removeEventListener("beforeunload", unloadHandler);
        }
    })
    return (
        <div className="container">
            <form onSubmit={e => saveHandler(e, note)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control bg-dark text-light" id="title"
                           defaultValue={note.title}/>
                    <div className="invalid-feedback">You must specify a title!</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control bg-dark text-light" id="content" rows="5"
                              defaultValue={note.content} onChange={e => changeHandler(e, note)}/>
                </div>
                <div className="mb-3">
                    <span className="text-muted ms-2">Last changed: {note.lastChanged.toLocaleString()}</span>
                </div>
                <div className="mb-3">
                    <input type="hidden" id="exitMode"/>
                    <button type="submit" className="btn btn-primary me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={cancelHandler}>Cancel</button>
                </div>
            </form>
        </div>
    );
}