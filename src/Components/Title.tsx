import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { FONT_FAMILY } from './constants';

const title: React.CSSProperties = {
	fontFamily: FONT_FAMILY,
	fontWeight: 'bold',
	fontSize: 30,
	textAlign: 'center',
	position: 'absolute',
	bottom: '50%',
	width: '100%',
};

const word: React.CSSProperties = {
	marginRight: 10,
	display: 'inline-block',
};

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({ titleText, titleColor }) => {
	const { durationInFrames, fps } = useVideoConfig();
	const frame = useCurrentFrame();

	const words = titleText.split(' ');



	return (
		<h1 style={title}>
			{words.map((t, i) => {
				const delay = i * 5;

				const scale = spring({
					fps: fps,
					frame: frame - delay,
					config: {
						damping: 200,
					},
				});

				const opacity = interpolate(
					frame,
					[0, 20, 150 - 80 + delay, 150 - 60 + delay],
					[0, 1, 1, 0]
				);
				return (
					<span
						key={t}
						style={{
							...word,
							color: titleColor,
							transform: `scale(${scale})`,
							opacity
						}}
					>
						{t}
					</span>
				);
			})}
		</h1>
	);
};
