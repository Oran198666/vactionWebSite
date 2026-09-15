import { useForm } from "react-hook-form";
import { UserModel } from "../../../models/user-model";
import { notify } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { authServiceFront } from "../../../services/auth-service-front";
import "./register.css";

export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authServiceFront.register(user);
            notify.success("Welcome: " + user.firstName + " " + user.lastName);
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Register">

            <h2>Registration</h2>

            <form onSubmit={handleSubmit(send)}>
                <label>First Name</label>
                <input type="text" {...register("firstName", {
                    required: "First name is required",
                    minLength: { value: 2, message: "Minimum 2 characters" },
                    maxLength: { value: 40, message: "Maximum 40 characters" }
                })} />
                <span>{errors.firstName?.message}</span>

                <label>Last Name</label>
                <input type="text" {...register("lastName", {
                    required: "Last name is required",
                    minLength: { value: 2, message: "Minimum 2 characters" },
                    maxLength: { value: 40, message: "Maximum 40 characters" }
                })} />
                <span>{errors.lastName?.message}</span>

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

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
