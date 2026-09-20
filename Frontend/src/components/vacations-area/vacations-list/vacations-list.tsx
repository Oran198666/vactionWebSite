import ReactPaginateModule from "react-paginate";
import { useEffect, useState } from "react";
import { notify } from "../../../utils/notify";
import { VacationCard } from "../vacation-card/vacation-card";
import "./vacations-list.css";
import { vacationService } from "../../../services/vacations-service-front";
import { AppState } from "../../../redux/app-state";
import { useSelector } from "react-redux";
import { Filters } from "../filters/filters";

const ReactPaginate = (ReactPaginateModule as any).default || ReactPaginateModule;

export function VacationsList() {
    const vacations = useSelector((state: AppState) => state.vacations);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [total, setTotal] = useState(0);

    function handleFilterChange(newFilter: string) {
        setFilter(newFilter);
        setPage(1)
    }

    useEffect(() => {
        vacationService.getAllVacations(page, filter)
            .then(data => setTotal(data.total))
            .catch(err => notify.error(err));
    }, [page, filter]);


    return (
        <div className="VacationsList">
            <Filters filter={filter} onFilterChange={handleFilterChange} />

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

            {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}