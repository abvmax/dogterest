import { Link, useLocation } from "react-router-dom";
import "./Navigation.scss";

export const Navigation = () => {

    const urlPathname = useLocation().pathname


    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__item">
                    <Link className={urlPathname === '/' ? "nav__link nav__link_main active" : "nav__link nav__link_main"} to={'/'}>
                        Главная
                    </Link>
                </li>
                <li className="nav__item">
                    <Link className={urlPathname === "/save" ? "nav__link active" : "nav__link"} to={"save"}>
                        Сохранённые
                    </Link>
                </li>

            </ul>
        </nav>
    );
};
