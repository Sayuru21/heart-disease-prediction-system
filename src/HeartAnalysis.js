// import logo from './logo.svg';
// import './Home.css';

import Header from "./Header";
import {useState} from "react";
import Swal from 'sweetalert2';

function HeartAnalysis() {

    const [age, setAge] = useState();
    const [sex, setSex] = useState();
    const [chestPain, setChestPain] = useState();
    const [bloodPressure, setBloodPressure] = useState();
    const [cholesterol, setCholesterol] = useState();
    const [bloodSugar, setBloodSugar] = useState();

    const [ageError, setAgeError] = useState('');
    const [sexError, setSexError] = useState('');
    const [chestPainError, setChestPainError] = useState('');
    const [bloodPressureError, setBloodPressureError] = useState('');
    const [cholesterolError, setCholesterolError] = useState('');
    const [bloodSugarError, setBloodSugarError] = useState('');

    function validateAge(age) {
        if (isNaN(age) || age < 1 || age > 120) {
            setAgeError('Please enter a valid Age')
            return false;
        }
        setAgeError('')
        return true;
    }

    function validateSex(sex) {
        if (isNaN(sex) || sex > 1 || sex < 0) {
            setSexError('Please select a valid Gender')
            return false;
        }
        setSexError('')
        return true;
    }

    function validateChestPain(chestPain) {
        if (isNaN(chestPain) || chestPain < 0 || chestPain > 3) {
            setChestPainError('Please select a valid Chest Pain Type')
            return false;
        }
        setChestPainError('')
        return true;
    }

    function validateBloodPressure(bloodPressure) {
        if (isNaN(bloodPressure) || bloodPressure < 1 || bloodPressure > 300) {
            setBloodPressureError('Please enter a valid Blood Pressure Count')
            return false;
        }
        setBloodPressureError('')
        return true;
    }

    function validateCholesterol(cholesterol) {
        if (isNaN(cholesterol) || cholesterol < 50 || cholesterol > 500) {
            setCholesterolError('Please enter a valid Total Cholesterol Count')
            return false;
        }
        setCholesterolError('')
        return true;
    }

    function validateBloodSugar(bloodSugar) {
        if (isNaN(bloodSugar) || bloodSugar < 0 || bloodSugar > 1) {
            setBloodSugarError('Please select a valid Blood Sugar Range')
            return false;
        }
        setBloodSugarError('')
        return true;
    }

    async function prediction() {

        const isAgeValid = validateAge(age);
        const isSexValid = validateSex(sex);
        const isChestPainValid = validateChestPain(chestPain);
        const isBloodPressureValid = validateBloodPressure(bloodPressure);
        const isCholesterolValid = validateCholesterol(cholesterol);
        const isBloodSugarValid = validateBloodSugar(bloodSugar);

        const user = JSON.parse(localStorage.getItem('user-info'));
        const userId = user.id;

        if (isAgeValid && isSexValid && isChestPainValid && isBloodPressureValid && isCholesterolValid && isBloodSugarValid) {
            let data = {userId, age, sex, chestPain, bloodPressure, cholesterol, bloodSugar};

            console.log(data);

            let result = await fetch("http://localhost:8000/api/analysis", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            data = await result.json();
            console.log(data);
            if (data.status === false) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong',
                })
            }
            console.log(data.data)
            if (data.status === true) {

                if (data.data === 0) {
                    await Swal.fire(
                        'Great',
                        'You are healthy',
                        'success'
                    )
                }
                if (data.data === 1) {
                    await Swal.fire(
                        'Oops...',
                        'You are having a heart disease',
                        'warning'
                    )
                }
            }

        }
    }

    return (
        <>
            <Header/>
            <h1 className="mx-auto mt-3 text-primary text-opacity-50">Check Your Heart</h1>
            <p className="text-center fs-4 text-dark mb-6 text-opacity-75">Please fill the form</p>

            <div className="col-sm-4 mx-auto mb-3 mt-5">
                <input className="form-control form-control-lg" type="text" value={age}
                       onChange={(e) => {
                           setAge(e.target.value);
                           validateAge(e.target.value);
                       }}
                       placeholder="Please enter your Age"/>
                {ageError && <div className="text-danger fs-4">{ageError}</div>}
            </div>
            <div className="col-sm-4 mx-auto my-3">
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                        onChange={(e) => {
                            setSex(e.target.value);
                            validateSex(e.target.value);
                        }}>
                    <option className="text-secondary" selected>Please select Gender</option>
                    <option className="text-secondary" value="1">Male</option>
                    <option className="text-secondary" value="0">Female</option>
                </select>
                {sexError && <div className="text-danger fs-4">{sexError}</div>}
            </div>
            <div className="col-sm-4 mx-auto my-3">
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                        onChange={(e) => {
                            setChestPain(e.target.value);
                            validateChestPain(e.target.value);
                        }}>
                    <option className="text-secondary">Please select Chest Pain type</option>
                    <option className="text-secondary" value="0">Typical angina</option>
                    <option className="text-secondary" value="1">Atypical angina</option>
                    <option className="text-secondary" value="2">Non-anginal pain</option>
                    <option className="text-secondary" value="3">Asymptomatic</option>
                </select>
                {chestPainError && <div className="text-danger fs-4">{chestPainError}</div>}
            </div>
            <div className="col-sm-4 mx-auto my-3">
                <input className="form-control form-control-lg" type="text" value={bloodPressure}
                       onChange={(e) => {
                           setBloodPressure(e.target.value);
                           validateBloodPressure(e.target.value);
                       }}
                       placeholder="Please enter your Blood Pressure level"/>
                {bloodPressureError && <div className="text-danger fs-4">{bloodPressureError}</div>}
            </div>
            <div className="col-sm-4 mx-auto my-3">
                <input className="form-control form-control-lg" type="text" value={cholesterol}
                       onChange={(e) => {
                           setCholesterol(e.target.value);
                           validateCholesterol(e.target.value);
                       }}
                       placeholder="Please enter your Total Cholesterol level"/>
                {cholesterolError && <div className="text-danger fs-4">{cholesterolError}</div>}
            </div>
            <div className="col-sm-4 mx-auto my-3">
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                        onChange={(e) => {
                            setBloodSugar(e.target.value);
                            validateBloodSugar(e.target.value);
                        }}>
                    <option className="text-secondary">Please select Fasting Blood Sugar level</option>
                    <option className="text-secondary" value="0">Level less than or equal to 120</option>
                    <option className="text-secondary" value="1">Level grater than 120</option>
                </select>
                {bloodSugarError && <div className="text-danger fs-4">{bloodSugarError}</div>}
            </div>
            <div className="mx-auto mt-4 mb-5">
                <button onClick={prediction} className="btn btn-secondary col-sm-4 btn-lg">Submit</button>
            </div>
        </>
    );
}

export default HeartAnalysis;