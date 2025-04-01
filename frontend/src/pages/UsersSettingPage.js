import React, { useState, useEffect } from "react";
import UserInfoCard from "../components/UserInfoCard";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers } from '../services/user';
import { toast } from 'react-toastify';

function UsersSettingPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    // const handleEdit = (userId) => {
    //     const userToEdit = users.find(user => user.id === userId);
    //     navigate(`/admin/users/edit/${userId}`, { state: { user: userToEdit } });
    // };

    const handleDelete = (userId) => {
        if (window.confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
        }
    };

    const filteredUsers = users.filter(user => 
        (user.name && (user.name.toLowerCase().includes(searchTerm.toLowerCase()))) || 
        (user.email && (user.email.toLowerCase().includes(searchTerm.toLowerCase())))
    );

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

    return (
        <div style={mainContainerStyle}>
            <div style={titleContainerStyle}>
                <h1 style={headerTextStyle}>Users</h1>
            </div>
            <div style={contentContainerStyle}>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {filteredUsers.map(user => (
                    <UserInfoCard
                        key={user.id}
                        id={user.id}
                        name={user.username}
                        email={user.email}
                        content={user.content}
                        onDelete={() => handleDelete(user.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default UsersSettingPage;

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