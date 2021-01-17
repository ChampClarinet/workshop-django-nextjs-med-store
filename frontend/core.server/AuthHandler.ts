import axios from 'axios';
import { API_LOGIN } from '../constants/apis.urls';

export default class AuthHandler {
    static async login(
        hostname: string,
        username: string,
        password: string,
    ) {
        const url = hostname + API_LOGIN;
        const payload = { username, password };
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        };
        try {
            const { data, status } = (await axios.post(url, payload, { headers }));
            return {
                error: null,
                status,
                data,
            }
        } catch (e) {
            const status = e.response.status;
            let error: string | null = null;
            if (status === 401) error = 'username or password is incorrect';
            return {
                error,
                status,
            };
        }
    }
}