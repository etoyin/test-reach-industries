import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


const VideoFrameInfo = (props) => {
    const [eachFrameData, setEachFrameData] = useState({})
    const [fetchData, setFetchData] = useState(true)
    const [filteredData, setFilteredData] = useState({})
    useEffect(() => {
        if(fetchData){
            axios(props.dataFrame,{
                mode: 'no-cors',
                'Content-Type': 'application/json'
            })
            .then(res => {
                // console.log(res.data.output);
                setEachFrameData(res.data.frame_data);
                // console.log(res.data.frame_data);
                setFetchData(false);
            });
        }

        let filtered = Object.entries(eachFrameData).filter(([key, value]) => {
            return key == props.frames
        })

        setFilteredData(filtered);
        
    }, [props.frames])

    

    // console.log(filteredData && filteredData[0][1]);
    return (
        <div className='row'>
            <ul className='col-7'>
                {
                    filteredData[0] && Object.entries(filteredData[0][1]).map(([key, value]) => {
                        return (<li key={key}>
                            <span>{key}</span>: <span>{value}</span>
                        </li>)
                    })
                }
            </ul>
            {
                filteredData[0] &&
                <div className="col-5 mb-3" style={{backgroundColor: `rgb(${filteredData[0][1].avgR}, ${filteredData[0][1].avgG}, ${filteredData[0][1].avgB})`, height: '150px', width: '150px'}}>

                </div>
            }
            
        </div>
    )
}

export default VideoFrameInfo