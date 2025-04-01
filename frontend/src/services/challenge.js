const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchAllChallenges = async (token) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/challenges/get_all_challenge`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });
    console.log('challenges', response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch challenges.");
    }

    return await response.json();
};

export const getChallenge = async (token, challenge_challengeId) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/challenges/${challenge_challengeId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });
    console.log(response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to get challenges.");
    }

    return await response.json();   
};

export const submitFlag = async (token, challenge_challengeId, flag) => {
    const body = new URLSearchParams();
    body.append('flag', flag);

    const response = await fetch(`${BACKEND_URL}/api/v1/challenges/${challenge_challengeId}/submit`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
    });
    console.log(response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to submit flag.");
    }

    return await response.json();
};

export const createChallenge = async (formData, token) => {
    console.log("Submitting challenge data:");
    formData.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}, Type: ${typeof value}`); 
    });

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/admin/challenges/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error from server:", errorData);
            throw new Error(errorData.detail || 'Failed to create challenge.');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error creating challenge:', error.message);
        throw error;
    }
};

export const updateChallenge = async (challengeId, formData, token) => {
    console.log("Submitting challenge data:");
    formData.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}, Type: ${typeof value}`);
    });

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/admin/challenges/${challengeId}`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to create challenge.');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error creating challenge:', error.message);
        throw error;
    }
};

export const deleteChallenge = async (challengechallengeId, token) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/admin/challenges/${challengechallengeId}`, {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to delete challenge.');
        }

        console.log(`Challenge with challengeId ${challengechallengeId} deleted successfully.`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting challenge:', error.message);
        throw error;
    }
};

export const fetchUserSolvedChallenge = async (token) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/challenges/solved/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });
    console.log(response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to get challenges.");
    }

    return await response.json();   
}