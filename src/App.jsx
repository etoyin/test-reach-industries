import { useState } from 'react';
import Input from './components/Input';
import Video from './components/Video';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});

  const callBack = (data) => {
    setData(data);
  }
  return (
    <div className="App">
      <Input callBack={callBack} />
      {data.videofiles && <Video data={data}/>}
    </div>
  )
}

export default App
