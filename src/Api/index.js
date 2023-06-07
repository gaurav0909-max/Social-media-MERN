import client, { METHODS } from './client';

export const api = {
    auth: {
        login: (params) =>
            client({
                url: 'users/login',
                data: params,
                method: METHODS.POST
            }),
        register: (params) =>
            client({
                url: 'users/register',
                data: params,
                method: METHODS.POST
            }),
    },
    profile: {
        getByToken: (params) =>
            client({
                url: 'users/profile',
                data: params,
                method: METHODS.GET,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }),
        getByUserName: (userName, params) =>
            client({
                url: `users/${userName}`,
                data: params,
                method: METHODS.GET,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }),
        put: (params) =>
            client({
                url: 'users/profile',
                data: params,
                method: METHODS.PUT,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }),

    },
    search: {
        get: (name, params) =>
            client({
                url: `users/search?${name}`,
                data: params,
                method: METHODS.GET,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })

    },
    myPost: {
        post: (params) => {
            return client({
                url: 'posts/create',
                data: params,
                method: METHODS.POST,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
        },
        get: (params) =>
            client({
                url: 'posts',
                method: METHODS.GET,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
        getByName: (id, params) =>
            client({
                url: `posts/user/${id}`,
                method: METHODS.GET,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
    },

    followers: {
        get: (userName, params) =>
            client({
                url: `users/followers/${userName}`,
                method: METHODS.GET,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
    },

    followings: {
        get: (userName, params) =>
            client({
                url: `users/followings/${userName}`,
                method: METHODS.GET,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
    },

    follow: {
        post: (userName, params) =>
            client({
                url: `users/follow/${userName}`,
                method: METHODS.POST,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
    },

    unfollow: {
        post: (userName, params) =>
            client({
                url: `users/unfollow/${userName}`,
                method: METHODS.POST,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
    }


};