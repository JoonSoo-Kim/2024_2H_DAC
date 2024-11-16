import React from 'react';

const TendencyGauge = ({ score }) => {
    // Map score (-200 to 200) to a rotation angle (-90 to 90 degrees)
    const rotation = ((score + 200) / 400) * 180 - 90;

    // Calculate the end angle for the purple arc based on the score
    const endAngle = ((score + 200) / 400) * 180;
    const endX = 100 + 90 * Math.cos((rotation * Math.PI) / 180);
    const endY = 90 - 90 * Math.sin((rotation * Math.PI) / 180);

    return (
        <svg width="500" height="200" viewBox="-100 0 400 100">
            <defs>
                <marker id="arrowhead" markerWidth="4" markerHeight="3" refX="0" refY="1.5" orient="auto">
                    <polygon points="0 0, 4 1.5, 0 3" fill="#000" />
                </marker>
            </defs>
            {/* Background Arc */}
            <path d="M10,90 A90,90 0 0,1 190,90" fill="none" stroke="#ddd" strokeWidth="10" />
            {/* Purple Arc */}
            <path d={`M10,90 A90,90 0 0,1 ${endX},${endY}`} fill="none" stroke="#7b61ff" strokeWidth="10" />
            {/* Needle */}
            <line
                x1="100"
                y1="90"
                x2={100 + 60 * Math.cos((rotation * Math.PI) / 180)}
                y2={90 - 60 * Math.sin((rotation * Math.PI) / 180)}
                stroke="#000"
                strokeWidth="5"
                markerEnd="url(#arrowhead)"
            />
            <text
                x={100 + 100 * Math.cos((rotation * Math.PI) / 180)}
                y={90 - 100 * Math.sin((rotation * Math.PI) / 180) - 10}
                fontSize="10"
                textAnchor="middle"
                fill="#000"
            >
                {score}
            </text>
            <circle
                cx={100 + 90 * Math.cos((rotation * Math.PI) / 180)}
                cy={90 - 90 * Math.sin((rotation * Math.PI) / 180)}
                r="5"
                fill="#000"
            />
            {/* Labels */}
            <text x="-5" y="110" fontSize="12">
                보수적
            </text>
            <text x="175" y="110" fontSize="12">
                공격적
            </text>
        </svg>
    );
};

export default TendencyGauge;
