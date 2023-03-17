import '../bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {signIn} from '../Firebase';
import {setUserId} from './App';
import {createRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast, Slide} from "react-toastify";

let emailRef = createRef();
let passwordRef = createRef();

const submitHandler = (e, navigate) => {
    e.preventDefault();
    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;
    let hasError = false;
    [emailInput, passwordInput].forEach((input) => {
        if (!input.value || input.value === '' || input.value === ' ') {
            input.classList.add('is-invalid');
            hasError = true;
            return;
        }
        input.classList.remove('is-invalid');
    });
    if (hasError) {
        return;
    }
    signIn(emailInput.value, passwordInput.value)
        .then((uid) => {
            // Signed in
            setUserId(uid);
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/user-not-found') {
                toast.error('User with such email not found! Check your email or sign up!', {
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
            } else if (errorCode === 'auth/wrong-password') {
                toast.error('Wrong password! Try again!', {
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
                toast.error('Uknnown error! Try again!', {
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

export default function LoginForm() {
    const navigate = useNavigate();
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center"
             style={{height: "97vh"}}>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Log in</h4>
                    <form onSubmit={e => submitHandler(e, navigate)}>
                        <div className="form-group mb-3 has-validation">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                   placeholder="Email" ref={emailRef}/>
                            <div className="invalid-feedback">Enter proper email address!</div>
                        </div>
                        <div className="form-group mb-3 has-validation">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" ref={passwordRef}/>
                            <div className="invalid-feedback">This field must not be empty!</div>
                        </div>
                        <div className="form-group mb-3">
                            <p className="text-muted">Don't have an account? <Link to="/signup">Sign up</Link></p>
                        </div>
                        <button type="submit" className="btn btn-primary">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}