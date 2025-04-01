import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createNotice, updateNotice } from "../services/notice";
import { toast } from "react-toastify";

function NotificationForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const notification = location.state?.notification || null;
    const isUpdate = !!notification;
    const [id, setId] = useState(notification ? notification.id : 0);
    const [title, setTitle] = useState(notification ? notification.title : '');
    const [content, setContent] = useState(notification ? notification.content : '');

    const [isHovered, setIsHovered] = useState(false);

    const handleSubmitClick = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error("Title and content are required!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Authentication token is missing. Please log in.");
                navigate('/login');
                return;
            }
            if (isUpdate) {
                await updateNotice(id, title, content, token);
            } else {
                await createNotice(title, content, token);
            }
            
            navigate('/admin/notifications');
        } catch (error) {
            console.error("Failed to create notification:", error.message);
            toast.error(
                <div>
                    <p className="toast-title">Failed to create Notification</p>
                    <p className="toast-content">{error.message}</p>
                    <p className="toast-time">{new Date().toLocaleString()}</p>
                </div>
            );
        }

        navigate('/admin/notifications');
    };

    useEffect(() => {
        if (notification) {
            setTitle(notification.title);
            setContent(notification.content);
        }
    }, [notification]);

    return (
        <div style={mainContainerStyle}>
            <div style={titleContainerStyle}>
                <h1 style={headerTextStyle}>Notification</h1>
            </div>
            <div style={contentContainerStyle} >
                <form style={formContainerStyle} onSubmit={handleSubmitClick}>
                    <div style={formFieldStyle}>
                        <label style={labelStyle}>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={formFieldStyle}>
                        <label style={labelStyle}>Content</label>
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

export default NotificationForm;

const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 80px',
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
    width: '450px',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 0 8px lightgray',
    height: 'fit-content',
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
