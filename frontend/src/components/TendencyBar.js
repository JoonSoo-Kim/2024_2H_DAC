import React from 'react';

const TendencyBar = ({ score }) => {
    // Normalize score to a percentage position on the gauge (from 0% to 100%)
    const position = ((score + 200) / 400) * 100;

    return (
        <div style={{ position: 'relative', width: '70%', height: '20px', margin: '20px 0' }}>
            {/* Gradient bar */}
            <div
                style={{
                    height: '100%',
                    background: 'linear-gradient(to right, blue, purple, red)',
                    borderRadius: '10px',
                }}
            ></div>

            {/* Marker */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: `${position}%`,
                    transform: 'translateX(-50%)',
                    width: '30px',
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                }}
            ></div>
            <div
                style={{
                    position: 'absolute',
                    top: '25%',
                    left: `${position}%`,
                    transform: 'translateX(-50%)',
                    width: '10px',
                    height: '50%',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                }}
            ></div>

            {/* Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span>보수적</span>
                <span>중립적</span>
                <span>공격적</span>
            </div>
        </div>
    );
};

export default TendencyBar;
