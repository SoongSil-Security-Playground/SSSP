import React , { useState, useEffect } from "react";
import ChallengeInfoCard from "../components/ChallengeInfoCard";
import SearchBar from "../components/SearchBar";
import { fetchAllChallenges, deleteChallenge } from '../services/challenge';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import addIcon from '../assets/images/add.png';

function ChallengesSettingPage() {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/admin/challenges/add');
    }

    const handleEdit = (challengeId) => {
        const challengeToEdit = challenges.find(challenge => challenge.id === challengeId);
        console.log(challengeToEdit);
        navigate(`/admin/challenges/edit/${challengeId}`, { state: { challenge: challengeToEdit } });
    };

    const handleDelete = async (challengeId) => {
        const confirmation = window.confirm("정말로 이 챌린지를 삭제하시겠습니까?");
        if (!confirmation) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found. Please log in.");
            }
    
            await deleteChallenge(challengeId, token);

            setChallenges((prevChallenges) => prevChallenges.filter(challenge => challenge.id !== challengeId));
    
            console.log(`Challenge with ID ${challengeId} deleted successfully.`);
        } catch (error) {
            console.error("Failed to delete challenge:", error.message);
            alert(`Failed to delete challenge: ${error.message}`);
        }
    };

    const filteredChallenges = challenges.filter(challenges => 
        (challenges.title && (challenges.title.toLowerCase().includes(searchTerm.toLowerCase()))) || 
        (challenges.category && (challenges.category.toLowerCase().includes(searchTerm.toLowerCase())))
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

                const data = await fetchAllChallenges(token);
                setChallenges(data);
            } catch (error) {
                console.error("Error fetching challenges:", error.message);
                toast.error(
                    <div>
                        <p className="toast-title">Failed to fetch challenges</p>
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
                <h1 style={headerTextStyle}>Challenges</h1>
            </div>
            <div style={contentContainerStyle}>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <button style={addChallengeButtonStyle} onClick={handleAdd}>
                    <img 
                        src={addIcon} 
                        alt="Add" 
                        onClick={handleAdd} 
                    />
                </button>
                {filteredChallenges.map(challenge => (
                    <ChallengeInfoCard
                        key={challenge.id}
                        id={challenge.id}
                        name={challenge.name}
                        description={challenge.description}
                        points={challenge.points}
                        flag={challenge.flag}
                        level={challenge.level}
                        category={challenge.category}
                        createdAt={new Date(challenge.created_at).toLocaleString()}
                        onEdit={() => handleEdit(challenge.id)}
                        onDelete={() => handleDelete(challenge.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChallengesSettingPage;

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

const addChallengeButtonStyle = {
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