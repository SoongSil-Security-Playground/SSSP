import React, { useState, useEffect } from "react";
function ChallengeSimpleCard({id, name, category, points, level,}) {

    return (
        <div style={cardContainerStyle}>
            <div style={contentWrapperStyle}>
                <p>{id}</p>
                <p style={categoryStyle}>{category}</p>
                <p style={levelStyle}>{level}</p>
                <p style={titleStyle}>{name}</p>
                <p style={pointsStyle}>{points}</p>
            </div>
        </div>
    );
}

export default ChallengeSimpleCard;

const cardContainerStyle = {
    display: 'flex',
    borderRadius: '16px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    margin: '2px',
    width: '100%',
    height: '50px',
};

const contentWrapperStyle = {
    flex: '5',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    gap: '12px',
    padding: '8px',
    overflow: 'hidden',
};

const titleStyle = {
    fontWeight: 'bold',
    fontSize: '17px',
    color: '#006e93',
};

const categoryStyle = {
    fontSize: '15px',
    color: 'grey',
};

const levelStyle = {
    fontSize: '15px',
    color: 'var(--medium-blue)',
};

const pointsStyle ={
    fontSize: '15px',
    color: 'var(--dark-grey)',
};