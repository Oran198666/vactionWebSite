import { useForm } from "react-hook-form";
import { notify } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { authServiceFront } from "../../../services/auth-service-front";
import { CredentialsModel } from "../../../models/credentials-model";
import "./login.css";

export function Login() {
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authServiceFront.login(credentials);
            notify.success("Welcome back");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Email</label>
                <input type="email" {...register("email")} required maxLength={100}
                    pattern="^\S+@\S+\.\S+$" title="Please enter a valid email address" />
                {/* demands [Anything except a space] + @ + [Anything except a space] + . + [Anything except a space] */}

                <label>Password</label>
                <input type="password" {...register("password")} required minLength={4} maxLength={100}
                    pattern="^(?=.*[A-Za-z])(?=.*\d).+$"
                    title="Password must contain at least one letter and one digit" />
                {/* Checks ahead for at least one letter (a-z or A-Z) and at least one digit;
                 .+ means 1 or more characters */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}