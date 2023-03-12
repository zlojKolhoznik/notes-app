import '../bootstrap.min.css';
import { setUserId } from './App';
import { signUp } from '../Firebase';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const submitHandler = (e, setError, navigate) => {
    e.preventDefault();
    const email = e.target.email;
    const password = e.target.password;
    const confirmPassword = e.target.confirmPassword;
    [email, password, confirmPassword].forEach((input) => {
        if (!input.value) {
            input.classList.add('is-invalid');
            return;
        }
        input.classList.remove('is-invalid');
    });
    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
        return;
    }
    signUp(email.value, password.value)
        .then((uid) => {
            // Signed in
            setUserId(uid);
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                setError('eaiu');
            } else if (errorCode === 'auth/weak-password') {
              setError('wp');
            } else {
                setError('ue');
            }
        });
}

export default function RegisterForm() {
    let [error, setError] = useState(null);
    const navigate = useNavigate();
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center"
             style={{height: "97vh"}}>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Register</h4>
                    <form onSubmit={(e) => submitHandler(e, setError, navigate)}>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password"/>
                        </div>
                        <div className="form-group mb-3 has-validation">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword"
                                   name="confirmPassword"/>
                            <p className="invalid-feedback">Passwords don't match!</p>
                        </div>
                        <div className="form-group mb-3">
                            <p className="text-muted">Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                        {
                            error === 'eaiu' && (
                                <div className="alert alert-danger alert-dismissible mt-5">
                                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                                    <strong>Oh snap!</strong> This email is already in use! Try another one or <Link
                                    to="/login">log in</Link>.
                                </div>
                            )
                        }
                        {
                            error === 'wp' && (
                                <div className="alert alert-danger alert-dismissible mt-5">
                                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                                    <strong>Oh snap!</strong> The password is too weak! Try another one.
                                </div>
                            )
                        }
                        {
                            error === 'ue' && (
                                <div className="alert alert-danger alert-dismissible mt-5">
                                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                                    <strong>Oh snap!</strong> An unknown error occurred! Try again later.
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}