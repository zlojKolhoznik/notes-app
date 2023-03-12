import '../bootstrap.min.css';
import { useEffect } from 'react';
import { updateNote } from '../Firebase';
import { useParams, useNavigate } from 'react-router-dom';

const changeHandler = (e, note) => {
    let exitMode = document.getElementById('exitMode');
    let title = document.getElementById('title');
    let content = document.getElementById('content');
    if (title.value !== note.title || content.value !== note.content) {
        exitMode.value = 'unsaved';
    }
    else {
        exitMode.value = 'saved';
    }
}

const saveHandler = (e, note, navigate) => {
    e.preventDefault();
    let title = e.target.title;
    if (!title.value) {
        title.classList.add('is-invalid');
        return;
    }
    let content = e.target.content;
    let exitMode = e.target.exitMode;
    exitMode.value = 'saved';
    note.title = title.value;
    note.content = content.value;
    note.lastChanged = {seconds: Math.floor(new Date().getTime() / 1000)};
    updateNote(note);
    navigate('/');
}

const cancelHandler = navigate => {
    let exitMode = document.getElementById('exitMode');
    exitMode.value = 'saved';
    navigate('/');
}

const unloadHandler = event => {
    event = event || window.event;
    let exitMode = document.getElementById('exitMode');
    if (exitMode.value === 'unsaved') {
        if (event) {
            event.returnValue = 'You have unsaved changes!';
        }
        return 'You have unsaved changes!';
    }
}

export default function EditNote(props) {
    let params = useParams();
    let note = props.notes.find(note => note.id == params.id);
    let navigate = useNavigate();
    console.log(props.notes)
    useEffect(() => {
        window.addEventListener('beforeunload', unloadHandler);
        return () => {
            window.removeEventListener('beforeunload', unloadHandler);
        }
    })
    return (
        <div className="container mw-100">
            <form onSubmit={e => saveHandler(e, note, navigate)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control bg-dark text-light" id="title"
                           defaultValue={note.title} onChange={e => changeHandler(e, note)}/>
                    <div className="invalid-feedback">You must specify a title!</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control bg-dark text-light" id="content" rows="5"
                              defaultValue={note.content} onChange={e => changeHandler(e, note)}/>
                </div>
                <div className="mb-3">
                    <span className="text-muted">Last changed: {new Date(note.lastChanged.seconds * 1000).toLocaleString()}</span>
                </div>
                <div className="mb-3">
                    <input type="hidden" id="exitMode"/>
                    <button type="submit" className="btn btn-primary me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => cancelHandler(navigate)}>Cancel</button>
                </div>
            </form>
        </div>
    );
}