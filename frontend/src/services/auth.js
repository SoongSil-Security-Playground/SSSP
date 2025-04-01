const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async (username, email, password) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const contentType = response.headers.get('content-type');
    console.log(response)

    if (!response.ok) {
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'An error occurred during registration.');
        } else {
            throw new Error('Unexpected response from the server.');
        }
    }

    return await response.json();
};

export const sendAuthCode = async (email) => {
    const response = await fetch(
        `${BACKEND_URL}/api/v1/auth/send-auth-code?receiver_email=${encodeURIComponent(email)}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: null,
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send auth code.');
    }
};

export const verifyAuthCode = async (email, authCode) => {
    try {
        const response = await fetch(
            `${BACKEND_URL}/api/v1/auth/verify-auth-code?email=${encodeURIComponent(email)}&auth_code=${encodeURIComponent(authCode)}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: null,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to verify auth code');
        }

        console.log('Auth code verified successfully');
        return await response.json();
    } catch (error) {
        console.error('Error in verifyAuthCode:', error.message);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    const payload = new URLSearchParams();
    payload.append('username', username);
    payload.append('password', password);

    const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response data:', errorData);
    
        if (Array.isArray(errorData.detail)) {
            const errorMessages = errorData.detail.map((err) => 
                `${err.loc.slice(1).join('.')}: ${err.msg}`
            );
            throw new Error(errorMessages.join('\n'));
        }
        throw new Error(errorData.detail || 'Login failed');
    }

    return await response.json();
};

export const logoutUser = async (token) => {
    if (!token) return;

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error during logout:', errorData);
            throw new Error(errorData.message || 'Failed to log out');
        }

        console.log('/auth/logout API call successful');
    } catch (error) {
        console.error('Error during logout API call:', error.message);
    }
};

export const checkAdmin = async (token) => {
    if(!token) return;

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/admin/is_admin`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to verify admin status.');
        }

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error checking admin status:', error.message);
        throw error;
    }
};