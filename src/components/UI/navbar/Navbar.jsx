import React, {useContext} from 'react';
import style from './Navbar.module.css';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    };

    return (
        <div className={style.navbar}>
            <MyButton onClick={logout}>Logout</MyButton>
            <div className={style.navbarLinks}>
                <Link to={'/about'} className={style.navbarLink}>About</Link>
                <Link to={'/posts'} className={style.navbarLink}>Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;