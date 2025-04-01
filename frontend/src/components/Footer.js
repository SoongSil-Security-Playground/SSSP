import React from 'react';

function Footer() {
    return (
        <div style={mainContainerStyle}>
            <div style={leftContainerStyle}>
                <span style={textStyle}>Copyright © 2024 SSSP</span>
            </div>
            <div style={rightContainerStyle}>
                <span style={textStyle}>All Rights Reserved</span>
                <a href="/terms" style={linkStyle}>Terms and Conditions</a>
                <a href="/privacy" style={linkStyle}>Privacy Policy</a>
            </div>
        </div>
    );
}

const mainContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 200px',
    width: '100%',
    marginBottom: '10px',
    boxSizing: 'border-box',
    fontSize: '14px',
};

const leftContainerStyle = {
    flex: '1',
    textAlign: 'left',
};

const rightContainerStyle = {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
};

const textStyle = {
    color: 'lightgrey',
    margin: 0,
    fontSize: '12px',
};

const linkStyle = {
    textDecoration: 'underline',
    color: 'grey',
    fontSize: '12px',
};

export default Footer;