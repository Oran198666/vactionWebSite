import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-state";
import { Role } from "../../../models/role";
import "./auth-guard.css";

type AuthGuardProps = {
    children: ReactNode;
    adminOnly?: boolean;
};

export function AuthGuard(props: AuthGuardProps) {

    // Read the logged-in user from global state:
    const user = useSelector((state: AppState) => state.user);

    // Not logged in - send to login:
    if (!user) return <Navigate to="/login" />;

    // Logged in but not admin, on an admin-only route - send to the vacations page:
    if (props.adminOnly && user.roleId !== Role.Admin) return <Navigate to="/vacations" />;

    // Allowed - render the page:
    return <>{props.children}</>
}
