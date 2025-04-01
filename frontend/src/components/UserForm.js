import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function UserForm({ id }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user || null;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setContent(user.content);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { id: user ? user.id : Date.now(), name, email, content, password };
        navigate("/UserSettingPage");
    };

    return (
        <div style={mainContainerStyle}>
            <div style={titleContainerStyle}>
                <h1 style={headerTextStyle}>User</h1>
            </div>
            <div style={contentContainerStyle}>
                <div style={profileContainerStyle}>
                    <div style={profileIconStyle}></div>
                </div>
                <form style={formContainerStyle} onSubmit={handleSubmit}>
                    <div style={formFieldStyle}>
                        <label style={labelStyle}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={formFieldStyle}>
                        <label style={labelStyle}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={formFieldStyle}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={formFieldStyle}>
                        <label style={labelStyle}>Contents</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={textareaStyle}
                        ></textarea>
                    </div>
                    <div style={buttonContainerStyle}>
                        <button
                            style={submitButtonStyle(isHovered)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            type="submit"
                        >
                            Submit →
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserForm;

const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    margin: 0,
};

const titleContainerStyle = {
    marginTop: '12vh',
    textAlign: 'center',
    padding: '20px 0',
};

const headerTextStyle = {
    color: 'var(--dark-blue)',
    marginBottom: '2px',
};

const contentContainerStyle = {
    marginTop: '20px',
    position: 'relative',
    backgroundColor: 'transparent',
    width: '400px',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 0 8px lightgray',
    height: 'fit-content',
};

const profileContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5px',
};

const profileIconStyle = {
    height: '60px',
    width: '60px',
    borderRadius: '50%',
    backgroundColor: 'lightgrey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    color: '#9CA3AF',
};

const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
};

const formFieldStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const labelStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#006e93',
    marginBottom: '5px',
    textAlign: 'left',
};

const inputStyle = {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    backgroundColor: 'white',
    color: '#707070',
    outline: 'none',
};

const textareaStyle = {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    backgroundColor: 'white',
    color: '#707070',
    outline: 'none',
    height: '120px',
    resize: 'none',
};

const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-start',
    alignItems: 'center',
};

const submitButtonStyle = (isHovered) => ({
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.3s',
    backgroundColor: isHovered ? '#005f7f' : '#006e93',
});
