import { appConfig } from "../utils/app-config";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { store } from "../redux/store";
import { CredentialsModel } from "../models/credentials-model";
import { authSlice } from "../redux/auth-slice";
import { UserModel } from "../models/user-model";


class AuthServiceFront {
    public constructor() {

        // Runs once when this module first loads - Redux starts empty on every page refresh,
        // so the logged-in user has to be restored from the token.

        // Get token from local storage:
        const token = localStorage.getItem("token");

        if (token) {

            // Unpack the token into its payload: the user object and the expiry timestamp.
            const payload = jwtDecode<{ user: UserModel, exp: number }>(token);

            // exp is in seconds, Date.now() is in milliseconds - hence the * 1000.
            if (payload.exp * 1000 < Date.now()) {

                // Expired: drop it rather than showing a logged-in user whose requests would 401.
                localStorage.removeItem("token");
            }
            else {
                // Still valid: put the user back into global state.
                store.dispatch(authSlice.actions.initUser(payload.user));
            }
        }
    }

    // Register new user:
    public async register(user: UserModel): Promise<void> {

        // Send user to backend:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Get JWT token:
        const token = response.data;

        // Extract user:
        const dbUser = jwtDecode<{ user: UserModel }>(token).user;

        // Send user to global state
        const action = authSlice.actions.initUser(dbUser);
        store.dispatch(action);

        //save token in localStorage
        localStorage.setItem("token", token);
    }

    // Login existing user:
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send user to backend:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Get JWT token:
        const token = response.data;

        // Extract user:
        const dbUser = jwtDecode<{user:UserModel}>(token).user;

        // Send user to global state:
        const action = authSlice.actions.initUser(dbUser);
        store.dispatch(action);

        // Save token in local storage:
        localStorage.setItem("token", token)
    }

    // Logout existing user:
    public logout(): void {

        // Remove user from global state:
        const action = authSlice.actions.logoutUser();
        store.dispatch(action);

        // Remove token from local storage:
        localStorage.removeItem("token");
    }
}

export const authServiceFront = new AuthServiceFront();