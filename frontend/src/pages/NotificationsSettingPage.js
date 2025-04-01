import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNotices, deleteNotice } from '../services/notice';
import { toast } from 'react-toastify';
import NotificationInfoCard from '../components/NotificationInfoCard';
import addIcon from '../assets/images/add.png';

function NotificationsSettingsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/admin/notifications/add');
    }

    const handleEdit = (notificationId) => {
        const notificationToEdit = notifications.find(notification => notification.id === notificationId);
        console.log(notificationToEdit);
        navigate(`/admin/notifications/edit/${notificationId}`, { state: { notification: notificationToEdit } });
    };

    const handleDelete = async (notificationId) => {
        const confirmation = window.confirm("정말로 이 공지를 삭제하시겠습니까?");
        if (!confirmation) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found. Please log in.");
            }
    
            await deleteNotice(notificationId, token);

            const updatedNotices = await fetchNotices(token);
            setNotifications(updatedNotices);

            console.log(`Notice with ID ${notificationId} deleted successfully.`);
        } catch (error) {
            console.error("Failed to delete notice:", error.message);
            alert(`Failed to delete notice: ${error.message}`);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No token found. Please log in.");
                }

                const data = await fetchNotices(token);
                setNotifications(data); 
            } catch (error) {
                console.error("Error fetching notices:", error.message);
                toast.error(
                    <div>
                        <p className="toast-title">Failed to fetch notifications</p>
                        <p className="toast-content">{error.message}</p>
                        <p className="toast-time">{new Date().toLocaleString()}</p>
                    </div>
                );
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={mainContainerStyle}>
            <div style={titleContainerStyle}>
                <h1 style={headerTextStyle}>Notifications</h1>
            </div>
                <div style={contentContainerStyle}>
                    <button style={addnotificationButtonStyle} onClick={handleAdd}>
                        <img 
                            src={addIcon} 
                            alt="Add" 
                            onClick={handleAdd} 
                        />
                    </button>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <NotificationInfoCard
                                key={notification.id}
                                title={notification.title}
                                content={notification.content}
                                created_at={notification.created_at}
                                onEdit={() => handleEdit(notification.id)}
                                onDelete={() => handleDelete(notification.id)}
                            />
                        ))
                    ) : (
                        <p style={noNotificationsStyle}>
                            No notifications at the moment.
                        </p>
                    )}
                </div>
        </div>
    );
}

export default NotificationsSettingsPage;


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
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50vw',
};

const addnotificationButtonStyle = {
    display: 'flex',
    borderRadius: '16px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
    padding: '12px 20px',
    margin: '20px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    alignContent: 'center',
    width: '100px',
};

const noNotificationsStyle = {
    fontSize: "16px",
    color: "var(--dark-grey)",
    marginTop: "150px",
};