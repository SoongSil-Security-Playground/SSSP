import React, {useState} from 'react';
import PropTypes from 'prop-types';
import editIcon from "../assets/images/edit.png";
import deleteIcon from "../assets/images/delete.png";

function NotificationInfoCard({ title, content, created_at, onEdit, onDelete}) {
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);

    return (
        <div style={cardContainerStyle}>
            <div>
                <h3 style={titleStyle}>{title}</h3>
                <p style={contentStyle}>{content}</p>
                <p style={timestampStyle}>{created_at}</p>
            </div>
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
        </div>
    );
}

export default NotificationInfoCard;

NotificationInfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
};

const cardContainerStyle = {
    display: 'flex',
    borderRadius: '16px',
    padding: '12px 16px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '8px',
    width: '100%',
    flexDirection: 'row',
    textAlign: 'left',
};

const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'var(--dark-blue)',
    margin: 0,
    marginBottom: '0px',
};

const contentStyle = {
    fontSize: '14px',
    color: 'var(--text-color)',
    margin: 0,
    marginBottom: '10px',
    whiteSpace: 'pre-line',
};

const timestampStyle = {
    fontSize: '12px',
    color: '#a0a0a0',
    margin: 0,
};

const actionsWrapperStyle = {
    alignItems: 'center',
    display: 'flex',
    gap: '10px',
    marginRight: '10px',
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