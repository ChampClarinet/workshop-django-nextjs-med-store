import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useLogin = (router = useRouter()) => {
    const isLogin = false;
    useEffect(() => {
        if (!isLogin) router.push('/');
    }, []);
    return isLogin;
}