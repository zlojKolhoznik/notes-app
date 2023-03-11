import "./bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { app } from "./Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUserId } from "./App";
import {useState} from "react";

const submitHandler = (e, setError, navigate) => {
    e.preventDefault();
    const email = e.target.email;
    const password = e.target.password;

    // TODO: Remove when development is done
    if (password.value === "1") {
        setUserId("32aZNzcSVEh0Dvk8MPNJOQHstuw2");
        navigate('/');
        return;
    }

    [email, password].forEach((input) => {
        if (!input.value) {
            input.classList.add('is-invalid');
            return;
        }
        input.classList.remove('is-invalid');
    });

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User: ", user);
            setUserId(user.uid);
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/user-not-found') {
                setError('unf');
            } else if (errorCode === 'auth/wrong-password') {
                setError('wp');
            } else {
                setError('ue');
            }
            console.log("Code: ", errorCode, "Message: ", errorMessage);
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