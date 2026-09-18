import { useSelector } from "react-redux";
import "./admin-list.css";
import { AppState } from "../../../redux/app-state";
import { useEffect, useState } from "react";
import { vacationService } from "../../../services/vacations-service-front";
import { notify } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { VacationCard } from "../../vacations-area/vacation-card/vacation-card";
import { Spinner } from "../../shared-area/spinner/spinner";

export function AdminView() {

    const vacations = useSelector((state: AppState) => state.vacations);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        vacationService.getAllVacations(page, "")
            .then(data => setTotal(data.total))
            .catch(err => notify.error(err))
            .finally(() => setLoading(false))
    }, [page])

    return (
        <div className="AdminList">

            <button onClick={() => navigate("/admin/add")}>Add vacation</button>
            {loading && <Spinner />}
            <div className="Cards">
                {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
            </div>

        </div>
    );
}