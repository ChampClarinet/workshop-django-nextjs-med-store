// import Login from '../components/fragments/Login';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import LoginStatus from '../constants/login.status';
import { toast } from 'react-toastify';
import * as urls from '../constants/pages.urls';
import { login, loginCheck } from '../core.client/auth';
import { isClientReady } from '../core.client/generals';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [loginStatus, setLoginStatus] = useState(LoginStatus.NOT_LOGGED_IN);
    const redirectToHomePage = () => isClientReady ? window.location.href = urls.HOME : '';
    const saveInputs = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        setForm({ ...form, [key]: e.target.value });
    }
    const formSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password } = form;
        login(username, password, localStorage)
            .then(_ => setLoginStatus(LoginStatus.LOGGED_IN))
            .catch(({ error, trace }) => {
                if (!trace || !trace.status) {
                    setLoginStatus(LoginStatus.UNEXPECTED_ERROR);
                    return console.error(error);
                }
                const { status } = trace;
                if(status===401) return setLoginStatus(LoginStatus.INVALID_USERNAME_OR_PASSWORD);
                console.error(error);
            });
    }
    useEffect(() => {
        document.body.className = "login-page";
        if (isClientReady) {
            const isLoggedIn = loginCheck(localStorage);
            if (isLoggedIn) redirectToHomePage();
        }
    }, []);
    useEffect(() => {
        switch (loginStatus) {
            case LoginStatus.LOGGED_IN:
                toast.success('Login Successful');
                redirectToHomePage();
                break;
            case LoginStatus.INVALID_USERNAME_OR_PASSWORD:
                toast.error('Invalid Login Credentials');
                break;
            default:
                break;
        }
    }, [loginStatus]);
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
                            {loginStatus === LoginStatus.LOGGING_IN
                                ? (
                                    <div className="col-xs-12">
                                        <span>Logging in, Please wait...</span>
                                    </div>
                                )
                                : (
                                    <>
                                        <div className="col-xs-6">
                                            <a href="sign-up.html">Register Now!</a>
                                        </div>
                                        <div className="col-xs-6 align-right">
                                            <a href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </form >
                </div >
            </div >
        </div >
    );
}