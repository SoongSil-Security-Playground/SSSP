import React, { useState, useEffect } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import FilterSidebar from '../components/FilterSidebar';
import Footer from '../components/Footer';
import { fetchAllChallenges } from '../services/challenge';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';

function ChallengesPage() {
    const { isLoggedIn, logout } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedState, setSelectedState] = useState("All");
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleStateSelect = (state) => {
        setSelectedState(state);
    };

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
                console.log(data);
                setChallenges(data);
            } catch (error) {
                console.log('login: ', isLoggedIn);
                console.error("Error fetching challenges:", error.message);
                if (error.message === "Failed to verify JWT token.") {
                    logout();
                }
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
    }, [navigate]);

    const challengeCategories = ["All",...new Set(challenges.map(item => item.category))];

    const filteredChallenges = challenges.filter((challenge) => {
        const categoryMatches = selectedCategory === "All" || challenge.category === selectedCategory;
        
        const stateMatches =
            selectedState === "All" ||
            (selectedState === "Solved" && challenge.is_user_solved) ||
            (selectedState === "Unsolved" && !challenge.is_user_solved);

        return categoryMatches && stateMatches;
    });

    return (
        <div style={mainContainerStyle}>
            <div style={titleContainerStyle}>
                <h1 style={headerTextStyle}>Challenges</h1>
            </div>
            <div style={contentWrapperStyle}>
                <div style={sidebarContainerStyle}>
                    <FilterSidebar
                        categories={challengeCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategorySelect}
                        selectedState={selectedState}
                        onSelectState={handleStateSelect}
                    />
                </div>
                <div style={contentContainerStyle}>
                    {filteredChallenges.map((challenge) => (
                        <ChallengeCard
                            key={challenge.id}
                            id={challenge.id}
                            name={challenge.name}
                            description={challenge.description}
                            points={challenge.points}
                            category={challenge.category}
                            level={challenge.level}
                            solveCnt={challenge.solve_count}
                            createdAt={new Date(challenge.created_at).toLocaleString()}
                            filePath={challenge.file_path}
                            isSolved={challenge.is_user_solved}
                            initialSolved={challenge.is_user_solved}
                        />
                    ))}
                    </div>
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
    marginBottom: '30px',
    width: '100%',
    textAlign: 'center',
    padding: '20px 0',
};

const headerTextStyle = {
    color: 'var(--dark-blue)',
    marginBottom: '2px',
};

const contentWrapperStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    boxSizing: 'border-box',
    flexGrow: 1,
};

const sidebarContainerStyle = {
    flex: '1',
};

const contentContainerStyle = {
    flex: '5',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    rowGap: '10px',
    columnGap: '10px',
    width: '100%',
    marginLeft: '50px',
    marginRight: '50px',
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    marginTop: '-10px',
};


export default ChallengesPage;
