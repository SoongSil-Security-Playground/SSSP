import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createChallenge, updateChallenge } from '../services/challenge';

function ChallengeForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const challenge = location.state?.challenge || null;
    const isUpdate = !!challenge;
    const [isUploadHovered, setIsUploadHovered] = useState(false);
    const [isSubmitHovered, setIsSubmitHovered] = useState(false);

    const [id, setId] = useState(challenge ? challenge.id : 0);
    const [name, setName] = useState(challenge ? challenge.name : "");
    const [level, setLevel] = useState(challenge ? challenge.level : "easy");
    const [category, setCategory] = useState(challenge ? challenge.category : "practice");
    const [description, setDescription] = useState(challenge ? challenge.description : "");
    const [flag, setFlag] = useState(challenge ? challenge.flag : "");
    const [points, setPoints] = useState(challenge ? challenge.points : 1000);
    const [filePath, setFilePath] = useState(challenge ? challenge.filePath : '');
    const [decay, setDecay] = useState(challenge ? challenge.decay : 30);
    const [minPoints, setMinPoints] = useState(challenge ? challenge.minPoints : 500);
    const [isDynamic, setIsDynamic] = useState(challenge ? challenge.isDynamic : false);

    const handleFileUpload = () => {
        document.getElementById('file').click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFilePath(file.name);
        }
    };

    useEffect(() => {
        if (challenge) {
            setName(challenge.name);
            setLevel(challenge.level);  
            setCategory(challenge.category);
            setDescription(challenge.description);
            setFlag(challenge.flag);
            setPoints(challenge.points);
            setFilePath(challenge.filePath);
            setDecay(challenge.decay);
            setMinPoints(challenge.minPoints);
            setIsDynamic(challenge.isDynamic);
        }
    }, [challenge]);

    const handleSubmitClick = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('level', level);
        formData.append('category', category);
        formData.append('points', points);
        formData.append('flag', flag);
        formData.append('description', description);
        formData.append('decay', decay);
        formData.append('minimum_point', minPoints);
        formData.append('is_dynamic', isDynamic);

        const fileInput = document.getElementById('file');
        if (fileInput && fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        }

        console.log("FormData entries with types:");
        formData.forEach((value, key) => {
            console.log(`Key: ${key}, Value: ${value}, Type: ${typeof value}`);
        });

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found. Please log in.");
            }

            if (isUpdate) {
                if (!flag) {
                    formData.delete('flag');
                }
                console.log(formData);
                await updateChallenge(id, formData, token);
            } else {
                await createChallenge(formData, token);
            }

            navigate("/admin/challenges");
        } catch (error) {
            console.error("Challenge operation failed:", error);
        }
    };

    return (
        <div style={mainContainerStyle}>
            <div style={nameContainerStyle}>
                <h1 style={headerTextStyle}>Challenge</h1>
            </div>
            <div style={contentContainerStyle}>
                <form style={formContainerStyle} onSubmit={handleSubmitClick}>
                    <div style={rowformFieldStyle}>
                        <div style={formFieldStyle}>
                            <label style={labelStyle}>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div style={formFieldStyle}>
                            <label style={labelStyle}>Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div style={rowformFieldStyle}>
                        <div style={formFieldStyle}>
                            <label style={labelStyle}>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={textareaStyle}
                            />
                        </div>
                    </div>
                    <div style={rowformFieldStyle}>
                        <div style={formFieldStyle}>
                            <label style={labelStyle}>Flag</label>
                            <input
                                type="text"
                                value={flag}
                                placeholder={isUpdate && !flag ? flag : "Enter new flag..."}
                                onChange={(e) => setFlag(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div style={rowformFieldStyle}>

                        <div style={formFieldStyle}>
                            <label style={labelStyle}>Level</label>
                            <input
                                type="text"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div style={rowformFieldStyle}>
                        <div style={formFieldStyle}>
                            <label style={labelStyle}>Scoring</label>
                            <select
                                value={isDynamic !== undefined ? isDynamic.toString() : "false"}
                                onChange={(e) => setIsDynamic(e.target.value === 'true')}
                                style={selectStyle}
                            >
                                <option value="true">Dynamic</option>
                                <option value="false">Static</option>
                            </select>
                        </div>
                        <div style={formFieldStyle}>
                            <label style={labelStyle}>Points</label>
                            <input
                                type="number"
                                value={points}
                                onChange={(e) => setPoints(Number(e.target.value))}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div style={rowformFieldStyle}>
                        <div style={formFieldStyle}>
                            <label style={labelStyle}>Decay</label>
                            <input
                                type="number"
                                value={decay}
                                onChange={(e) => setDecay(Number(e.target.value))}
                                style={!isDynamic ? disabledInputStyle : inputStyle}
                                disabled={!isDynamic}
                            />
                        </div>
                        <div style={formFieldStyle}>
                            <label style={labelStyle}>Minimum Points</label>
                            <input
                                type="number"
                                value={minPoints}
                                onChange={(e) => setMinPoints(Number(e.target.value))}
                                style={!isDynamic ? disabledInputStyle : inputStyle}
                                disabled={!isDynamic}
                            />
                        </div>
                    </div>
                    <div style={formFieldStyle}>
                        <label style={labelStyle}>File</label>
                        <div style={rowformFieldStyle}>
                            {filePath && <span>Selected file: {filePath}</span>}
                            <input type="file" id="file" style={{ display: 'none' }} onChange={handleFileChange} />
                            <div style={buttonContainerStyle}>
                                <button
                                    style={uploadButtonStyle(isUploadHovered)}
                                    onMouseEnter={() => setIsUploadHovered(true)}
                                    onMouseLeave={() => setIsUploadHovered(false)}
                                    onClick={handleFileUpload}
                                    type="button"
                                >
                                    Upload file →
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={buttonContainerStyle}>
                        <button
                            style={submitButtonStyle(isSubmitHovered)}
                            onMouseEnter={() => setIsSubmitHovered(true)}
                            onMouseLeave={() => setIsSubmitHovered(false)}
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

export default ChallengeForm;

const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 80px',
};

const nameContainerStyle = {
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
    width: 'fit-content',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 0 8px lightgray',
    height: 'fit-content',
};

const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '600px',
    padding: '12px',
};

const rowformFieldStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '12px',
    alignItems: 'center',
}

const formFieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
    resize: 'none',
};

const textareaStyle = {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    backgroundColor: 'white',
    color: '#707070',
    outline: 'none',
    height: '70px',
    resize: 'none',
};

const selectStyle = {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    backgroundColor: 'white',
    color: '#707070',
    outline: 'none',
};

const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-start',
    alignItems: 'center',
};

const uploadButtonStyle = (isHovered) => ({
    color: isHovered ? 'white' : '#006e93',
    border: '1px',
    padding: '8px 16px',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.3s',
    backgroundColor: isHovered ? '#006e93' : 'transparent',
});

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

const disabledInputStyle = {
    ...inputStyle,
    backgroundColor: 'var(--light-grey)',
    color: '#B0B0B0',
    cursor: 'not-allowed',
};