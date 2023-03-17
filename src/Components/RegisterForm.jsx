import '../bootstrap.min.css';
import { setUserId } from './App';
import { signUp } from '../Firebase';
import {createRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Slide } from "react-toastify";

let emailRef = createRef();
let passwordRef = createRef();
let confirmPasswordRef = createRef();

const submitHandler = (e, navigate) => {
    e.preventDefault();
    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;
    const confirmPasswordInput = confirmPasswordRef.current;
    let hasError = false;
    [emailInput, passwordInput, confirmPasswordInput].forEach((input) => {
        if (!input.value) {
            input.classList.add('is-invalid');
            hasError = true;
            return;
        }
        input.classList.remove('is-invalid');
    });
    if (hasError) {
        return;
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.classList.add('is-invalid');
        return;
    }
    signUp(emailInput.value, passwordInput.value)
        .then((uid) => {
            // Signed in
            setUserId(uid);
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                toast.error('This email is already in use! Try again or log in!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    closeButton: true,
                    transition: Slide,
                    theme: 'dark'
                });
            } else if (errorCode === 'auth/weak-password') {
                toast.error('Your password is too weak! Consider using a stronger password!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    closeButton: true,
                    transition: Slide,
                    theme: 'dark'
                });
            } else {
                toast.error('Unknown error occurred! Try later!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    closeButton: true,
                    transition: Slide,
                    theme: 'dark'
                });
            }
        });
}


export default function RegisterForm() {
    const navigate = useNavigate();
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center"
             style={{height: "97vh"}}>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Register</h4>
                    <form onSubmit={(e) => submitHandler(e, navigate)}>
                        <div className="form-group mb-3 has-validation">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" ref={emailRef}/>
                            <p className="invalid-feedback">Email is required!</p>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="form-group mb-3 has-validation">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" ref={passwordRef}/>
                            <p className="invalid-feedback">Password is required!</p>
                        </div>
                        <div className="form-group mb-3 has-validation">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword"
                                   name="confirmPassword" ref={confirmPasswordRef}/>
                            <p className="invalid-feedback">Passwords don't match!</p>
                        </div>
                        <div className="form-group mb-3">
                            <p className="text-muted">Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}