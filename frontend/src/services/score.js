const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchAllScores = async (token) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/score`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });
    console.log(response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch scores.");
    }

    return await response.json();
};

export const fetchUserScore = async (token) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/score/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });
    console.log(response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch scores.");
    }

    const data = await response.json();
    console.log(data);
    return data;

    return await response.json();
}