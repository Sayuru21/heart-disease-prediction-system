// import logo from './logo.svg';
// import './Home.css';

import Header from "./Header";
import {useState} from "react";
import Swal from 'sweetalert2';
function Feedback() {

    const [rating, setRating] = useState('');
    const [feedback, setFeedback] = useState(null);

    const [ratingError, setRatingError] = useState('');

    function validateRating(rating) {
        if (isNaN(rating) || rating > 5 || rating < 1) {
            setRatingError('Please Rate Us')
            return false;
        }
        setRatingError('')
        return true;
    }

    async function submitFeedback() {

        const isRatingValid = validateRating(rating);

        if (isRatingValid) {

            const user = JSON.parse(localStorage.getItem('user-info'));
            const userId = user.id;

            let item = {userId, rating, feedback};
            console.warn(item);

            let result = await fetch("http://localhost:8000/api/feedback", {
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
                    text: 'Something went wrong',
                })
            }
            if (data.status === true) {
                await Swal.fire(
                    'Thank You',
                    'Your response recorded',
                    'success'
                )
            }
        }
    }


    return (
        <>
            <Header/>
            <h1 className="mx-auto mt-3 text-primary text-opacity-50">What Do You Think</h1>
            <p className="text-center fs-4 text-dark mb-6 text-opacity-75">Give your feedback</p>
            <div className="col-sm-6 mx-auto mt-5">
                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-4">How satisfied are you with our
                    product overall?</label>
                <div className="mx-auto col-sm-2">
                    <fieldset className="starability-slot" onChange={(e) => {
                        setRating(e.target.value);
                        validateRating(e.target.value);
                    }}>
                        <input type="radio" id="rate1" name="rating" value="1"/>
                        <label htmlFor="rate1" title="Terrible">1 star</label>
                        <input type="radio" id="rate2" name="rating" value="2"/>
                        <label htmlFor="rate2" title="Not good">2 stars</label>
                        <input type="radio" id="rate3" name="rating" value="3"/>
                        <label htmlFor="rate3" title="Average">3 stars</label>
                        <input type="radio" id="rate4" name="rating" value="4"/>
                        <label htmlFor="rate4" title="Very good">4 stars</label>
                        <input type="radio" id="rate5" name="rating" value="5"/>
                        <label htmlFor="rate5" title="Amazing">5 stars</label>
                    </fieldset>
                    {ratingError && <div className="text-danger fs-4">{ratingError}</div>}
                </div>
            </div>
            <div className="col-sm-6 mx-auto">
                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-4">Do you have any suggestions to
                    improve our product and service</label>
                <textarea className="form-control fs-4" id="exampleFormControlTextarea1" rows="7" onChange={(e) => {
                    setFeedback(e.target.value);
                }}></textarea>
            </div>
            <div className="mx-auto mt-4 mb-5">
                <button onClick={submitFeedback} className="btn btn-secondary col-sm-3 btn-lg">Submit</button>
            </div>
        </>
    );
}

export default Feedback;