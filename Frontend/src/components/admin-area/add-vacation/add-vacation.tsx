import { useForm } from "react-hook-form";
import "./add-vacation.css";
import { VacationModel } from "../../../models/vacation-model";
import { useNavigate } from "react-router-dom";
import { vacationService } from "../../../services/vacations-service-front";
import { notify } from "../../../utils/notify";
import { Continent } from "../../../models/continent";
import { useState } from "react";

export function AddVacation() {
    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [date, setDate] = useState("");

    const getMinEndDate = () => {
        if (!date) return "";
        const [year, month, day] = date.split("-").map(Number);
        const nextDay = new Date(year, month - 1, day + 1);

        const yyyy = nextDay.getFullYear();
        const mm = String(nextDay.getMonth() + 1).padStart(2, "0");
        const dd = String(nextDay.getDate()).padStart(2, "0");

        return `${yyyy}-${mm}-${dd}`;
    };

    const tomorrow  = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    const minStartDate = tomorrow.toLocaleDateString("en-CA");


    async function send(vacation: VacationModel) {
        try {
            await vacationService.addVacation(vacation);
            notify.success("Vacation has been added.");
            navigate("/admin");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddVacation">
            <h2>Add Vacation</h2>

            <form onSubmit={handleSubmit(send)}>
                <div className="form-group">
                    <label>Destination</label>
                    <input type="text" {...register("destination")} required minLength={2} maxLength={100} />
                </div>

                <div className="form-group">
                    <label>Continent</label>
                    <select {...register("continent")} required>
                        <option value="">Select Continent</option>
                        {Object.values(Continent).map(c => (<option key={c} value={c}>{c}</option>))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea {...register("description")} required minLength={2} maxLength={1000} />
                </div>

                <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" {...register("startDate", { onChange: e => setDate(e.target.value) })}
                        required min={minStartDate} />
                </div>

                <div className="form-group">
                    <label>End Date</label>
                    <input type="date" {...register("endDate")} required min={getMinEndDate()} />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input type="number" step="0.01" {...register("price")} required min={0} max={10000} />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input type="file" accept="image/*" {...register("image")} required />
                </div>

                <button type="submit">Add Vacation</button>
            </form>
        </div>
    );
}