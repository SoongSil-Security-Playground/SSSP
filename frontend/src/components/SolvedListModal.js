import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserSolvedChallenge } from '../services/challenge';
import ChallengeSimpleCard from './ChallengeSimpleCard';

function SolvedListModal({isOpen, onClose}) {
    const [solvedCallenges, setSolvedChallenges] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("SolvedListModal isOpen prop:", isOpen);

        const fetchData = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found. Redirecting to login...');
                    navigate('/login');
                    return;
                }
    
                const data = await fetchUserSolvedChallenge(token);
                console.log(data);
                setSolvedChallenges(data);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
                setError(error.message || 'Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={overlayStyle} onClick={handleOverlayClick}>
            <div style={modalContainerStyle} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} style={closeButtonStyle}>×</button>
                <h2 style={titleStyle}>Solved</h2>
                <div style={contentContainerStyle}>
                    {solvedCallenges.length > 0 ? (
                        solvedCallenges.map((challenge) => (
                            <ChallengeSimpleCard
                                key={challenge.id}
                                name={challenge.name}
                                points={challenge.points}
                                solveCnt={challenge.solved_count}
                                level={challenge.level}
                                category={challenge.category}
                            />
                        ))
                    ) : (
                        <p style={emptyTextContainer}>
                            solved challenges empty
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '27vw',
    position: 'relative',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '24px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
};

const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'var(--dark-blue)',
};

const contentContainerStyle = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    gap: '10px',
    maxHeight: '60vh',
    overflowY: 'auto', 
    overflowX: 'hidden', 
    paddingRight: '5px',
    width: '100%',
    marginBottom: '10px',
    justifyContent: 'flex-start',
};

const emptyTextContainer = {
    fontSize: '12px',
    color: 'var(--medium-grey)',
    justifyContent: 'center',
    alignItems: 'center', 
    height: '100%',
    display: 'flex',
};

export default SolvedListModal;