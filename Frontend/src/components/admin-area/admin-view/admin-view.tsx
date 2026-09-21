import ReactPaginateModule from "react-paginate";
import { useSelector } from "react-redux";
import "./admin-view.css";
import { AppState } from "../../../redux/app-state";
import { useEffect, useState } from "react";
import { vacationService } from "../../../services/vacations-service-front";
import { notify } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { VacationCard } from "../../vacations-area/vacation-card/vacation-card";
import { Spinner } from "../../shared-area/spinner/spinner";
import { appConfig } from "../../../utils/app-config";

const ReactPaginate = (ReactPaginateModule as any).default || ReactPaginateModule;

export function AdminView() {

    const vacations = useSelector((state: AppState) => state.vacations);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [reload, setReload] = useState(0);
    const navigate = useNavigate();

    //reload new page results
    useEffect(() => {
        vacationService.getAllVacations(page, "")
            .then(data => {
                setTotal(data.total);
                // Last card on this page was deleted - step back a page
                if (data.vacations.length === 0 && page > 1) setPage(page - 1);
            })
            .catch(err => notify.error(err))
            .finally(() => setLoading(false))
    }, [page, reload])


    return (
        <div className="AdminList">

            <button onClick={() => navigate("/admin/add")}>Add vacation</button>

            {loading && <Spinner />}

            <div className="PaginationBar">
                <span>{total} vacations, page {page} of {Math.ceil(total / appConfig.pagination)}</span>
                <ReactPaginate
                    pageCount={Math.ceil(total / appConfig.pagination)}
                    forcePage={page - 1}
                    onPageChange={(selected: { selected: number }) => { setLoading(true); setPage(selected.selected + 1); }}
                    containerClassName="Pagination"
                    pageLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    disabledClassName="disabled"
                    activeClassName="active"
                    previousLabel="Previous"
                    nextLabel="Next"
                />
            </div>

            <div className="Cards">
                {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} onDelete={() => setReload(r => r + 1)} />)}
            </div>
        </div>
    );
}