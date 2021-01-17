import { loginCheck } from './../core.client/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isClientReady } from '../core.client/generals';

//? It will return null if client is not ready yet.
export const useLogin = (router = useRouter()) => {
    if (!isClientReady) return null;
    const [isLogin, setIsLogin] = useState<boolean | null>(null);
    useEffect(() => {
        const login = loginCheck(localStorage);
        setIsLogin(login);
        if (!login) router.push('/');
    }, [localStorage]);
    return isLogin;
}