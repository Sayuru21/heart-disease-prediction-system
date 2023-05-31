import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import UpdateProduct from "./UpdateProduct";
import Protected from "./Protected";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import Home from "./Home";
import HeartAnalysis from "./HeartAnalysis";
import Feedback from "./Feedback";
import History from "./History";

function App() {
    return (<div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    {/*<Route path="/add" element={<Protected Cmp={AddProduct}/>}/>*/}
                    {/*<Route path="/update/:id" element={<Protected Cmp={UpdateProduct}/>}/>*/}
                    {/*<Route path="/" element={<Protected Cmp={ProductList}/>}/>*/}
                    <Route path="/" element={<Protected Cmp={Home}/>}/>
                    <Route path="/analysis" element={<Protected Cmp={HeartAnalysis}/>}/>
                    <Route path="/feedback" element={<Protected Cmp={Feedback}/>}/>
                    <Route path="/history" element={<Protected Cmp={History}/>}/>
                </Routes>
            </BrowserRouter>
        </div>);
}

export default App;
