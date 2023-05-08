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
   Post:{
    get: (data) =>
    client({
        url: '/postdata',
        method: METHODS.GET,
        ...data
    }),
   }

};