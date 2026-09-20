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

const ReactPaginate = (ReactPaginateModule as any).default || ReactPaginateModule;

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

            <div className="PaginationBar">
                <span>{total} vacations, page {page} of {Math.ceil(total / 9)}</span>
                <ReactPaginate
                    pageCount={Math.ceil(total / 9)}
                    forcePage={page - 1}
                    onPageChange={(selected: { selected: number }) => setPage(selected.selected + 1)}
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
                {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
            </div>
        </div>
    );
}