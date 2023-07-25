import axios from 'axios';

// create axios instance with singleton pattern
export const api = axios.create({
    baseURL: 'https://api.howdoiapp.shop',
    headers: {
        /* */
    },
    // withCredentials: true, // set withCredentials to true globally
});

export const apiPosts = {
    getPopular: (page, cookies) => {
        return api.get(`/api/topfive/${page}`, {
            headers: {
                access: cookies.accessToken,
            },
        });
    },
    getAll: () => {
        return api.get(`/api/post`);
    },
    getRecommend: cookies => {
        return api
            .get(`api/recommend`, {
                headers: {
                    access: cookies.accessToken,
                },
            })
            .then(res => {
                console.log('추천완료!', res);
                return res;
            });
    },
    getDetail: (post_id, cookies) => {
        return api.get(`api/post/${post_id}`, {
            headers: {
                access: cookies.accessToken,
            },
        });
    },
    getByFilterAndCategory: (filter, category, page, cookies) => {
        return api.get(`api/list/${filter}/${category}/${page}`, {
            headers: {
                access: cookies.accessToken,
            },
        });
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
                alert('글이 등록되었습니다🤗');
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
                alert('댓글이 등록되었습니다🤗');
            });
    },
    deleteComment: (post_id, comment_id, cookies) => {
        return api
            .delete(`/api/post/${post_id}/comment/${comment_id}`, {
                headers: {
                    access: cookies.accessToken,
                },
            })
            .then(res => {
                alert('댓글이 삭제되었습니다');
            });
    },
    updateComment: (payload, post_id, comment_id, cookies, setValues, setFile) => {
        return api
            .put(`/api/post/${post_id}/comment/${comment_id}`, payload, {
                headers: {
                    access: cookies.accessToken,
                },
            })
            .then(res => {
                setValues({ comment: '', image: '' });
                setFile('');
                alert('댓글이 수정되었습니다');
            });
    },
    updateCommentLike: args => {
        const { payload, comment_id, cookies } = args;
        return api
            .post(`/api/commentlike/${comment_id}`, payload, {
                headers: {
                    access: cookies.accessToken,
                },
            })
            .then(res => console.log('likeCommentUpdate', res));
    },
    updatePostLike: args => {
        const { payload, post_id, cookies } = args;
        return api
            .post(`/api/like/${post_id}`, payload, {
                headers: {
                    access: cookies.accessToken,
                },
            })
            .then(res => console.log('likePostUpdate', res));
    },
    updatePostScrap: args => {
        const { payload, post_id, cookies } = args;
        return api
            .post(`/api/scrap/${post_id}`, payload, {
                headers: {
                    access: cookies.accessToken,
                },
            })
            .then(res => console.log('scrapPost', res));
    },

    chooseComment: args => {
        const { post_id, comment_id, cookies } = args;
        console.log('commentcookies', cookies);
        return api
            .post(
                `/api/post/${post_id}/comment/${comment_id}`,
                {},

                {
                    headers: {
                        access: cookies.accessToken,
                    },
                }
            )
            .then(res => {
                const result = confirm('답변을 채택하시겠습니까? 채택하시면 취소가 불가합니다.');
                if (result) {
                    alert('답변이 채택되었습니다!🤗');
                }
            });
    },
    search: args => {
        const { keyword, page, cookies } = args;
        return api
            .post(
                `/api/search/${keyword}/${page}`,
                {},
                {
                    headers: {
                        access: cookies.accessToken,
                    },
                }
            )
            .then(res => {
                console.log('검색완료!', res);
                return res;
            });
    },
    updatePost: (payload, post_id, cookies, setValues, setFile, navigate) => {
        return api
            .put(`api/mypage/${post_id}`, payload, {
                headers: {
                    access: cookies.accessToken,
                },
            })
            .then(res => {
                setValues({ category: '', title: '', content: '', image: '' });
                setFile('');
                alert('글이 수정되었습니다🤗');
                navigate('/activity');
            })
            .catch(e => {
                console.log(e);
            });
    },
};

export const apiGet = {
    getScrap: (filter, category, page, cookies) => {
        return api.get(`api/scrap/${filter}/${category}/${page}`, {
            params: { filter, category },
            headers: {
                access: cookies.accessToken,
            },
        });
    },
    DeleteScrap: (filter, category, cookies) => {
        if (cookies && cookies.accessToken) {
            return api
                .post(`api/scrap/${filter}/${category}`, {
                    params: { filter, category },
                    headers: {
                        access: cookies.accessToken,
                    },
                })
                .then(res => {
                    alert('스크랩이 삭제되었습니다');
                });
        }
    },
};
