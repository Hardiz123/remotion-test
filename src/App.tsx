import React from 'react';
import logo from './logo.svg';
import { Player } from '@remotion/player';
import './App.css';
import { Demo } from './Components/Demo';

const  App : React.FC = () => {
  return (
    <div className="App">
      <Player 
      component={Demo}
      durationInFrames={150}
      compositionHeight={500}
      compositionWidth={900}
      controls
      autoPlay={true}
      fps={30}
      style={{
        width:'100vh',
        height:'55.5vh',
      }}
      />
    </div>
  );
}

export default App;
