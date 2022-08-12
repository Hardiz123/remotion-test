import React from "react";
import {
    AbsoluteFill,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    spring
} from 'remotion';
import { COLOR_3 } from "./constants";
import './styles.css';
import starlight from '../assets/iphone/starlight.png'
import midnight from '../assets/iphone/midnight.png'
import blue from '../assets/iphone/blue.png'
import pink from '../assets/iphone/pink.png'
import red from '../assets/iphone/red.png'
import green from '../assets/iphone/green.png'
const samples = [
    {
        id: 1,
        name: 'Starlight',
        imgsrc: starlight,
        price : '$1000'
    },
    {
        id: 2,
        name: 'Midnight',
        imgsrc: midnight,
        price : '$1000'
    },
    {
        id: 3,
        name: 'Blue',
        imgsrc: blue,
        price : '$1000'
    },
    {
        id: 4,
        name: 'Pink',
        imgsrc: pink,
        price : '$1000'
    },
    {
        id: 5,
        name: 'Red',
        imgsrc: red,
        price : '$1000'
    },
    {
        id: 6,
        name: 'Green',
        imgsrc: green,
        price : '$1000'
    }
]

export const CameraSample: React.FC = () => {

    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();


    return (
        <div style={{
            color: 'white',
            width: '100%'
        }}>
            <div className="heading" style={{ color: COLOR_3 }}>
                <h1>Available In</h1>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
            }}>
                {
                    samples.map((sample, i) => {
                        const delay = i * 50;

                        const divTranslation = interpolate(
                            frame,
                            [0 + delay, 90 + delay],
                            [-250 - (i*150) , 0],
                            {
                                extrapolateRight: "clamp",
                                extrapolateLeft: "clamp"
                            }
                        )
                    
                        return (
                            <div key={i} className="sample" style={{
                                transform: `translate3d(${divTranslation}px, 0, 0)`,
                                position: 'relative',
                            }} >
                                <img width="120px" src={sample.imgsrc} alt={sample.name} />
                                <h3>{sample.name}</h3>
                                <h3 style={{
                                    opacity: interpolate(
                                        frame,
                                        [0 + 350, 300 + 90],
                                        [0, 1],
                                        {
                                            extrapolateRight: "clamp",
                                            extrapolateLeft: "clamp"
                                        }
                                    )
                                }}>{sample.price}</h3>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )

}