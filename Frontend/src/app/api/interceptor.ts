import Swal from 'sweetalert2';
import {baseUrl} from '../constants/baseUrl';
// import Cookie from '@/app/utils/Cookie';//
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';

// Configure request params
const config: AxiosRequestConfig = {
    baseURL: baseUrl,
    timeout: 30000,
};
const service: AxiosInstance = axios.create(config);

// Intercept request
// service.interceptors.request.use(
//     (config) => {
//         config.headers = config.headers ?? {};
//         const accessToken = config.headers['permanent-token'];
//         // console.log(accessToken);
//         // Check the access token
//         if (accessToken) {
//             config.headers['Authorization'] = `Token ${accessToken}`;
//             delete config.headers['permanent-token'];
//             // console.log(config.headers['Authorization']);
//         } else if (config.headers && !config.headers['public-request']) {
//             Router.push('/login');

//             return {
//                 ...config,
//                 cancelToken: new axios.CancelToken((cancel) =>
//                     cancel('Cancel unauthorized request'),
//                 ),
//             };
//         }

//         delete config.headers['public-request'];

//         return config;
//     },
//     (error) => {
//         console.log(error);
//         Promise.reject(error);
//     },
// );

// Intercept response
service.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
       Swal.fire({
            title: 'Error!',
            // text: error.response?.data,
            icon: 'error',
            confirmButtonText: 'OK',
        });

        return Promise.reject(error.response?.data);
    },
);

export default service;
