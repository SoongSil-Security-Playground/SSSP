import React, { useState, useEffect } from 'react';
import NotificationCard from '../components/NotificationCard';
import Footer from '../components/Footer';
import { fetchNotices } from '../services/notice';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

function NotificationsPage() {
    const { logout } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                console.log(data);
            } catch (error) {
                if (error.message === "Failed to verify JWT token.") {
                    logout();
                }
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

    if (loading) return <p>Loading notifications...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={mainContainerStyle}>
            <div style={titleContainerStyle}>
                <h1 style={headerTextStyle}>Notifications</h1>
            </div>
            <div style={contentContainerStyle}>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            title={notification.title}
                            content={notification.content}
                            created_at={notification.created_at}
                        />
                    ))
                ) : (
                    <p style={noNotificationsStyle}>
                        No notifications at the moment.
                    </p>
                )}
            </div>
            <Footer />
        </div>
    );
}

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
    width: '100%',
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
    width: '100%',
};

const noNotificationsStyle = {
    fontSize: "16px",
    color: "var(--dark-grey)",
    marginTop: "150px",
};


export default NotificationsPage;