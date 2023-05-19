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
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
            }),
      
    },
    post: {
        create: (params) =>
            client({
                url: 'users/post',
                data: params,
                method: METHODS.POST,
                // headers:{
                //     'Content-type': 'application/json',
                //     'Authorization': `Bearer ${localStorage.getItem('token')}`
                //   },
            }),
      
    },

};