import React from 'react'
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { FONT_FAMILY } from './constants';

interface speachObject {
    id: number,
    text: string,
}


const details: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 25,
    position: 'relative',
    width: '100%',
}

const ulStyle: React.CSSProperties = {
    listStyleType: 'circle',
    color: 'red',
    display: 'inline-block',
}

const displayText: speachObject[] = [
    {
        id: 1,
        text: 'Friends'
    },
    {
        id: 2,
        text: 'an American television sitcom'
    },
    {
        id: 3,
        text: 'created by David Crane and Marta Kauffman'
    },
    {
        id: 4,
        text: 'which aired on NBC from September 22, 1994, to May 6, 2004'
    }
]

function Details() {
    const { durationInFrames, fps } = useVideoConfig();
    const frame = useCurrentFrame();
    return (
        <div style={details}>
            <ul style={{ ...ulStyle }}  >
                {
                    displayText.map((t, i) => {
                        const delay = i * 12;
                        const scale = spring({
                            fps: fps,
                            frame: frame - delay,
                            config: {
                                damping: 200,
                            },
                        });
                        const opacity = interpolate(
                            frame,
                            [0, 20, durationInFrames - 80 + delay, durationInFrames - 60 + delay],
                            [0, 1, 1, 0]
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