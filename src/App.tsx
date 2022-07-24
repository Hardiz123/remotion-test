/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import './App.css';
import { Demo } from './Components/Demo';

interface contextInterface {
  inputText: string;
  url: string;
}

export const Value = createContext<contextInterface>({ inputText: '', url: '' });

const App: React.FC = () => {
  const [inputText, setinputText] = useState<string>("");

  const [player, setPlayer] = useState<boolean | null>(false);


  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (inputText) {
      fetch('http://localhost:3000/getAudio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: inputText
        })
      }).then((response: Response) => {
        response.blob().then((blob: Blob) => {
          const url = URL.createObjectURL(blob);
          setUrl(url);
        })
      })
    }
  }, [player])

  return (
    <Value.Provider value={{inputText,url}} >
      <div className="App">
        {player && url && <Player
          component={Demo}
          durationInFrames={331}
          compositionHeight={500}
          compositionWidth={900}
          controls
          doubleClickToFullscreen
          allowFullscreen
          autoPlay={true}
          fps={30}
          renderLoading={() => <div>Loading...</div>}
          style={{
            width: '100vh',
            height: '55.5vh',
          }}
        />}
        <input type="text" value={inputText} onChange={(e) => setinputText(e.target.value)} />
        <button onClick={() => setPlayer(!player)}>Play</button> 
      </div>
    </Value.Provider>
  );
}

export default App;