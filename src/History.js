// import logo from './logo.svg';
// import './Home.css';

import Header from "./Header";
import {useEffect, useState} from "react";
import './Spinner.css';
import spinner from './Spinner-1s-216px.gif'
function History() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user-info'));
        const userId = user.id;

        let item = {userId};
        console.warn(item);

        async function fetchData() {
            const response = await fetch('http://localhost:8000/api/history', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            const historyData = await response.json();
            setData(historyData.data);
            setIsLoading(false);
        }

        fetchData();
        console.log(data)
    }, []);


    let historyList = [];
    if (data != null) {
        data.forEach((record, index) => {
            {
                switch (record.chest_pain_type) {
                    case 0:
                        record.chest_pain_type = 'Typical angina'
                        break;
                    case 1:
                        record.chest_pain_type = 'Atypical angina'
                        break;
                    case 2:
                        record.chest_pain_type = 'Non-anginal pain'
                        break;
                    case 3:
                        record.chest_pain_type = 'Asymptomatic'
                        break;
                }
                if (record.is_heart_patient === 1) {
                    historyList.push(<tr key={index}>
                        <th className="fs-4 text-danger" scope="row">{index + 1}</th>
                        <td className="fs-4 text-danger">{record.age}</td>
                        <td className="fs-4 text-danger">{(record.sex === 1) ? 'Male' : 'Female'}</td>
                        <td className="fs-4 text-danger">{record.chest_pain_type}</td>
                        <td className="fs-4 text-danger">{record.blood_pressure}</td>
                        <td className="fs-4 text-danger">{record.cholesterol_level}</td>
                        <td className="fs-4 text-danger">{(record.sugar_level === 1) ? '>120 (mg/dl)' : '<=120 (mg/dl)'}</td>
                        <td className="fs-4 text-danger">{(record.is_heart_patient === 1) ? 'Unhealthy' : 'Normal'}</td>
                    </tr>);
                } else {
                    historyList.push(<tr key={index}>
                        <th className="fs-4" scope="row">{index + 1}</th>
                        <td className="fs-4">{record.age}</td>
                        <td className="fs-4">{(record.sex === 1) ? 'Male' : 'Female'}</td>
                        <td className="fs-4">{record.chest_pain_type}</td>
                        <td className="fs-4">{record.blood_pressure}</td>
                        <td className="fs-4">{record.cholesterol_level}</td>
                        <td className="fs-4">{(record.sugar_level === 1) ? '>120 (mg/dl)' : '<=120 (mg/dl)'}</td>
                        <td className="fs-4">{(record.is_heart_patient === 1) ? 'Unhealthy' : 'Normal'}</td>
                    </tr>);
                }
            }
        });
    }


    return (
        <>
            <Header/>
            <h1 className="mx-auto mt-3 text-primary text-opacity-50">Analysis History</h1>
            {isLoading ? (
                <div className="mx-auto my-5">
                <img src={spinner} alt="spinner"/>
                </div>
            ) : data === null ? (
                <div className="mx-auto my-5">
                <p className="my-auto text-center fs-2 text-success">No History</p>
                </div>
            ) : (
                <div className="mx-5 my-5">
                    {data === null ?
                        <h1>No content</h1>
                        :
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="fs-4" scope="col">No.</th>
                                <th className="fs-4" scope="col">Age</th>
                                <th className="fs-4" scope="col">Gender</th>
                                <th className="fs-4" scope="col">Chest Pain Type</th>
                                <th className="fs-4" scope="col">Blood Pressure</th>
                                <th className="fs-4" scope="col">Cholesterol Level</th>
                                <th className="fs-4" scope="col">Sugar Range</th>
                                <th className="fs-4" scope="col">Heart Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {historyList}
                            </tbody>
                        </table>
                    }

                </div>
            )}
        </>
    );
}

export default History;