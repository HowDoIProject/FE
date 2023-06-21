import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// export const setCookie = (name, value, options) => {
//     return cookies.set(name, value, { ...options });
// };

export const getCookie = verification => {
    return cookies.get(verification);
};

export const removeCookie = verification => {
    return cookies.remove(verification);
};
