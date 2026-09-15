import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AppState } from "../../../redux/app-state";
import { Role } from "../../../models/role";
import { authServiceFront } from "../../../services/auth-service-front";
import "./menu.css";

export function Menu() {

    // Read the logged-in user from the Redux store; re-renders when it changes.
    const user = useSelector((state: AppState) => state.user);

    const navigate = useNavigate();

    function logout() {
        authServiceFront.logout();
        navigate("/home");
    }

    return (
        <div className="Menu">
            
            {/* public branch */}
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>

            {/* guest branch */}
            {!user && <>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
            </>}

            {/* logged-in user branch */}
            {user && <>
                <NavLink to="/vacations">Vacations</NavLink>
                <NavLink to="/ai">AI recommendation</NavLink>
                <NavLink to="/mcp">Ask the database</NavLink>
            </>}

            {/*  admin branch */}
            {user?.roleId === Role.Admin && <>
                <NavLink to="/admin">Manage vacations</NavLink>
                <NavLink to="/admin/add">Add vacation</NavLink>
                <NavLink to="/admin/reports">Reports</NavLink>
            </>}

            {/* greeting and logout branch */}
            {user && <>
                <span>Hello {user.firstName} {user.lastName}</span>
                <button onClick={logout}>Logout</button>
            </>}

        </div>
    );
}
