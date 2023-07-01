import axios from 'axios';

// create axios instance with singleton pattern
export const api = axios.create({
    baseURL: 'https://howdoiapp.shop',
    headers: {
        /* */
    },
    // withCredentials: true, // set withCredentials to true globally
});

export const AuthApi = {
    // Regarding member information
    signup: payload => api.post('/api/signup', payload),
    send: payload => api.post('/api/send', payload),
    verify: payload => api.post('/api/verify', payload),
    login: payload => api.post('/api/login', payload),
};

export const apiPosts = {
    getTopFive: () => {
        return api.get(`/api/topfive`);
    },
    getAll: () => {
        return api.get(`/api/post`);
    },
    getDetail: post_id => {
        return api.get(`api/post/${post_id}`);
    },
};
