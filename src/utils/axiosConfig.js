const getToken = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : { token: null };

export const config = {
    headers: {
        Authorization: `Bearer ${getToken.token}`,
        Accept: 'application/json',
    },
};
