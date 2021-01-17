import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ResponseObject } from '../../../types/generals';
import { ITokenResponse } from '../../../types/auth';
import * as localStorageKey from '../../../constants/localstorage.key';
import LoginStatus from '../../../constants/login.status';
import Message from './message';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [loginStatus, setLoginStatus] = useState(LoginStatus.NOT_LOGGED_IN);
    useEffect(() => {
        document.body.className = "login-page";
    }, []);
    const saveInputs = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        setForm({ ...form, [key]: e.target.value });
    }
    const formSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('this should post', form);
        const { username, password } = form;
        axios.post('/api/login', { username, password })
            .then((res: AxiosResponse<ResponseObject<ITokenResponse>>) => {
                const { error, data, status } = res.data;
                if (error) throw new Error(error);
                localStorage.setItem(localStorageKey.TOKEN, data.access);
                localStorage.setItem(localStorageKey.REFRESH_TOKEN, data.refresh);
                console.log('login successful');
                setLoginStatus(LoginStatus.LOGGED_IN);
            })
            .catch((e) => {
                const response = (e.response as AxiosResponse<ResponseObject<any>>).data;
                if(!response) {
                    setLoginStatus(LoginStatus.UNEXPECTED_ERROR);
                    return console.error(e);
                }
                const { status } = response;
                if(status === 401) return setLoginStatus(LoginStatus.INVALID_USERNAME_OR_PASSWORD);
                console.log(e)
            });
    }
    const shouldButtonEnabled = form.username == '' || form.password == '';
    return (
        <div className="login-box">
            <div className="logo">
                <a href="#">Medical Store Management Systems</a>
            </div>
            <div className="card">
                <div className="body">
                    <form id="sign_in" method="POST" onSubmit={formSubmit}>
                        <div className="msg">Sign in</div>
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="material-icons">person</i>
                            </span>
                            <div className="form-line">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    autoFocus={true}
                                    onChange={saveInputs} />
                            </div>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="material-icons">lock</i>
                            </span>
                            <div className="form-line">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    required={true}
                                    onChange={saveInputs} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-8 p-t-5">
                                <input type="checkbox" name="rememberme" id="rememberme" className="filled-in chk-col-pink" />
                                <label htmlFor="rememberme">Remember Me</label>
                            </div>
                            <div className="col-xs-4">
                                <button
                                    className="btn btn-block bg-pink waves-effect"
                                    type="submit"
                                    disabled={shouldButtonEnabled}>
                                    {'SIGN IN'}
                                </button>
                            </div>
                        </div>
                        <div className="row m-t-15 m-b--20">
                            <div className="col-xs-6">
                                <a href="sign-up.html">Register Now!</a>
                            </div>
                            <div className="col-xs-6 align-right">
                                <a href="forgot-password.html">Forgot Password?</a>
                            </div>
                        </div>
                        <Message loginStatus={loginStatus} />
                    </form>
                </div>
            </div>
        </div>
    );
}