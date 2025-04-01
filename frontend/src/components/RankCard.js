import React from 'react';
import Avatar from 'react-avatar';

function UserRankCard({ rank, name, score }) {
    const customColors = [
        getCSSVariable("--light-blue"),
        getCSSVariable("--light-green"),
        getCSSVariable("--medium-blue"),
        getCSSVariable("--dark-blue"),
        getCSSVariable("--medium-grey"),
    ];

    return (
        <div style={cardContainerStyle}>
            <div style={rankStyle}>{rank}</div>
            <div style={profileImageContainerStyle}>
                <Avatar 
                    name={name} 
                    round={true} 
                    size="40" 
                    textSizeRatio={2} 
                    colors={customColors}
                />
            </div>
            <div style={textContainerStyle}>
                <p style={nameStyle}>{name}</p>
            </div>
            <div style={scoreStyle}>{score}</div>
        </div>
    );
}

const getCSSVariable = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

const cardContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '1000px',
    margin: '10px auto',
    boxSizing: 'border-box',
};

const rankStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginLeft: '10px',
    marginRight: '15px',
    minWidth: '50px',
    color: 'var(--dark-blue)',
};

const profileImageContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    marginRight: '15px',
};

const profileIconStyle = {
    fontSize: '20px',
    color: '#5a5a5a',
};

const textContainerStyle = {
    flex: '1',
    textAlign: 'left',
};

const nameStyle = {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'var(--dark-blue)',
};

const scoreStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'var(--dark-blue)',
    marginRight: '10px',
};

export default UserRankCard;