import { useState, useEffect } from 'react';
import axios from 'axios';
import VideoFrameInfo from './VideoFrameInfo'
import {Button} from 'react-bootstrap'

function Video(props) {
  const [frames, setFrames] = useState(0);
  const [playPauseText, setPlayPauseText] = useState("Play");
  const [play, setPlay] = useState(false);

useEffect(() => {
  let video = document.getElementById('video');
  setTimeout(() => {
    setFrames(Math.floor(video.currentTime.toFixed(5) * 12));
    // console.log(video.getVideoPlaybackQuality().totalVideoFrames)
  },300)
  if(video.ended){
    video.currentTime = 0;
    //setFrames(0)
  }
  
},[play, frames]);
const changePlayPause = () => {
  if(video.paused){
        video.play();
        // video.listen('frame');
        setPlayPauseText('Pause');
        setPlay(true);
        // $("#play-pause").html('Pause');
    }else{
        video.pause();
        // video.stopListen();
        setPlayPauseText('Play');
        setPlay(false);
    }
  }
const playPause = () => {
  changePlayPause();
}
  return (
    <div className="App">
      <p>{frames}</p>
        
      <div>
          <video id="video" width="700px" height="400px" >
              <source src={props.data.videofiles} type="video/mp4"/>
          </video>
          <div>
            <Button onClick={playPause} size="sm" variant="primary">{playPauseText}</Button>
            
          </div>
      </div>
      <VideoFrameInfo dataFrame={props.data.cvmdata} frames={frames}/>
    </div>
  )
}

export default Video
