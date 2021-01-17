import { TOKEN, REFRESH_TOKEN } from "../constants/localstorage.key";
import axios, { AxiosResponse } from 'axios';
import { ITokenResponse } from "../types/auth";
import { ResponseObject } from "../types/generals";
import * as localStorageKey from '../constants/localstorage.key';

export const loginCheck = (localStorage: Storage) => {
    const token = localStorage.getItem(TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    const loggedIn = token && refreshToken ? true : false;
    return loggedIn;
}

export const logout = (localStorage: Storage, callbackFn?: () => any) => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    callbackFn && callbackFn();
}

export const login = async (username: string, password: string, localStorage?: Storage) => {
    if (!localStorage) return {
        error: true,
        trace: {
            data: null,
            error: 'client is not ready',
            status: -1,
        }
    };
    const payload = { username, password };
    try {
        const result: AxiosResponse<ResponseObject<ITokenResponse>> = await axios.post('/api/login', payload);
        const { error, data, status } = result.data;
        if (error) throw new Error(error);
        const { access, refresh } = data;
        localStorage.setItem(localStorageKey.TOKEN, access);
        localStorage.setItem(localStorageKey.REFRESH_TOKEN, refresh);
        return {
            error: false,
            access,
            refresh,
        };
    } catch (e) {
        const response = (e.response as AxiosResponse<ResponseObject<any>>).data;
        return {
            error: true,
            trace: response,
        };
    }
}