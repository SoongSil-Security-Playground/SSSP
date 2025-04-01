import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo, updateUserInfo, deleteUserInfo } from '../services/user';
import { fetchUserScore } from '../services/score';
import { toast, } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import SolvedListModal from './SolvedListModal';
import Avatar from 'react-avatar';

function ProfileForm() {
    const customColors = [
        getCSSVariable("--light-blue"),
        getCSSVariable("--light-green"),
        getCSSVariable("--medium-blue"),
        getCSSVariable("--dark-blue"),
        getCSSVariable("--medium-grey"),
    ];

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contents, setContents] = useState('');
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {logout} = useAuth();

    const handleOpenModal = () => {
        console.log("Opening modal");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        console.log("Closing modal");
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found. Redirecting to login...');
                    navigate('/login');
                    return;
                }
    
                const userData = await fetchUserInfo(token);
                setUsername(userData.username || '');
                setEmail(userData.email || '');
                setContents(userData.contents || '');

                const scoreData = await fetchUserScore(token);
                setScore(scoreData.total_score)
                console.log(scoreData.total_score);
                console.log('loading: ', loading);
                console.log('score: ',score);
            } catch (error) {
                console.error('Error fetching user data:', error.message);

                if (error.message === "Failed to verify JWT token.") {
                    logout();
                }

                setError(error.message || 'Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [navigate, score]);
    
    const handleSaveClick = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found. Please log in again.");
            }
    
            const updatedData = await updateUserInfo(token, contents);
            console.log("Contents updated successfully:", updatedData);
            toast.dismiss();
            toast.success(
                <div>
                    <p classusername="toast-title">Profile Updated!</p>
                    <p classusername="toast-content">성공적으로 변경되었습니다.</p>
                    <p classusername="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
        } catch (error) {
            console.error("Error updating contents:", error.message);
            toast.error(
                    <div>
                    <p classusername="toast-title">Profile Update Error</p>
                    <p classusername="toast-content">{error.message}</p>
                    <p classusername="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };    

    const handleChangePasswordClick = (event) => {
        event.preventDefault();
        navigate('/mypage/change-password');
    };

    
    const handleDeleteAccountClick = async () => {
        const confirmDelete = window.confirm("정말로 계정을 삭제하시겠습니까?");

        if (!confirmDelete) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found. Please log in again.");
            }

            const response = await deleteUserInfo(token);
            console.log("Delete Account successfully:", response); 
            await logout();
            navigate('/');

            toast.dismiss();
            toast.success(
                <div>
                    <p classusername="toast-title">Account Deleted!</p>
                    <p classusername="toast-content">성공적으로 탈퇴되었습니다.</p>
                    <p classusername="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
        } catch (error) {
            console.error("Error delete contents:", error.message);
            if (error.message === "Failed to verify JWT token.") {
                logout();
            }
            toast.error(
                    <div>
                    <p classusername="toast-title">Account Delete Error</p>
                    <p classusername="toast-content">{error.message}</p>
                    <p classusername="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={pageContainerStyle}>
            <div style={profileImageContainerStyle}>
                <Avatar 
                    name={username} 
                    round={true} 
                    size="40" 
                    textSizeRatio={2} 
                    colors={customColors}
                />
            </div>
            <form style={formContainerStyle}>
                <div style={formFieldStyle}>
                    <label style={labelStyle}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <label style={labelStyle}>Contents</label>
                    <textarea
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                        style={textareaStyle}
                    ></textarea>
                </div>
                <div style={formFieldStyle}>
                    <label style={labelStyle}>Score</label>
                    <div style={scoreContainerStyle}>
                        <span style={scoreTextStyle}>{score}</span>
                        <button style={openModalButtonStyle} onClick={handleOpenModal}>Solved</button>
                    </div>
                </div>
                <div style={buttonContainerStyle}>
                    <button style={changePasswordButtonStyle} onClick={handleChangePasswordClick}>
                        Change Password
                    </button>
                    <button style={deleteAccountButtonStyle} onClick={handleDeleteAccountClick}>
                        Delete Account
                    </button>
                    <button style={saveButtonStyle} onClick={handleSaveClick} disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>

            <SolvedListModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}

const getCSSVariable = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

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

const profileImageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5px',
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

const textareaStyle = {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    backgroundColor: 'white',
    outline: 'none',
    resize: 'none',
};

const scoreContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
};

const scoreTextStyle = {
    flex: '3',
    color: 'var(--text-color)',
    textAlign: 'left',
    fontSize: '16px',
};

const openModalButtonStyle = {
    flex: '1',
    backgroundColor: 'var(--light-blue)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    height: '100%',
    fontSize: '12px',
};

const buttonContainerStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '20px',
    alignItems: 'center',
    overflowY: 'hidden',
};

const changePasswordButtonStyle = {
    backgroundColor: 'var(--dark-blue)',
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    height: '50px',
};

const deleteAccountButtonStyle = {
    backgroundColor: 'var(--dark-grey)',
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid var(--dark-grey)',
    cursor: 'pointer',
    height: '50px',
};

const saveButtonStyle = {
    backgroundColor: 'white',
    color: 'var(--dark-blue)',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid var(--dark-blue)',
    cursor: 'pointer',
    height: '50px',
    marginLeft: '25px',
};

export default ProfileForm;