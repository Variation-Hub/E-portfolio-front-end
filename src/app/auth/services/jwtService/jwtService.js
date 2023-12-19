import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jsonData from 'src/url.json';

/* eslint-disable camelcase */

const URL_BASE_LINK = jsonData.API_LOCAL_URL;
class JwtService extends FuseUtils.EventEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                return new Promise((resolve, reject) => {
                    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                        // if you ever get an unauthorized response, logout the user
                        this.emit('onAutoLogout', 'Invalid access_token');
                        this.setSession(null);
                    }
                    throw err;
                });
            }
        );
    };

    handleAuthentication = () => {
        const access_token = this.getAccessToken();

        if (!access_token) {
            this.emit('onNoAccessToken');
            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    // createUser = (data) => {
    //   return new Promise((resolve, reject) => {
    //     axios.post(jwtServiceConfig.signUp, data).then((response) => {
    //       if (response.data.user) {
    //         this.setSession(response.data.access_token);
    //         resolve(response.data.user);
    //         this.emit('onLogin', response.data.user);
    //       } else {
    //         reject(response.data.error);
    //       }
    //     });
    //   });
    // };

    signInWithEmailAndPassword = (credentials) => {

        const payload = { ...credentials };

        return new Promise((resolve, reject) => {
            axios
                .post(`${URL_BASE_LINK}/user/login`, payload)
                .then((response) => {
                    if (response.data.status) {
                        this.setSession(response.data.data.accessToken);
                        const decoded = jwtDecode(response.data.data.accessToken);
                        resolve(decoded);
                        this.emit('onLogin', decoded);
                    } else {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            console.log(this.getAccessToken())
            const decoded = jwtDecode(this.getAccessToken());
            resolve(decoded);
            // axios
            //     .get(jwtServiceConfig.accessToken, {
            //         data: {
            //             access_token: this.getAccessToken(),
            //         },
            //     })
            //     .then((response) => {
            //         if (response.data.user) {
            //             this.setSession(response.data.access_token);
            //             resolve(response.data.user);
            //         } else {
            //             this.logout();
            //             reject(new Error('Failed to login with token.'));
            //         }
            //     })
            //     .catch((error) => {
            //         this.logout();
            //         reject(new Error('Failed to login with token.'));
            //     });
        });
    };

    setSession = (access_token) => {
        if (access_token) {
            localStorage.setItem('token', access_token);
            axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common.Authorization;
        }
    };

    logout = () => {
        this.setSession(null);
        this.emit('onLogout', 'Logged out');
    };

    isAuthTokenValid = (access_token) => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        }

        return true;
    };

    getAccessToken = () => {
        return window.localStorage.getItem('token');
    };

}

const instance = new JwtService();

export default instance;