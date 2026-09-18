// import "./pagination.css";
// import { useEffect, useState } from "react";
// import { appConfig } from "../../../utils/app-config";
// import { notify } from "../../../utils/notify";
// import { vacationService } from "../../../services/vacations-service-front";
// import { VacationModel } from "../../../models/vacation-model";

// interface PaginationProps {
//     onVacationsLoaded?: (vacations: VacationModel[]) => void;
// }

// export function Pagination({ onVacationsLoaded }: PaginationProps) {
//     const [vacations, setVacations] = useState<VacationModel[]>([]);
//     const [page, setPage] = useState<number>(1);

//     useEffect(() => {
//         vacationService.getAllVacations(page, appConfig.pagination)
//             .then(data => {
//                 setVacations(data);
//                 if (onVacationsLoaded) onVacationsLoaded(data);
//             })
//             .catch(err => notify.error(err));
//     }, [page]);

//     function previousPage() {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     }

//     function nextPage() {
//         if (vacations.length < appConfig.pagination) return;
//         setPage(page + 1);
//     }

//     return (
//         <div className="Pagination">
//             <button onClick={previousPage} disabled={page === 1}>
//                 Previous
//             </button>

//             <span>Page {page}</span>

//             <button
//                 onClick={nextPage}
//                 disabled={vacations.length < appConfig.pagination}
//             >
//                 Next
//             </button>
//         </div>
//     );
// }