
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


export const Demo: React.FC = () => {

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
      damping : 100
    },
  });

  const opacity = interpolate(
    frame,
    [0, 20, durationInFrames - 40, durationInFrames ],
    [0, 1, 1, 0]
  );

  const divTranslation = interpolate(
    divTranslationProgress,
    [0, 1],
    [0, 200],
    {
      easing: Easing.ease
    }

  );



  return (
    <AbsoluteFill style={{ backgroundPosition:'center', backgroundImage:`url(${img})`, display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
      <div style={{height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%',backgroundImage: `linear-gradient(to right, #FF99DA, #C63287)`, opacity, transform: `translateX(${divTranslation}px)`, borderRadius:'10px' }}>
        <Sequence from={35} >
          <Title titleText="Hello there" titleColor='white' />
          <Sequence from={10} >
            <Subtitle />
          </Sequence>
        </Sequence>
      </div>

    </AbsoluteFill>
  );
}