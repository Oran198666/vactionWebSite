import { NavLink } from "react-router-dom";
import "./page404.css";

export function Page404() {
    return (
        <div className="Page404">
            <h2>404 - Page not found</h2>
            <p>The page you are looking for does not exist.</p>
            <NavLink to="/home">Back to home</NavLink>
        </div>
    );
}