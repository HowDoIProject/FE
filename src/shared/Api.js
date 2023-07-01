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
    postSignUp: payload => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL})/api/signup`, payload);
    },

    PostSend: payload => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL})/api/send`, payload);
    },

    postVerify: payload => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL})/api/verify`, payload);
    },

    postLogin: payload => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL})/api/login`, payload);
    },
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

export const apiMyPage = {
    getMyPage: () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mypage/`);
    },
    putMyPage: post_id => {
        return axios.put(`${process.env.REACT_APP_SERVER_URL}/api/mypage/${post_id}`);
    },
    deleteMyPage: post_id => {
        return axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/mypage/${post_id}`);
    },
};
