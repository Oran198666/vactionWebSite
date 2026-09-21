import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Continent } from "../../../models/continent";
import { appConfig } from "../../../utils/app-config";
import { VacationModel } from "../../../models/vacation-model";
import { vacationService } from "../../../services/vacations-service-front";
import { notify } from "../../../utils/notify";
import "./edit-vacation.css";

export function EditVacation() {
    const { register, handleSubmit, reset, watch } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = Number(params.vacationId || params.id);

    //Watch startDate instead of maintaining manual React state
    const startDate = watch("startDate");

    // format YYYY-MM-DD for 1 day after startDate so HTML min validation works
    const getMinEndDate = () => {
        if (!startDate) return "";
        const [year, month, day] = startDate.split("-").map(Number);
        const nextDay = new Date(year, month - 1, day + 1);

        const yyyy = nextDay.getFullYear();
        const mm = String(nextDay.getMonth() + 1).padStart(2, "0");
        const dd = String(nextDay.getDate()).padStart(2, "0");

        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => {
        if (!id) return;
        vacationService.getOneVacation(id)
            .then((vacation) => {
                const vacationToEdit = { ...vacation };

                if (vacationToEdit.startDate) {
                    vacationToEdit.startDate = new Date(vacationToEdit.startDate)
                        .toISOString().slice(0, 10);
                }

                if (vacationToEdit.endDate) {
                    vacationToEdit.endDate = new Date(vacationToEdit.endDate)
                        .toISOString().slice(0, 10);
                }
                reset(vacationToEdit);
            })
            .catch((err) => notify.error(err));
    }, [id, reset]);

    async function send(vacation: VacationModel) {
        try {
            vacation.vacationId = id;
            await vacationService.updateVacation(vacation);
            notify.success("Vacation has been updated");
            navigate("/admin");
        } catch (err: any) {
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
                        {Object.values(Continent).map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea {...register("description")} required minLength={2} maxLength={1000} />
                </div>

                <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" {...register("startDate")} required />
                </div>

                <div className="form-group">
                    <label>End Date</label>
                    <input type="date" {...register("endDate")} required min={getMinEndDate()} />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} required min={0} max={10000} />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <img src={appConfig.imageUrl(watch("imageName")!)} alt="Current" style={{ maxWidth: "100%" }} />
                    <input type="file" accept="image/*" {...register("image")} />
                </div>

                <button type="submit">Update Vacation</button>
                <button type="button" onClick={() => navigate("/admin")}>Cancel</button>
            </form>
        </div>
    );
}