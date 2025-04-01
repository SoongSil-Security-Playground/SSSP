import React, {useState, useEffect} from 'react';
import ScoreChart from '../components/ScoreChart';
import RankCard from '../components/RankCard';
import Footer from '../components/Footer';
import { fetchAllScores } from '../services/score';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

function ScoreboardPage() {
    const { logout } = useAuth();
    const [scores, setScores] = useState([]);
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

                const data = await fetchAllScores(token);
                console.log('data', data);
                const sortedScores = data.sort((a, b) => b.total_score - a.total_score);
                
                setScores(sortedScores);
            } catch (error) {
                console.log('error', error);
                if (error.message === "Failed to verify JWT token.") {
                    logout();
                }
                console.error("Error fetching scores:", error.message);
                toast.error(
                    <div>
                        <p className="toast-title">Failed to fetch scores</p>
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
                <h1 style={headerTextStyle}>Scoreboard</h1>
            </div>
            {/* <ScoreChart /> */}
            <div style={contentContainerStyle}>
                {scores.map((score, index) => (
                    <RankCard
                        key={index}
                        rank={index + 1}
                        name={score.username}
                        score={score.total_score}
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
    marginBottom: '1vh',
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

export default ScoreboardPage;