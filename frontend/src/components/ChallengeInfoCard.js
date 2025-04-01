import React, { useState, useEffect } from "react";
import editIcon from "../assets/images/edit.png";
import deleteIcon from "../assets/images/delete.png";
import { useAuth } from "../contexts/AuthContext";

function ChallengeInfoCard({id, name, category, description, points, createdAt, onEdit, onDelete}) {
    const { isAdmin } = useAuth();
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);



    return (
        <div style={cardContainerStyle}>
            <div style={contentWrapperStyle}>
                <p>{id}</p>
                <p style={categoryStyle}>{category}</p>
                <p style={titleStyle}>{name}</p>
                <p style={pointsStyle}>{points}</p>
                {/* <p style={descriptionStyle}>{description}</p> */}
                <p style={timeStampStyle}>{createdAt}</p>
            </div>
            { isAdmin && (
                <div style={actionsWrapperStyle}>
                <span 
                    style={actionStyle(isEditHovered)}
                    onMouseEnter={() => setIsEditHovered(true)} 
                    onMouseLeave={() => setIsEditHovered(false)}
                >
                    <img 
                        src={editIcon} 
                        alt="Edit" 
                        onClick={onEdit} 
                    />
                </span>
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
            )}
        </div>
    );
}

export default ChallengeInfoCard;

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

const pointsStyle ={
    fontSize: '15px',
    color: 'var(--dark-grey)',
};

const descriptionStyle = {
    fontSize: '15px',
    color: 'var(--p-color)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

const timeStampStyle = {
    size: '7px',
    color: 'var(--medium-grey)',
}

const actionsWrapperStyle = {
    alignItems: 'center',
    display: 'flex',
    gap: '10px',
};

const actionStyle = (isHovered) => ({
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    width: '20px',
    height: '20px',
    transition: 'transform 0.2s',
    transform: isHovered ? 'scale(1.1)' : 'none',
    opacity: isHovered ? '0.8' : '1',
});