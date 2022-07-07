import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLOR_1, FONT_FAMILY} from './constants';

const subtitle: React.CSSProperties = {
	fontFamily: FONT_FAMILY,
	fontSize: 25,
	textAlign: 'center',
	position: 'absolute',
	width: '100%',
	color:'white',
    bottom: '15%'
};

const codeStyle: React.CSSProperties = {
	color: COLOR_1,
};

export const Subtitle: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30,50 ,  60], [0, 1, 1, 0]);
	return (
		<div style={{...subtitle, opacity }}>
			This was done by remotion
		</div>
	);
};
