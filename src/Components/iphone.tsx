import React from 'react';
import {
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
    Img
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
        [0, 90, 380, 390],
        [-550, 250, 250, 10],
        {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp"
        }
    )

    // roate using spring
    const rotate = spring({
        frame: frame - 5,
        fps: fps + 100,
        config: {
            damping: 100,
        },
    });
    
    const rotateImg = interpolate(
        rotate,
        [0, 1],
        [0, 360],
    );

    const scale = interpolate(
        frame,
        [390, 450],
        [1, 70],
        {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp"
        }
    );

    const imgOpacity = interpolate(
        frame,
        [390, 450],
        [1, 0],
        {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp"
        }
    );

    console.log(scale);
    

    return (
        <div
            style={
                {
                    transform: `translate3d(${divTranslation}px, 0, 0)`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }>
                <Img alt='iphone' src={photo} width='35%'
                    style={{
                        //rotate
                        transform: `rotate(${rotateImg}deg) scale(${scale})`,
                        opacity: imgOpacity
                    }}
                />
        </div>
    );
}