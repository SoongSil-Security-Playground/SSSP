import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../services/user';
import { toast } from 'react-toastify';

function ChangePasswordForm() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert('You are not authenticated. Please log in.');
                navigate('/login');
                return;
            }

            await updatePassword(password, newPassword, token);

            toast.success(
                <div>
                    <p classusername="toast-title">Password Updated!</p>
                    <p classusername="toast-content">성공적으로 변경되었습니다.</p>
                    <p classusername="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
            navigate('/mypage'); 
        } catch (error) {
            console.error('Failed to update password:', error.message);
            toast.error(
                <div>
                    <p classusername="toast-title">Password Update Failed</p>
                    <p classusername="toast-content">비밀번호 변경 실패</p>
                    <p classusername="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div style={pageContainerStyle}>
            <style>{placeholderStyle}</style>
            <div style={profileContainerStyle}>
                <div style={profileIconStyle}></div>
            </div>
            <form style={formContainerStyle} onSubmit={handleSubmit}>
                <div style={formFieldStyle}>
                    <label style={labelStyle}>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ ...inputStyle, ':focus': inputFocusStyle }}
                        placeholder="Enter current password"
                        required
                    />
                </div>
                <div style={formFieldStyle}>
                    <label style={labelStyle}>New Password</label>
                    <input 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ ...inputStyle, ':focus': inputFocusStyle }}
                        placeholder="Enter new password"
                        required
                    />
                </div>
                <div style={buttonContainerStyle}>
                    <button
                        style={{
                            ...changePasswordButtonStyle,
                            opacity: isSubmitting ? 0.6 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        }}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Updating...' : 'Change Password'}
                    </button>
                </div>
            </form>
        </div>
    );
}

const pageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25vw',
    margin: '0 auto',
    boxSizing: 'border-box',
    border: '1px solid lightgrey',
    borderRadius: '8px',
    padding: '30px',
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
    backgroundColor: 'var(--sky-blue)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    color: '#9CA3AF',
};

const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '15px',
};

const formFieldStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const labelStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'var(--dark-blue)',
    marginBottom: '5px',
    textAlign: 'left',
};

const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    backgroundColor: 'white',
    outline: 'none',
    transition: 'border-color 0.2s ease',
};

const inputFocusStyle = {
    borderColor: 'var(--dark-blue)',
};

const placeholderStyle = `
  input::placeholder, textarea::placeholder {
    color: var(--dark-blue);
  }
`;

const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-start',
    marginTop: '20px',
};

const changePasswordButtonStyle = {
    backgroundColor: 'var(--dark-blue)',
    color: 'white',
    fontWeight: 'bold',
    marginRight: '15px',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
};

export default ChangePasswordForm;