import React from 'react';
import '../../styles/_page-loader.module.scss';

export default function PageLoader() {
    return (
        <>
            <div className="page-loader-wrapper">
                <div className="loader">
                    <div className="preloader">
                        <div className="spinner-layer pl-red">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                    <p>Please wait...</p>
                </div>
            </div>
        </>
    );
}