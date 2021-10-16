import React from 'react';
import classes from "./navBar.module.css";

export type NavBarProps = {
    logo?: string;
}

const NavBar: React.FC<NavBarProps> = ({ children, logo = 'Logo' }) => {
    return (
        <div className={classes.container}>
            <div className={classes.logo}>{logo}</div>
            {children}
        </div>
    );
}
export default NavBar;