import ReactPaginateModule from "react-paginate";
import { useEffect, useState } from "react";
import { notify } from "../../../utils/notify";
import { VacationCard } from "../vacation-card/vacation-card";
import "./vacations-list.css";
import { vacationService } from "../../../services/vacations-service-front";
import { AppState } from "../../../redux/app-state";
import { useSelector } from "react-redux";
import { Filters } from "../filters/filters";
import { appConfig } from "../../../utils/app-config";


const ReactPaginate = (ReactPaginateModule as any).default || ReactPaginateModule;

export function VacationsList() {
    const vacations = useSelector((state: AppState) => state.vacations);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [total, setTotal] = useState(0);
    const [reload, setReload] = useState(0);

    function handleFilterChange(newFilter: string) {
        setFilter(newFilter);
        setPage(1)
    }

    function likeHandleChange(){
        if(filter === "liked") setReload(r =>r+1);
    }

    useEffect(() => {
        vacationService.getAllVacations(page, filter)
            .then(data => {
                setTotal(data.total);
                // Last card on this page was unliked - step back a page
                if (data.vacations.length === 0 && page > 1) setPage(page - 1);
            })
            .catch(err => notify.error(err));
    }, [page, filter, reload]);


    return (
        <div className="VacationsList">
            <Filters filter={filter} onFilterChange={handleFilterChange} />

            <div className="PaginationBar">
                <span>{total} vacations, page {page} of {Math.ceil(total / appConfig.pagination)}</span>
                <ReactPaginate
                    pageCount={Math.ceil(total / appConfig.pagination)}
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
            {total === 0 && <p>No results were found</p>}
            {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} onLikeChange={likeHandleChange} onDelete={() => setReload(r => r + 1)} />)}
        </div>
    );
}