import './bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
    let path = window.location.pathname;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">My Notes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${path==='/' ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${path==='/favorites' ? 'active' : ''}`} to="/favorites">Favorite notes</Link>
                        </li>
                    </ul>
                    <form className="d-flex col-4">
                        <input className="form-control me-sm-2" type="search" placeholder="Search" />
                        <button className="btn btn-secondary my-2 my-sm-0 me-sm-5" type="submit">Search</button>
                    </form>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Log out</button>
                </div>
            </div>
        </nav>
    );
}