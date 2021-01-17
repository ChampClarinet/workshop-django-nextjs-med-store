import { useState, useRef } from 'react';
import { useOutSideAlerter } from '../../hooks/ref';
import '../../styles/_sidebar.module.scss';

export default function Sidebar() {
    const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
    const logoutRef = useRef(null);
    const openLogoutMenu = () => setIsLogoutMenuOpen(true);
    useOutSideAlerter(logoutRef, () => setIsLogoutMenuOpen(false));
    return (
        <section>
            {/* Left Sidebar */}
            <aside id="leftsidebar" className="sidebar">
                {/* User Info  */}
                <div className="user-info">
                    <div className="image">
                        <img src="images/user.png" width="48" height="48" alt="User" />
                    </div>
                    <div className="info-container">
                        <div className="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">John Doe</div>
                        <div className="email">john.doe@example.com</div>
                        <div className={"btn-group user-helper-dropdown" + (isLogoutMenuOpen ? ' open' : '')}>
                            <i
                                ref={logoutRef}
                                className="material-icons"
                                onClick={openLogoutMenu}
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="true">
                                {"keyboard_arrow_down"}
                            </i>
                            <ul className="dropdown-menu pull-right">
                                <li><a href="#" className=" waves-effect waves-block"><i className="material-icons">input</i>Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* #User Info */}
                {/* Menu */}
                <div className="menu">
                    <div className="slimScrollDiv">
                        <ul className="list" >
                            <li className="active">
                                <a href="#" className="toggled waves-effect waves-block">
                                    <i className="material-icons">home</i>
                                    <span>Home</span>
                                </a>
                            </li>
                        </ul>
                        <div className="slimScrollBar" ></div>
                        <div className="slimScrollRail" ></div>
                    </div>
                </div>
                {/* #Menu */}
                {/* Footer */}
                <div className="legal">
                    <div className="copyright">
                        © 2016 - 2017 <a href="#">AdminBSB - Material Design</a>.
                </div>
                    <div className="version">
                        <b>Version: </b> 1.0.5
                </div>
                </div>
                {/* #Footer */}
            </aside>
            {/* #END# Left Sidebar */}
        </section>
    );
}