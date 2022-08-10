import React from 'react';
import {
    AbsoluteFill,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    spring,
    Easing
} from 'remotion';
import photo from '../assets/iphone.png';


export const Iphone: React.FC = () => {

    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();

    const divTranslationProgress = spring({
        frame: frame,
        fps : fps + 55,
        config: {
            damping: 100
        },
    });

    // interpoate forward then backward
    // const divTranslation = interpolate(
    //     frame,
    //     [0, 20, 150 - 40, 150],
    //     [0, 40, 1, 0]
    // );

    const divTranslation = interpolate(
        frame,
        [0, 90, 380, 400],
        [-250, 550, 550, 300],
        {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp"
        }
    )

    // roate using spring
    const rotate = spring({
        frame: frame,
        fps: fps + 120,
        config: {
            damping: 100,
        },
    });
    
    const rotateImg = interpolate(
        rotate,
        [0, 1],
        [0, 360],
    );


    return (
        <div className="iphone"
            style={
                {
                    transform: `translate3d(${divTranslation}px, 0, 0)`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }>
                <img alt='iphone' src={photo} width='300px'
                    style={{
                        //rotate
                        transform: `rotate(${rotateImg}deg)`,
                    }}
                />
        </div>
    );
}