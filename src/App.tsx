/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { Demo } from './Components/Demo';
import starlight from './assets/iphone/starlight.png'
import midnight from './assets/iphone/midnight.png'
import blue from './assets/iphone/blue.png'
import pink from './assets/iphone/pink.png'
import red from './assets/iphone/red.png'
import green from './assets/iphone/green.png'
import photo from './assets/iphone.png';

interface contextInterface {
  inputText: string;
  sound1: string;
  sound2: string;
  // array of image tag
  images: Array<HTMLImageElement>;
}

export const Value = createContext<contextInterface>({ inputText: '', sound1: '', sound2: '', images: [] });

const App: React.FC = () => {
  const [inputText, setinputText] = useState<string>("");

  const [player, setPlayer] = useState<boolean | null>(false);
  const [images, setImages] = useState<Array<HTMLImageElement>>([]);

  const [sound1, setSound1] = useState<string>("");
  const [sound2, setSound2] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (inputText) {
  //     fetch('http://localhost:3000/getAudio', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         text: inputText
  //       })
  //     }).then((response: Response) => {
  //       response.blob().then((blob: Blob) => {
  //         const url = URL.createObjectURL(blob);
  //         setUrl(url);
  //       })
  //     })
  //   }
  // }, [player])

  useEffect(() => {

    // creaet a 
    const imgagesUrl = [
      starlight,
      midnight,
      blue,
      pink,
      red,
      green,
      photo
    ]
    // create an array of image tag and set is loading to false on all images are loaded using promise.all
    Promise.all(imgagesUrl.map(url => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
          resolve(image);
        }
        image.onerror = () => {
          reject(image);
        }
      }).then((image: HTMLImageElement | any) => {
        setImages(prevState => [...prevState, image]);
      }).catch(err => {
        console.log(err);
      })
    }
    )).then(() => {
      fetch('http://localhost:3000/getAudio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: "Introducing"
        })
      }).then((response: Response) => {
        response.blob().then((blob: Blob) => {
          const url = URL.createObjectURL(blob);
          setSound1(url);
        }).catch(err => {
          console.log(err);
        })
        .then(() => {
          fetch('http://localhost:3000/getAudio',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: "The new Iphone 14 pro"
            })
          }).then((response: Response) => {
            response.blob().then((blob: Blob) => {
              const url = URL.createObjectURL(blob);
              setSound2(url);
            })
          })
        })
      }).then(() => {
        setIsLoading(false);
      })
    })
    
  }, []);


  return (
    <Value.Provider value={{ inputText, sound1,sound2, images }} >
      <div>
        {isLoading ? <div>
          Loading </div> : <Player
          component={Demo}
          durationInFrames={1050}
          compositionHeight={500}
          compositionWidth={900}
          controls
          allowFullscreen
          autoPlay={false}
          fps={30}
          renderLoading={() => <div>Loading...</div>}
          style={{
            width: '100vh',
            maxWidth: '100%',
          }}
        />}
        {/* <input type="text" value={inputText} onChange={(e) => setinputText(e.target.value)} />
        <button onClick={() => setPlayer(!player)}>Play</button>  */}
      </div>
    </Value.Provider>
  );
}

export default App;