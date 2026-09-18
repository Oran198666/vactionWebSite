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
    const [date,setDate] = useState("");
    const today = new Date().toISOString().slice(0,10);

    async function send(vacation:VacationModel){
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
            <label>destination</label>
            <input type="text" {...register("destination")} required minLength={2} maxLength={100} />

            <label>continent</label>
            <select {...register("continent")} required>
                <option value="">Select Continent</option>
                {Object.values(Continent).map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <label>description</label>
            <input type="text" {...register("description")} required minLength={2} maxLength={1000} />

            <label>Start Date</label>
            <input type="date" {...register("startDate", { onChange: e => setDate(e.target.value) })} required min={today} />

            <label>End Date</label>
            <input type="date" {...register("endDate")} required min={date || today} />

            <label>Price</label>
            <input type="number" step="0.01" {...register("price")} required min={0}  max={10000}/>

            <label>Image</label>
            <input type="file" accept="image/*" {...register("image")} required />

            <button>Add Vacation</button>

        </form>
        </div>
    );
}
