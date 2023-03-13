import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";

const getClass = (isActive: boolean) => (isActive ? s.active : s.link);

const Header: FC = () => {
    return (
        <header className={s.header}>
            <nav className={s.nav}>
                <NavLink
                    to="/"
                    className={({ isActive }) => getClass(isActive)}
                >
                    Перевірити ТТН
                </NavLink>
                <NavLink
                    to="/branches"
                    className={({ isActive }) => getClass(isActive)}
                >
                    Список відділень
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
