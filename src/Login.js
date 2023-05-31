import Header from "./Header";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

function Login() {

    const navigate = useNavigate();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/");
        }
    }, []);

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.trim() || !emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    }

    function validatePassword(password) {
        if (!password || !password.trim() || password.trim().length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    }

    async function login() {

        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (isEmailValid && isPasswordValid) {

            let item = {email, password};
            console.warn(item);

            let result = await fetch("http://localhost:8000/api/login", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            let data = await result.json();
            console.warn(data)
            if (data.status === false) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                })
            }
            if (data.status === true) {
                await Swal.fire(
                    'Success',
                    'You are Logged In',
                    'success'
                )
                localStorage.setItem('user-info', JSON.stringify(data.data));
                console.warn(data)
                navigate('/');
            }
        }
    }

    return (
        <>
            <Header/>
            <h1 className="mx-auto mt-3 text-primary text-opacity-50">Log In to Your Account</h1>
            <p className="text-center fs-4 text-dark mb-6 text-opacity-75">Welcome <br/> Please enter your details</p>
            <div className="col-sm-3 mx-auto mb-3 mt-5">
                <input className="form-control form-control-lg" type="text" value={email}
                       onChange={(e) => {
                           setEmail(e.target.value);
                           validateEmail(e.target.value);
                       }}
                       placeholder="Please enter your Email"/>
                {emailError && <div className="text-danger fs-4">{emailError}</div>}
            </div>
            <div className="col-sm-3 mx-auto my-3">
                <input className="form-control form-control-lg" type="password" value={password}
                       onChange={(e) => {
                           setPassword(e.target.value);
                           validatePassword(e.target.value);
                       }}
                       placeholder="Please enter your Password"/>
                {passwordError && <div className="text-danger fs-4">{passwordError}</div>}
            </div>
            <div className="mx-auto mt-4  mb-5">
                <button onClick={login} className="btn btn-secondary col-sm-3 btn-lg">Login</button>
            </div>
        </>
    )
}

export default Login