import { useForm } from "react-hook-form";
import { UserModel } from "../../../models/user-model";
import { notify } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { authServiceFront } from "../../../services/auth-service-front";
import "./register.css";

export function Register() {
    const { register, handleSubmit } = useForm<UserModel>();
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
                <input type="text" {...register("firstName")} required minLength={2} maxLength={40} />

                <label>Last Name</label>
                <input type="text" {...register("lastName")} required minLength={2} maxLength={40} />

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

                <button type="submit">Register</button>
            </form>
        </div>
    );
}