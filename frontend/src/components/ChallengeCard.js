import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChallengeModal from './ChallengeModal';

function ChallengeCard({ id, name, description, points, category, solveCnt, level, createdAt, filePath, initialSolved}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSolved, setIsSolved] = useState(initialSolved);

    const handleOpenModal = () => {
        console.log("Opening modal");
        console.log('solve cnt ', solveCnt);
        console.log('category', category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        console.log("Closing modal");
        setIsModalOpen(false);
    };

    useEffect(() => {
        console.log("isModalOpen state in ChallengeCard:", isModalOpen);
    }, [isModalOpen]);

    return (
        <div>
            <div 
                style={{ ...cardContainerStyle, ...(isSolved ? blueBackStyle : whiteBackStyle) }} 
                onClick={handleOpenModal}
            >
                <h3 style={{ ...titleStyle, ...(isSolved ? whiteTextStyle : blueTextStyle) }}>{name}</h3>
                <div style={descriptionContainerStyle}>
                    <p style={{ ...levelStyle, ...(isSolved ? lightGreyTextStyle : mediumBlueTextStyle) }}>{level}</p>
                    <p style={{ ...pointsStyle, ...(isSolved ? whiteTextStyle : blueTextStyle) }}>{points}</p>
                    <p style={{ ...countStyle, ...(isSolved ? whiteTextStyle : greyTextStyle)}}>{solveCnt} solved</p>
                </div>
                <div style={{ ...categoryContainerStyle, ...(isSolved ? whiteBackStyle : blueBackStyle) }}>
                    <p style={{ ...categoryStyle, ...(isSolved ? blueTextStyle : whiteTextStyle) }}>{category}</p>
                </div>
            </div>

            <ChallengeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                id={id}
                name={name}
                description={description}
                points={points}
                level={level}
                category={category}
                solveCnt={solveCnt}
                createdAt={new Date(createdAt).toLocaleString()}
                filePath={filePath}
                isSolved={isSolved}
                onSolvedChange={setIsSolved}
            />
        </div>
    );
}

ChallengeCard.propTypes = {
    name : PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    initialSolved: PropTypes.number.isRequired,
};

const cardContainerStyle = {
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    width: '22vw',
    margin: '10px auto',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    border: '1px solid var(--dark-blue)',
    cursor: 'pointer',
    overflow: 'hidden',
};

const whiteBackStyle = {
    backgroundColor: 'white',
};

const blueBackStyle = {
    backgroundColor: 'var(--dark-blue)',
};  

const whiteTextStyle = {
    color: 'white',
};

const lightGreyTextStyle = {
    color: 'var(--light-grey)',
};

const greyTextStyle = {
    color: 'var(--dark-grey)',
};

const blueTextStyle = {
    color: 'var(--dark-blue)',
};

const mediumBlueTextStyle = {
    color: 'var(--medium-blue)',
};

const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'var(--dark-blue)',
    margin: 0,
};

const descriptionContainerStyle = {
    width: '100%',
    maxWidth: '22vw',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'pre-line',
    marginTop: 0,
    paddingTop: 0,
    gap: '0px',
};

const levelStyle = {
    fontSize: '12px',
    color: 'var(--medium-blue)',
    margin: '5px',
}

const pointsStyle = {
    fontSize: '16px',
    color: 'var(--dark-blue)',
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: '10px',
};

const countStyle = {
    fontSize: '12px',
    color: 'var(--dark-blue)',
    margin: '5px',
};

const categoryContainerStyle = {
    borderRadius: '18px',
    backgroundColor: 'var(--dark-blue)',
    width: '6vw',
    height: '3.5vh',
    margin: '5px auto',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--dark-blue)',
    justifyContent: 'center',
    alignItems: 'center',
};

const categoryStyle = {
    fontSize: '16px',
    color: 'white',
};

export default ChallengeCard;