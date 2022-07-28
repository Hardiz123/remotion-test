
import { Easing, spring } from 'remotion';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Subtitle } from './Subtitle';
import { Title } from './Title';
import img from '../assets/dangri.webp';
import { Audio } from 'remotion';
import { useContext } from 'react';
import { Value } from '../App';
import './demo.styles.css';
import Details from './Details';
export const Demo: React.FC = () => {
  const value = useContext(Value);
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Const opacity = interpolate(
  //   frame,
  //   [25, durationInFrames -100],
  //   [15, 1],
  //   {
  //     extrapolateLeft: 'clamp',
  //     extrapolateRight: 'clamp',
  //   }
  // );

  const divTranslationProgress = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 100
    },
  });

  const opacity = interpolate(
    frame,
    [0, 20, 150 - 40, 150],
    [0, 1, 1, 0]
  );

  const opacityImg = interpolate(
    frame,
    [151, 181, 331, 361],
    [0, 1, 1, 0]
  );

  console.log(opacityImg);
  

  const divTranslation = interpolate(
    divTranslationProgress,
    [0, 1],
    [0, 200],
    {
      easing: Easing.ease
    }

  );


  return (

    <AbsoluteFill style={{ backgroundPosition: 'center', backgroundImage: `url(${img})`, display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
      <Sequence from={0} durationInFrames={150} layout="none">
        <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', backgroundImage: `linear-gradient(to right, #FF99DA, #C63287)`, opacity, transform: `translateX(${divTranslation}px)`, borderRadius: '10px' }}>
          <Sequence from={35}>
            <Title titleText={value?.inputText!} titleColor='white' />
            <Audio src={value?.url!}
              endAt={150}
            />
            <Sequence from={10} >
              <Subtitle />
            </Sequence>
          </Sequence>
        </div>
      </Sequence>
      <Sequence from={151} durationInFrames={210} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <Audio src={'https://www.televisiontunes.com/uploads/audio/Friends.mp3'} endAt={210} />
        {/* <img src={img} alt="img" style={{
          width: '60%',
          height: '60%',
          opacity: opacityImg,
          borderRadius: '50%'
        }} /> */}
        <div className="infoContainer" style={{opacity : opacityImg}}>
          <Details />
        </div>
      </Sequence>
      <Sequence from={361} durationInFrames={40} layout='none'>
        <div style={{
          width: '50%',
          height: '50%'
        }}>
          <Subtitle title="Have a good day" />
        </div>
      </Sequence>
    </AbsoluteFill>

  );
}