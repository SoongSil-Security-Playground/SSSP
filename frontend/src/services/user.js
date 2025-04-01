const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchUserInfo = async (token) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/user`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error fetching user information');
    }

    return await response.json();
};

export const updateUserInfo = async (token, contents) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/user`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update user contents.");
    }

    return await response.json();
};

export const deleteUserInfo = async (token) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/user/delete`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });
    console.log(response);

    if (!response.ok) {
        const errorData = await response.json();
        console.log("fail");
        throw new Error(errorData.detail || "Failed to delete user.")
    }

    return await response.json();

};

export const fetchAllUsers = async (token) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/user/user_list`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
        },
    });
    console.log(response);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to fetch users.")
    }

    const data = await response.json();
    console.log(data);

    return data;

};

export const updatePassword = async (curPassword, newPassword, token) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/user/update_password`, {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ 
            cur_password: curPassword,
            new_password: newPassword,
        }),
    });

    console.log(response);

    if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.detail || 'Failed to update password.');
    }

    return await response.json();
};
