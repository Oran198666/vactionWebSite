import { useForm } from "react-hook-form";
import { notify } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { authServiceFront } from "../../../services/auth-service-front";
import { CredentialsModel } from "../../../models/credentials-model";
import "./login.css";

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
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
                <input type="email" {...register("email", {
                    required: "Email is required",
                    //demands [Anything except a space] + @ + [Anything except a space] + . + [Anything except a space]
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                    maxLength: { value: 100, message: "Maximum 100 characters" }
                })} />
                <span>{errors.email?.message}</span>

                <label>Password</label>
                <input type="password" {...register("password", {
                    required: "Password is required",
                    //both Checks ahead at least one letter (a-z or A-Z)
                    // at least one digit(?=.*\d), .+	1 or more characters
                    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d).+$/, message: "Must contain a letter and a digit" },
                    minLength: { value: 4, message: "Minimum 4 characters" },
                    maxLength: { value: 100, message: "Maximum 100 characters" }
                })} />
                <span>{errors.password?.message}</span>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}