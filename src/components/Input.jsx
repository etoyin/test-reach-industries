import { useState } from 'react';
import axios from 'axios';
import {Form, Button, Spinner} from 'react-bootstrap'

function Input(props) {
  const [userId, setUserId] = useState("");
  const [orgId, setOrgId] = useState("");
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);



  const handleFetch = () => {
    setIsLoading2(true)
    axios(`https://mockapi.lumi.systems/getdevicedata?deviceId=${selectedDevice}`,{
        mode: 'no-cors',
        'Content-Type': 'application/json'
    })
    .then(res => {
        props.callBack(res.data.output)
  //      setLabs(res.data.output);
  setIsLoading2(false)
    });
    // setData(data);
  }

  const handleClick = () => {
    setIsLoading1(true);
    axios(`https://mockapi.lumi.systems/getdevices?userId=${userId}&orgId=${orgId}`,{
        mode: 'no-cors',
        'Content-Type': 'application/json'
    })
    .then(res => {
        // console.log(res.data.output);
        setDevices(res.data.output);
        setIsLoading1(false)
    });
    // setData(data);
  }
  return (
    <div className="App">
        <div>
            <div className='row mt-3'>
                <Form.Group className="mb-3 col-6">
                    <Form.Control type="text" name="userId" placeholder="User Id" onChange={(e) => setUserId(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3  col-6">
                    <Form.Control type="text" name="orgId" placeholder="Org Id" onChange={(e) => setOrgId(e.target.value)}/>
                </Form.Group>
            {
                isLoading1 ? 
                <Button size="sm"  variant="secondary" className=''  disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Loading...
                </Button>:
                <Button size="sm" onClick={handleClick} className='' variant="secondary">Fetch
                </Button>
            }
            </div>
            
        </div>

        {devices.length > 0 && 
            <div className='row mt-3'>
                <Form.Select onChange={(e) => setSelectedDevice(e.target.value)} value={selectedDevice} aria-label="Default select example">
                    <option value="">Select Something</option>
                    {
                        devices && devices.map((x, i) => {
                            return(
                                <option key={i} value={x}>{x}</option> 
                            )
                        })
                    }
                </Form.Select>
                {
                isLoading2 ? 
                    <Button className='mt-3' size="sm" variant="secondary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                            Loading...
                    </Button>:
                    <Button className='mt-3' size="sm" onClick={handleFetch} variant="secondary">
                            Fetch
                    </Button>
                }
                {/* <button onClick={handleFetch}>Fetch</button> */}
            </div>
        }
    </div>
  )
}

export default Input
