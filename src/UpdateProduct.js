import Header from "./Header";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";

function UpdateProduct() {

    const params = useParams();
    const [data, setData] = useState();

    useEffect( () => {
        const loadData = async () => {
            // setDataLoading(true);
            const result = await fetch("http://localhost:8000/api/product/" + params.id);
            const jsonData = await result.json();


            setData(jsonData);

        };

        loadData().then(r => console.log("success"));
        console.log(data)
    }, []);



    return (
        <div>
            <Header/>
            <h1>Update Product</h1>
            { console.log("test",data)}
            {/*<input type="text" defaultValue={data.name}/>*/}
            {/*<br/>*/}
            {/*<input type="text" defaultValue={data.price}/>*/}
            {/*<br/>*/}
            {/*<input type="text" defaultValue={data.description}/>*/}
            {/*<br/>*/}
            {/*<input type="file" defaultValue={data.file_path}/>*/}
            {/*<br/>*/}
            {/*<img style={{width:100}} scr={"http://localhost:8000/" + data.file_path}/>*/}
            <br/>
            <button>Update Product</button>
        </div>
    )
}

export default UpdateProduct