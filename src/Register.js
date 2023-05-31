import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import Header from "./Header";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/');
        }
    }, []);

    function validateName(name) {
        const nameRegex = /^[a-zA-Z ]{2,30}$/;
        if (!nameRegex.test(name.trim())) {
            setNameError('Please enter a valid name');
            return false;
        } else {
            setNameError('');
            return true;
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    }

    function validatePassword(password) {
        if (password.trim().length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    }

    async function signUp() {

        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (isNameValid && isEmailValid && isPasswordValid) {

            let item = {name, password, email};
            console.warn(item);

            let result = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            let data = await result.json();
            console.warn(data)
            if (data.status === false){
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                })
            }
            if (data.status === true) {
                await Swal.fire(
                    'Success',
                    'You are Registered',
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
            <h1 className="mx-auto mt-3 text-primary text-opacity-50">Create Your Account</h1>
            <p className="text-center fs-4 text-dark mb-6 text-opacity-75">Welcome <br/> Please enter your details</p>
            <div className="col-sm-3 mx-auto mb-3 mt-5">
                <input className="form-control form-control-lg" type="text" value={name}
                       onChange={(e) => {
                           setName(e.target.value);
                           validateName(e.target.value);
                       }}
                       placeholder="Please enter your Name"/>
                {nameError && <div className="text-danger fs-4">{nameError}</div>}
            </div>
            <div className="col-sm-3 mx-auto my-3">
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
            <div className="mx-auto mt-4 mb-5">
                <button onClick={signUp} className="btn btn-secondary col-sm-3 btn-lg">Create Account</button>
            </div>
        </>

    )
}

export default Register