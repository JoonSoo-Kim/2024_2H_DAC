import React from 'react';

const TendencyBar = ({ score }) => {
    let position = ((score + 100) / 200) * 100;
    if (score === 100) {
        position -= 1;
    }

    return (
        <div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '20px',
                    margin: '20px 0',
                    borderRadius: '4px',
                    overflow: 'visible', // Allow overflow to make marker fully visible
                }}
            >
                {/* Gradient bar */}
                <div
                    style={{
                        height: '100%',
                        background: 'linear-gradient(to right, blue, purple, red)',
                        borderRadius: '10px',
                    }}
                ></div>

                {/* Gray overlay bar */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: `${position}%`,
                        width: `${100 - position}%`,
                        height: '100%',
                        backgroundColor: 'lightgray',
                        borderRadius: '10px',
                    }}
                ></div>

                {/* Marker */}
                <div
                    style={{
                        position: 'absolute',
                        top: '0%',
                        left: `${position}%`,
                        transform: 'translateX(-50%)',
                        width: '15px',
                        height: '73%',
                        border: '3px solid black', // Thicker black border
                        backgroundColor: 'white',
                        borderRadius: '100%',
                        zIndex: 1,
                    }}
                ></div>
                {/* Small markers */}
                {[...Array(19)].map((_, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: '60%',
                            left: `${(index + 1) * 5}%`,
                            transform: 'translateX(-50%)',
                            width: '2px',
                            height: '7px',
                            backgroundColor: 'lightgray',
                            opacity: 1,
                        }}
                    ></div>
                ))}

                {/* Labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                    <span>보수적</span>
                    <span>중립적</span>
                    <span>공격적</span>
                </div>
            </div>
        </div>
    );
};

export default TendencyBar;
