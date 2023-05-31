import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from "react-router-dom";
import './App.css';
import {NavDropdown} from "react-bootstrap";

function Header() {

    let user = JSON.parse(localStorage.getItem('user-info'))

    const navigate = useNavigate();

    function logOut() {
        localStorage.clear();
        navigate("/register");
    }

    function getCapitalizedFirstWord(sentence) {
        // Split the sentence into an array of words
        const words = sentence.split(' ');

        // Get the first word and capitalize its first letter
        const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);

        // Return the capitalized first word
        return firstWord;
    }

    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand fs-1 mx-2" href="/">CardioRisk Pro</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                localStorage.getItem('user-info') ?
                                    <>

                                        <li className="nav-item">
                                        <a className="nav-link fs-3 ms-5 me-3" href="/">Home</a>
                                    </li>
                                        <li className="nav-item">
                                        <a className="nav-link fs-3 mx-3" href="/analysis">Heart Analysis</a>
                                    </li>
                                        <li className="nav-item">
                                            <a className="nav-link fs-3 mx-3" href="/feedback">Feedback</a>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link fs-3 mx-3" href="/login">Login</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link fs-3 mx-3" href="/register">Register</a>
                                        </li>
                                    </>
                            }
                            {
                                localStorage.getItem('user-info') ?
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link fs-3 mx-3" href="/history">{user && getCapitalizedFirstWord(user.name)}'s History</a>
                                        </li>
                                        <li className="nav-item">
                                            <button type="button" onClick={logOut} className="btn btn-outline-secondary fs-3 ms-5 me-2">Logout
                                            </button>
                                        </li>
                                    </>
                                :
                                <>
                                {/*null*/}
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>


        </div>
    )
}

export default Header