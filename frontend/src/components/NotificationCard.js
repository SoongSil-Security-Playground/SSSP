import React from 'react';
import PropTypes from 'prop-types';

function NotificationCard({ title, content, created_at }) {
    return (
        <div style={cardContainerStyle}>
            <h3 style={titleStyle}>{title}</h3>
            <p style={contentStyle}>{content}</p>
            <p style={timestampStyle}>{created_at}</p>
        </div>
    );
}

NotificationCard.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

const cardContainerStyle = {
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '1000px',
    margin: '10px auto',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
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
    whiteSpace: 'pre-wrap',
};

const timestampStyle = {
    fontSize: '12px',
    color: '#a0a0a0',
    margin: 0,
};

export default NotificationCard;