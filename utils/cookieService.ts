import Cookies from 'js-cookie';

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
    expires: 7, // 7 days
    path: '/',
    secure: process.env.NODE_ENV === 'production', // true in production
    sameSite: 'Strict'
};

export const cookieService = {
    setToken: (token: string) => {
        Cookies.set('token', token, COOKIE_OPTIONS);
    },

    getToken: () => {
        return Cookies.get('token');
    },

    removeToken: () => {
        Cookies.remove('token', { path: '/' });
    },

    setUser: (user: any) => {
        Cookies.set('user', JSON.stringify(user), COOKIE_OPTIONS);
    },

    getUser: () => {
        const user = Cookies.get('user');
        return user ? JSON.parse(user) : null;
    },

    removeUser: () => {
        Cookies.remove('user', { path: '/' });
    },

    clearAll: () => {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('user', { path: '/' });
    }
};