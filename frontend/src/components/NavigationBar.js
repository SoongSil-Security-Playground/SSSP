import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/images/logo.png';
import AdminDropdown from './AdminDropdown';

function NavigationBar() {
    const { isLoggedIn, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log('Attempting to logout');
        await logout();
        navigate('/');
    };

    return (
        <nav style={navStyle}>
            <div style={logoContainerStyle}>
                <Link to="/" style={linkStyle}>
                    <img src={logo} alt="logo" style={logoImageStyle} />
                </Link>
            </div>
            <div style={globalBarStyle}>
                <Link to="/users" style={linkStyle}>
                    <button style={buttonStyle}>Users</button>
                </Link>
                <Link to="/scoreboard" style={linkStyle}>
                    <button style={buttonStyle}>Scoreboard</button>
                </Link>
                <Link to="/challenges" style={linkStyle}>
                    <button style={buttonStyle}>Challenges</button>
                </Link>
                <Link to="/notifications" style={linkStyle}>
                    <button style={buttonStyle}>Notifications</button>
                </Link>
            </div>
            <div style={adminBarStyle}>
                {isAdmin ? (
                    <>
                        <AdminDropdown />
                    </>
                ):(
                    <>
                    </>
                )}
            </div>
            <div style={privBarStyle}>
                {isLoggedIn ? (
                    <>
                        <Link to="/mypage" style={linkStyle}>
                            <button style={buttonWhiteBlueStyle}>My Page</button>
                        </Link>
                        <button style={buttonBlueStyle} onClick={handleLogout}>logout →</button>
                    </>
                ) : (
                    <Link to="/login" style={linkStyle}>
                        <button style={buttonBlueStyle}>login →</button>
                    </Link>
                )}
            </div>
        </nav>
    );
}

const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    width: '100vw',
    //overflowX: 'hidden',
    backgroundColor: 'white',
    borderBottom: '1px solid #eaeaea',
    zIndex: 1000,
    boxSizing: 'border-box',
};

const logoContainerStyle = {
    flex: '0 0 auto',
    marginLeft: '20px',
};

const globalBarStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flex: '1',
};

const adminBarStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    felx: '1',
};

const privBarStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    minWidth: '250px',
    justifyContent: 'flex-end',
    marginRight: '20px',
};

const linkStyle = {
    textDecoration: 'none',
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--text-color)',
    cursor: 'pointer',
};

const buttonBlueStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    backgroundColor: 'var(--medium-blue)',
    color: '#FFFFFF',
    cursor: 'pointer',
    borderRadius: '8px',
};

const buttonWhiteBlueStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    backgroundColor: 'white',
    color: 'var(--dark-blue)',
    cursor: 'pointer',
    borderRadius: '8px',
};

const logoImageStyle = {
    height: '60px',
    width: 'auto',
};

export default NavigationBar;
