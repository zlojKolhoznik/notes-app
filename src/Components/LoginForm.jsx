import '../bootstrap.min.css';
import { signIn } from '../Firebase';
import { setUserId } from './App';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const submitHandler = (e, setError, navigate) => {
    e.preventDefault();
    const email = e.target.email;
    const password = e.target.password;
    [email, password].forEach((input) => {
        if (!input.value) {
            input.classList.add('is-invalid');
            return;
        }
        input.classList.remove('is-invalid');
    });
    signIn(email.value, password.value)
        .then((uid) => {
            // Signed in
            setUserId(uid);
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/user-not-found') {
                setError('unf');
            } else if (errorCode === 'auth/wrong-password') {
                setError('wp');
            } else {
                setError('ue');
            }
        });
}

export default function LoginForm() {
    let [error, setError] = useState(null);
    const navigate = useNavigate();
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center"
             style={{height: "97vh"}}>
            <div className="card col-4">
                <div className="card-body">
                    <h4 className="card-title">Log in</h4>
                    <form onSubmit={e => submitHandler(e, setError, navigate)}>
                        <div className="form-group mb-3 has-validation">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                   placeholder="Enter email"/>
                            <div className="invalid-feedback">Enter proper email address!</div>
                        </div>
                        <div className="form-group mb-3 has-validation">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password"/>
                            <div className="invalid-feedback">This field must not be empty!</div>
                        </div>
                        <div className="form-group mb-3">
                            <p className="text-muted">Don't have an account? <Link to="/signup">Sign up</Link></p>
                        </div>
                        <button type="submit" className="btn btn-primary">Log in</button>
                        {
                            error === 'unf' && (
                                <div className="alert alert-dismissible alert-danger mt-5">
                                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                                    <strong>Oh snap!</strong> User not found! <Link to="/signup">Sign up</Link> first!
                                </div>
                            )
                        }
                        {
                            error === 'wp' && (
                                <div className="alert alert-dismissible alert-danger mt-5">
                                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                                    <strong>Oh snap!</strong> Wrong password! <u>Try again!</u>
                                </div>
                            )
                        }
                        {
                            error === 'ue' && (
                                <div className="alert alert-dismissible alert-danger mt-5">
                                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                                    <strong>Oh snap!</strong> Unknown error! <u>Try again!</u>
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}