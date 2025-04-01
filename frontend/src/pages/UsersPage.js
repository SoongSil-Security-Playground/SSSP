import React, {useState, useEffect} from 'react';
import UserCard from '../components/UserCard';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers } from '../services/user';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

function UsersPage() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found. Please log in.");
                }
                const data = await fetchAllUsers(token);
                setUsers(data);
            } catch (error) {
                if (error.message === "Failed to verify JWT token.") {
                    logout();
                }
                console.error("Error fetching Users:", error.message);
                toast.error(
                    <div>
                        <p className="toast-title">Failed to fetch Users</p>
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
    }, [navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={mainContainerStyle}>
            <div style={titleContainerStyle}>
                <h1 style={headerTextStyle}>Users</h1>
            </div>
            <div style={contentContainerStyle}>
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        name={user.username}
                        description={user.contents}
                    />
                ))}
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

export default UsersPage;