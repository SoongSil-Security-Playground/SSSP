import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/auth';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        console.log('Attempting to login with:', { username, password });

        try {
            const response = await loginUser(username, password);
            await login(response.access_token);
            setSuccess(true);
            console.log('Login successful:', response);
            navigate('/');
        } catch (error) {
            const formattedError = error.message.replace(/\n/g, '<br>');
            setError(<span dangerouslySetInnerHTML={{ __html: formattedError }} />);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <div style={mainContainerStyle}>
            <h1 style={headerTextStyle}>LOGIN</h1>
            <form style={loginContainerStyle} onSubmit={handleLogin}>
                <label style={labelStyle}>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                />

                <label style={labelStyle}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />

                <div style={buttonContainerStyle}>
                    <button style={loginButtonStyle} type="submit">
                        login →
                    </button>
                    <button style={registerButtonStyle} type="button" onClick={handleRegister}>
                        Register →
                    </button>
                </div>

                {error && <p style={errorTextStyle}>{error}</p>}
                {success && <p style={successTextStyle}>redirecting...</p>}
            </form>
        </div>
    );
}

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

const bodyTextStyle = {
    color: 'var(--dark-blue)',
    marginBottom: '5px',
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
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid var(--light-grey)',
    borderRadius: '5px',
    boxSizing: 'border-box',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px',
    marginTop: '10px',
};

const loginButtonStyle = {
    backgroundColor: 'var(--medium-blue)',
    color: '#FFFFFF',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const registerButtonStyle = {
    backgroundColor: '#FFFFFF',
    color: 'var(--medium-blue)',
    padding: '10px 20px',
    border: '1px solid var(--medium-blue)',
    borderRadius: '5px',
    cursor: 'pointer',
};

const successTextStyle = {
    color: 'var(--dark-blue)',
    fontSize: '14px',

}

const errorTextStyle = {
    color: 'var(--dark-grey)',
    fontSize: '14px',

}

export default LoginPage;
