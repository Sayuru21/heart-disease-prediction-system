import Header from "./Header";
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import './App.css';
import {Link} from "react-router-dom";

function ProductList(){

    const [data, setData] = useState();
    // const [dataLoading, setDataLoading] = useState(false);

    useEffect( () => {
        const loadData = async () => {
            // setDataLoading(true);
            const result = await fetch("http://localhost:8000/api/list");
            const jsonData = await result.json();

            console.log(jsonData)
            setData(jsonData);
            // setDataLoading(false);
        };

        loadData().then(r => console.log("success"));
    }, []);

    async function deleteOperation(id){
       let result = fetch("http://localhost:8000/api/delete/" + id, {
           method:'DELETE'
       });

       result = await result.json();

       console.warn(result);

    }


    return(
        <div>
            <Header/>
            <h1> Product List</h1>
            <div className="col-sm-6 offset-sm-3">
            <Table>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Description</td>
                    <td>Image</td>
                </tr>
                {
                    data?.map((item) =>

                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img style={{width:100}} src={"http://localhost:8000/" + item.file_path}/></td>
                                <td><Link><span onClick={() => deleteOperation(item.id)} className="delete">Delete</span></Link></td>
                                <td><Link to={"update/" + item.id}><span className="update">Update</span></Link></td>
                            </tr>

                    )
                }
            </Table>
            </div>
        </div>
    )
}

export default ProductList;