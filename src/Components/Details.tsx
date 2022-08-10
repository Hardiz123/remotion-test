import React from 'react'
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { FONT_FAMILY } from './constants';

interface speachObject {
    id: number,
    text: string,
}


const details: React.CSSProperties = {
    fontFamily: 'IBM Plex Serif',
    fontWeight: 'bold',
    fontSize: 25,
    position: 'relative',
    marginLeft : '5%',
}

const ulStyle: React.CSSProperties = {
    listStyleType: 'circle',
    color: 'white',
    display: 'inline-block',
}

const displayText: speachObject[] = [
    {
        id: 1,
        text: '12 MP Dual main camera'
    },
    {
        id: 2,
        text: '12 MP dual selfie camera'
    },
    {
        id: 3,
        text: 'Fast charging, 50% in 30 min'
    },
    {
        id: 4,
        text: 'upto 512GB storage'
    },
    {
        id: 5,
        text: '6.1 inches XDR display'
    },
    {
        id: 6,
        text: '174 g weight'
    },
    {
        id: 7,
        text: 'Scratch-resistant ceramic glass'
    },
    {
        id: 8,
        text: '1170 x 2532 pixels screen resolution'
    },
    {
        id: 9,
        text: 'Dual Stero speakers'
    },
    {
        id: 10,
        text: 'Magsafe with wireless charging'
    }
]



function Details() {
    const { durationInFrames, fps } = useVideoConfig();
    const frame = useCurrentFrame();

      const opacity = interpolate(
    frame,
    [durationInFrames-20, durationInFrames],
    [1,0]
  );
    return (
        <div style={details}>
            <ul style={{ ...ulStyle, opacity : opacity }}  >
                {
                    displayText.map((t, i) => {
                        const delay = i * 20;
                        const scale = spring({
                            fps: fps,
                            frame: frame - delay,
                            config: {
                                damping: 200,
                            },
                        });
                        const opacity = interpolate(
                            frame,
                            [0, 20],
                            [0, 1]
                        );
                        return (
                            <li key={t.id} style={{
                                transform: `scale(${scale})`,
                                opacity
                            }}>
                                {t.text}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Details