import React from 'react';
import style from './Navbar.module.css';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={style.navbar}>
            <div className={style.navbarLinks}>
                <Link to={'/about'} className={style.navbarLink}>About</Link>
                <Link to={'/posts'} className={style.navbarLink}>Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;