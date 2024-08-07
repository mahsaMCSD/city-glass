import axios from 'axios';
import { changeUserToken } from '../redux/user/user.actions';
import API_URL from './environment';
export default (userToken, refreshToken, dispatch) => {
    let headers = {};
    if (userToken) {
        headers.Authorization = `Bearer ${userToken}`;
    }
    const axiosInstance = axios.create({
        headers,
        "x-client-id": "website"
    });
    axiosInstance.interceptors.response.use(response => {
        return response;
    }, err => {
        return new Promise((resolve, reject) => {
            const originalReq = err.config;
            if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                originalReq._retry = true;

                let res = fetch(`${API_URL}/refresh`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`,
                        "x-client-id": "website"
                    },
                    redirect: 'follow',
                    referrer: 'no-referrer',

                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        originalReq.headers['Authorization'] = `Bearer ${res.data.access_token}`;
                        dispatch(changeUserToken(res.data.access_token))
                        return axiosInstance(originalReq);
                    })
                    .catch((err) => {
                        localStorage.remove('userToken')
                        localStorage.remove('refreshToken')
                        localStorage.removeItem("shippingAddress");
                        localStorage.removeItem("mobileNumber");
                        persistor.purge();
                        window.location = '/auth'
                    })


                resolve(res);
            }


            return Promise.reject(err);
        });
    });
    return axiosInstance;
}