import { VacationModel } from "../models/vacation-model";
import { UserModel } from "../models/user-model";

// Declares the shape of the whole store: { user, vacations }.
// No logic, no runtime code — it exists so useSelector knows what's available.
export type AppState = {
    vacations: VacationModel[];
    user: UserModel;
}

