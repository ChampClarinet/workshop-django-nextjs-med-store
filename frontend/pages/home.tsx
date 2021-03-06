import { useEffect, useState } from 'react';
import HomeComponent from "../components/Home/Home";
import Navbar from "../components/Home/Navbar";
import Overlay from "../components/Home/Overlay";
import Sidebar from "../components/Home/Sidebar";
import { useRouter } from 'next/router';
import { useLogin } from '../hooks/auth';
import { isClientReady } from '../core.client/generals';
import { INDEX } from '../constants/pages.urls'
import 'adminbsb-materialdesign/css/themes/all-themes.css';

import PageLoader from "../components/Home/PageLoader";
import { toast } from 'react-toastify';

export default function MainComponent() {
    const router = useRouter();
    const [bodyClass, setBodyClass] = useState('theme-red ls-closed');
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const openSidebar = () => {
        setBodyClass(bodyClass + ' overlay-open');
        setDisplayOverlay(true);
    }
    const closeSidebar = () => {
        setBodyClass(bodyClass.replace(' overlay-open', ''));
        setDisplayOverlay(false);
    }
    const onBarClick = () => {
        if (bodyClass.includes('overlay-open')) closeSidebar();
        else openSidebar();
    }
    const onLoggedOut = () => {
        if(!isClientReady) return;
        toast.success('Logout successful');
        router.push(INDEX);
    };
    useEffect(() => {
        const rootElem = document.getElementById('app');
        setRootElement(rootElem);
        if (rootElem) {
            rootElem.className = 'theme-red';
            if (window.innerWidth <= 1150) rootElem.className = bodyClass;
        }
    });
    useEffect(() => {
        if (rootElement) rootElement.className = bodyClass;
    }, [bodyClass]);
    const shouldRender = useLogin(router);
    if (!shouldRender) return <PageLoader />
    return (
        <div id="app">
            <Overlay displayOverlay={displayOverlay} onClick={closeSidebar} />
            <Navbar onBarClick={onBarClick} />
            <Sidebar onLoggedOut={onLoggedOut} />
            <HomeComponent />
        </div>
    );
}