import logo from "../../../assets/images/logo.jpg";
import "./header.css";

export function Header() {
    return (
        <div className="Header">
            <img src={logo} alt="MY Vacations" />
            <h1>My Vacations</h1>
            <p>Find your next trip</p>
        </div>
    );
}