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
        get: (params) =>
            client({
                url: 'users/profile',
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
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }),

    },
    search: {
        get: (searchTerm, params) =>
            client({
                url: `users/search?${searchTerm}`,
                data: params,
                method: METHODS.GET,
            })

    },
    createPost: {
        post: (params) => 
        {
                // console.log('params', params)
                
               return client({
                url: 'posts',
                data: params,
                method: METHODS.POST,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })},
            get: (params) => 
            {
                    // console.log('params', params)
                    
                   return client({
                    url: 'posts',
                    data: params,
                    method: METHODS.GET,
                    // headers: {
                    //     'Content-type': 'multipart/form-data',
                    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
                    // },
                })}
        
    },

};