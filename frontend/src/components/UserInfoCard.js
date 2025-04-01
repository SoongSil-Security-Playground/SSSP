import React, { useState } from "react";
import Avatar from 'react-avatar';
import deleteIcon from "../assets/images/delete.png";

function UserInfoCard({ id, name, email, content, onDelete }) {
    const customColors = [
        getCSSVariable("--light-blue"),
        getCSSVariable("--light-green"),
        getCSSVariable("--medium-blue"),
        getCSSVariable("--dark-blue"),
        getCSSVariable("--medium-grey"),
    ];

    // const [isEditHovered, setIsEditHovered] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);

    return (
        <div style={cardContainerStyle}>
            <div style={contentWrapperStyle}>
                <div style={idStyle}>{id}</div>
                <Avatar 
                    name={name} 
                    round={true} 
                    size="40" 
                    textSizeRatio={2} 
                    colors={customColors}
                />
                <div style={nameStyle}>{name}</div>
                <div style={emailStyle}>{email}</div>
                <div style={contentStyle}>{content}</div>
            </div>
            <div style={actionsWrapperStyle}>
                {/* <span 
                    style={actionStyle(isEditHovered)}
                    onMouseEnter={() => setIsEditHovered(true)} 
                    onMouseLeave={() => setIsEditHovered(false)}
                >
                    <img 
                        src={editIcon} 
                        alt="Edit" 
                        onClick={onEdit} 
                    />
                </span> */}
                <span 
                    style={actionStyle(isDeleteHovered)}
                    onMouseEnter={() => setIsDeleteHovered(true)} 
                    onMouseLeave={() => setIsDeleteHovered(false)}
                >
                    <img 
                        src={deleteIcon} 
                        alt="Delete" 
                        onClick={onDelete} 
                    />
                </span>
            </div>
        </div>
    );
}

export default UserInfoCard;

const getCSSVariable = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

const cardContainerStyle = {
    display: 'flex',
    borderRadius: '16px',
    padding: '12px 16px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    margin: '8px',
    width: '100%',
};

const contentWrapperStyle = {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    gap: '12px',
    padding: '8px',
};

const iconStyle = {
    marginRight: '8px',
};

const idStyle = {
    fontWeight: 'bold',
    color: 'var(--dark-blue)',
};

const nameStyle = {
    fontWeight: 'bold',
    color: 'var(--dark-blue)',
};

const emailStyle = {
    color: 'grey',
};

const contentStyle = {
    color: 'grey',
};

const actionsWrapperStyle = {
    alignItems: 'center',
    display: 'flex',
    gap: '10px',
};

const actionStyle = (isHovered) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    width: '20px',
    height: '20px',
    transition: 'transform 0.2s',
    transform: isHovered ? 'scale(1.1)' : 'none',
    opacity: isHovered ? '0.8' : '1',
});