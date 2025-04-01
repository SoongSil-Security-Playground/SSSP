
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, sendAuthCode, verifyAuthCode } from '../services/auth';
import { toast, } from 'react-toastify';

const IS_USE_EMAIL = process.env.REACT_APP_USE_EMAIL_AUTH;
console.log(IS_USE_EMAIL);

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sent, setSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true);
        setError(null);

        console.log('Register request started with:', { username, email, password });

        try {
            const data = await registerUser(username, email, password);
            console.log('Registration successful:', data);

            setSuccess(true);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error.message);
            setError(error.message);

            toast.error(
                <div>
                    <p className="toast-title">Registration Failed</p>
                    <p className="toast-content">{error.message}</p>
                    <p className="toast-time">{new Date().toLocaleString()}</p>
                </div>,
                { icon: false }
            );
        } finally {
            setLoading(false);
            console.log('Register request completed.');
        }
    };

    const handleSend = async () => {
        setError(null);

        toast.info(
            <div>
                <p className="toast-title">Sending Email</p>
                <p className="toast-content">이메일을 보내고 있습니다.</p>
                <p className="toast-time">{new Date().toLocaleString()}</p>
            </div>,
            { autoClose: false }
        );

        try {
            await sendAuthCode(email);
            toast.dismiss();
            toast.success(
                <div>
                    <p className="toast-title">Email Sent</p>
                    <p className="toast-content">이메일이 전송되었습니다.</p>
                    <p className="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
            setSent(true);
        } catch (error) {
            setError(error.message);
            toast.dismiss();
            toast.error(
                <div>
                    <p className="toast-title">Failed to Send Email</p>
                    <p className="toast-content">{error.message}</p>
                    <p className="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
        } finally {
            setLoading(false);
        }
    };

    const handleVerfication = async () => {
        setError(null);

        try {
            await verifyAuthCode(email, authCode);
            toast.success(
                <div>
                    <p className="toast-title">Verification Successful</p>
                    <p className="toast-content">인증되었습니다.</p>
                    <p className="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
            setVerified(true);
        } catch (error) {
            setError(error.message);
            toast.error(
                <div>
                    <p className="toast-title">Verification Failed</p>
                    <p className="toast-content">{error.message}</p>
                    <p className="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={mainContainerStyle}>
            <h1 style={headerTextStyle}>REGISTER</h1>
            <div style={loginContainerStyle}>
                <label style={labelStyle}>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                />

                <label style={labelStyle}>Email</label>
                <div style={emailContainerStyle}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                    />
                    
                    {IS_USE_EMAIL === "true" && (
                        <button
                            style={authButtonStyle}
                            onClick={handleSend}
                            disabled={loading || sent}
                        >
                            {sent ? 'Sent' : 'Send'}
                        </button>
                    )}
                </div>

                {IS_USE_EMAIL === "true" && (
                    <>

                        <label style={labelStyle}>Verification Code</label>
                        <div style={emailContainerStyle}>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value.replace(/[^0-9]/g, ''))}
                                maxLength={6}
                                style={inputStyle}
                            />
                            <button
                                style={authButtonStyle}
                                onClick={handleVerfication}
                                disabled={loading || verified}
                            >
                                {verified ? 'Verified' : 'Verify'}
                            </button>
                        </div>
                    </>)}

                <label style={labelStyle}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />

                <div style={buttonContainerStyle}>
                    <button
                        style={registerButtonStyle}
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const mainContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    flexDirection: 'column',
    margin: 0,
    marginTop: '-30px',
};


const loginContainerStyle = {
    backgroundColor: 'white',
    border: '2px solid var(--medium-grey)',
    marginTop: '10px',
    padding: '20px',
    width: '400px',
    borderRadius: '10px',
    boxSizing: 'border-box',
};

const headerTextStyle = {
    color: 'var(--dark-blue)',
    marginBottom: '2px',
};

const labelStyle = {
    fontSize: '14px',
    color: 'var(--dark-blue)',
    fontWeight: 600,
    marginBottom: '5px',
    display: 'block',
    textAlign: 'left',
};

const inputStyle = {
    width: '100%',
    padding: '10px 15px',
    height: '40px',
    marginBottom: '20px',
    border: '1px solid var(--light-grey)',
    borderRadius: '5px',
    boxSizing: 'border-box',
};

const emailContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px',
    marginTop: '10px',
};

const authButtonStyle = {
    backgroundColor: 'var(--light-blue)',
    color: '#FFFFFF',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
};

const registerButtonStyle = {
    backgroundColor: 'var(--medium-blue)',
    color: '#FFFFFF',
    padding: '10px 20px',
    height: '40px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
};

export default RegisterPage;