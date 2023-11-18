const getToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { token: null };

export const config = {
    headers: {
        Authorization: `Bearer ${getToken.token}`,
        Accept: 'application/json',
    },
};
