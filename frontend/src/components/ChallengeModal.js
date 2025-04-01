import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { submitFlag } from '../services/challenge';
import { toast } from 'react-toastify';

function ChallengeModal({ isOpen, onClose, id, name, description, points, category, solveCnt, level, createdAt, filePath, isSolved: initialSolved, onSolvedChange }) {
    const [isSolved, setIsSolved] = useState(initialSolved);
    const [flag, setFlag] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("ChallengeModal isOpen prop:", isOpen);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmitFlag = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found. Please log in.");
            }
            const response = await submitFlag(token, id, flag);
            console.log(response.detail);
            if (response.detail === "Correct!") {
                setIsSolved(true);
                onSolvedChange(true);
                toast.success("Correct!");
            } else if (response.detail === "Wrong Flag!") {
                toast.error("Wrong Flag!");
            }
            setFlag('');
        } catch (error) {
            console.error("Error submit flag:", error.message);
            toast.error(
                <div>
                    <p className="toast-title">Failed to submit flag</p>
                    <p className="toast-content">{error.message}</p>
                    <p className="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleDownload = () => {
        if (filePath) {
            const link = document.createElement('a');
            link.href = filePath;
            link.download = filePath.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("No file path available for download.");
        }
    };

    return (
        <div style={overlayStyle} onClick={handleOverlayClick}>
            <div style={modalContainerStyle} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} style={closeButtonStyle}>×</button>
                <h2 style={titleStyle}>{name}</h2>
                <div style={categoryContainerStyle}>
                    <p style={categoryStyle}>{category}</p>
                </div>
                <div style={informationContainerStyle}>
                    <p style={levelStyle}>{level}</p>
                    <p style={countStyle}>{solveCnt} solved</p>
                    <p style={descriptionStyle}>{description}</p>
                    {filePath && (
                        <button style={downloadButtonStyle} onClick={handleDownload}>
                            Download
                        </button>
                    )}
                </div>

                {isSolved ? (
                    <p style={solvedStyle}>solved</p>
                ) : (
                    <div style={inputContainerStyle}>
                        <input type="text" placeholder="flag" style={inputStyle} value={flag} onChange={(e) => setFlag(e.target.value)}/>
                        <button style={submitButtonStyle} onClick={handleSubmitFlag}>submit</button>
                    </div>
                )}
            </div>
        </div>
    );
}

ChallengeModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    // name: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // points: PropTypes.number.isRequired,
    // category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    filePath: PropTypes.string,
    // isSolved: PropTypes.number.isRequired,
    onSolvedChange: PropTypes.func.isRequired,
};


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
    padding: '20px',
    width: '27vw',
    position: 'relative',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
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

const categoryContainerStyle = {
    borderRadius: '18px',
    backgroundColor: 'var(--dark-blue)',
    width: '5.8vw',
    height: '3.2vh',
    margin: '10px auto',
    marginTop: '-10px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--dark-blue)',
};

const categoryStyle = {
    fontSize: '14px',
    color: 'white',
    margin: 0,
    marginBottom: '10px',
};

const informationContainerStyle = {
    backgroundColor: 'transparent',
    width: '100%',
    maxWidth: '330px',
    maxHeight: '300px',
    margin: '10px auto',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'auto',
    gap: 0,
};

const levelStyle = {
    fontSize: '12px',
    color: 'var(--medium-blue)',
    margin: '5px',
};

const descriptionStyle = {
    fontSize: '16px',
    color: 'grey',
    marginTop: '20px',
    marginBottom: '20px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
};

const connectionStyle = {
    fontSize: '16px',
    color: 'var(--medium-blue)',
    marginTop: '0px',
};

const countStyle = {
    fontSize: '12px',
    color: 'var(--dark-grey)',
    margin: 0,
};

const downloadButtonStyle = {
    backgroundColor: 'white',
    color: 'var(--light-blue)',
    border: '1px solid var(--light-blue)',
    borderRadius: '5px',
    cursor: 'pointer',
};

const solvedStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'var(--dark-blue)',
    marginTop: '20px',
};

const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '10px',
};

const inputStyle = {
    padding: '8px',
    borderRadius: '20px',
    border: '1px solid var(--dark-blue)',
    marginLeft: '20px',
    marginRight: '10px',
    flex: '5',
};

const submitButtonStyle = {
    padding: '8px 16px',
    backgroundColor: 'var(--medium-blue)',
    color: 'white',
    borderRadius: '15px',
    marginRight: '20px',
    cursor: 'pointer',
    border: 'none',
    flex: '1',
};

export default ChallengeModal;