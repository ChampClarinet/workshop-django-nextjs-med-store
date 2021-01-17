import React, { useEffect } from 'react';

export const useOutSideAlerter = (
    ref: React.MutableRefObject<any>,
    onAlertOutside?: () => any,
) => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            ref.current && !ref.current.contains(e.target) && onAlertOutside && onAlertOutside();
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [ref]);
}