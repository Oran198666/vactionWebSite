import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Continent } from "../../../models/continent";
import "./edit-vacation.css";
import { VacationModel } from "../../../models/vacation-model";
import { notify } from "../../../utils/notify";
import { vacationService } from "../../../services/vacations-service-front";

export function EditVacation() {
    const { register, handleSubmit, reset } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const params = useParams();
    const today = new Date().toISOString().slice(0, 10);
    const id = Number(params.prodId);

    useEffect(() => {
        if (!id) return;
        vacationService.getOneVacation(id)
            .then(vacation => {
                // Ensure date input values are formatted properly
                if (vacation.startDate) {
                    vacation.startDate = new Date(vacation.startDate).toISOString().slice(0, 10);
                    setDate(vacation.startDate);
                }
                if (vacation.endDate) {
                    vacation.endDate = new Date(vacation.endDate).toISOString().slice(0, 10);
                }

                reset(vacation);
            })
            .catch(err => notify.error(err));
    }, [id, reset]);

    async function send(vacation: VacationModel) {
        try {
            vacation.vacationId = id;
            if (vacation.image && (vacation.image as unknown as FileList).length > 0) {
                vacation.image = (vacation.image as unknown as FileList)[0];
            } else {
                delete vacation.image;
            }
            await vacationService.updateVacation(vacation);
            notify.success("Vacation has been updated");
            navigate("/admin");
        }
        catch (err: any) {
            notify.error(err);
        }
    }


    return (
        <div className="EditVacation">
            <h2>Edit Vacation</h2>
            <form onSubmit={handleSubmit(send)}>

                <div className="form-group">
                    <label>Destination</label>
                    <input type="text" {...register("destination")} required minLength={2} maxLength={100} />
                </div>

                <div className="form-group">
                    <label>Continent</label>
                    <select {...register("continent")} required>
                        <option value="">Select Continent</option>
                        {Object.values(Continent).map(c => <option key={c} value={c}>{c}</option>)}
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
                    <input type="date" {...register("endDate")} required min={date || today} />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input type="number" step="0.01" {...register("price")} required min={0} max={10000} />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input type="file" accept="image/*" {...register("image")} />
                </div>

                <button type="submit">Update Vacation</button>

            </form>
        </div>
    );
}
