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
    uploadImage: (payload, setValues, values, cookies) => {
        return api
            .post(`/api/uploads`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    access: cookies.accessToken,
                },
            })
            .then(res => {
                setValues({ ...values, image: res.data.url });
            })
            .catch(e => {
                console.log(e);
            });
    },
    addPost: (payload, cookies, navigate) => {
        return api
            .post(`/api/post`, payload, {
                headers: {
                    access: cookies.accessToken,
                },
            })
            .then(res => {
                alert('글이 등록되었습니다');
                navigate('/');
            })
            .catch(e => {
                console.log(e);
            });
    },
    addComment: (payload, post_id, cookies, setValues, setFile) => {
        return api
            .post(`/api/post/${post_id}/comment`, payload, {
                headers: {
                    access: cookies.accessToken,
                },
            })
            .then(res => {
                setValues({ comment: '', image: '' });
                setFile('');
                alert('댓글이 등록되었습니다');
            });
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
