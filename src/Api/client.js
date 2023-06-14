import axios from 'axios';
import qs from 'qs';
export const BASE_URL = 'https://socialspaceapi.cyclic.app/api'
// const BASE_URL='http://localhost:4000/api/'

export const METHODS = {
    GET: 'get',
    DELETE: 'delete',
    HEAD: 'head',
    OPTIONS: 'options',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch'
};
const axiosConfig = {
    baseURL: BASE_URL
};
function createAxiosInstance() {
    return axios.create(axiosConfig);
}
const request = createAxiosInstance();
const cache = {};

const client = ({ method = METHODS.POST, url = BASE_URL, data, useCache = false, invalidateQuery = false, ...rest }) =>
    useCache && !invalidateQuery && cache[url]
        ? Promise.resolve(cache[url])
        : request({
            method,
            url,
            data,
            paramsSerializer,
            ...rest
        });

export const clientWithHeaders = ({ method = METHODS.POST, url = BASE_URL, data, headers, useCache = false, invalidateQuery = false, ...rest }) =>
    request({
        method,
        url,
        data,
        headers,
        paramsSerializer,
        ...rest
    }).then((res) => {
        return res;
    });

request.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        const originalRequest = err.config;
        const status = err.response?.status;
        if (status === 503) {
            const error = {
                originalRequest,
                status,
                message: 'This service is unavailable right now, please try again later'
            };
            throw error;
        }
        if (status === 500) {
            const error = {
                originalRequest,
                status,
                message: 'An unexpected error occurred, please try again later'
            };
            throw error;
        }
        // if (status === 404) {
        //     const error = {
        //         originalRequest,
        //         status,
        //         message: 'The requested content does not exist, please try again later'
               
        //     };
        //     throw error;
        // }

        const response = err.response?.data;
        const message = response ? response : err.message;
        console.log(message)

        const error = { originalRequest, message, status };
        throw error;
    }
);

if (localStorage.getItem('persist:root')) {
    const userLocal = JSON.parse(localStorage.getItem('persist:root')).auth;
    if (userLocal) {
        const userData = JSON.parse(userLocal).user;
        request.defaults.headers.Authorization = `Bearer ${userData?.token}`;
    }
}
export function setHeaderToken(token) {
    if (token) request.defaults.headers.Authorization = `Bearer ${token}`;
    else delete request.defaults.headers.Authorization;
}

function paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
}

export default client;
