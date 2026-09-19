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
    const today = new Date().toISOString().slice(0, 10);

    async function send(vacation: VacationModel) {
        try {
            // Extract the actual File object from the FileList
            if (vacation.image) {
                vacation.image = (vacation.image as unknown as FileList)[0];
            }
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
                    <input  type="text" {...register("destination")} required minLength={2} maxLength={100} />
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
                    <input type="date" {...register("startDate")} onChange={e => setDate(e.target.value)} required min={today} />
                </div>

                <div className="form-group">
                    <label>End Date</label>
                    <input type="date" {...register("endDate")} min={date || today} />
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