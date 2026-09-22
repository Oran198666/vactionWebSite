import { VacationModel } from "../../../models/vacation-model";
import "./vacation-card.css";
import { appConfig } from "../../../utils/app-config";
import { likesService } from "../../../services/likes-service-front";
import { notify } from "../../../utils/notify";
import { useSelector } from "react-redux";
import { Role } from "../../../models/role";
import { AppState } from "../../../redux/app-state";
import { useNavigate } from "react-router-dom";
import { vacationService } from "../../../services/vacations-service-front";

type VacationCardProps = {
    vacation: VacationModel;
    onLikeChange?: () => void;
    onDelete?: () => void;
}

export function VacationCard(props: VacationCardProps) {
    const user = useSelector((state: AppState) => state.user);
    const isAdmin = user?.roleId === Role.Admin;
    const navigate = useNavigate();

    async function toggleLike() {
        try {
            if (props.vacation.isLiked) {
                await likesService.removeLike(props.vacation.vacationId!);
            }
            else {
                await likesService.addLike(props.vacation.vacationId!);
            }
            props.onLikeChange?.();
        } catch (err: any) {
            notify.error(err);
        }
    }

    async function deleteMe() {
        try {
            if (!confirm("Are you sure?")) return;
            await vacationService.deleteVacation(props.vacation.vacationId!);
            notify.success("Vacation deleted");
            props.onDelete?.();
        } catch (err: any) {
            notify.error(err);
        }
    }

    const formatDate = (date: string) => new Date(date).toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric" });
    const isEnded = props.vacation.endDate < new Date().toLocaleDateString("en-CA");

    return (
        <div className="VacationCard">
            <img src={appConfig.imageUrl(props.vacation.imageName!)} alt={props.vacation.destination} />
            {isEnded && <span className="EndedBadge">Ended</span>}
            <h3 title={props.vacation.destination}>{props.vacation.destination}</h3>
            <p>{props.vacation.description}</p>

            <div className="Facts">

                <span>{formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}</span>
                <span>${(+props.vacation.price).toFixed(2)}</span>
                <span className="Likes">{props.vacation.likesCount} likes</span>
            </div>

            {!isAdmin && (
                <button
                    className={`like-btn ${props.vacation.isLiked ? "liked" : ""}`}
                    onClick={toggleLike}
                >
                    {props.vacation.isLiked ? "♥" : "♡"}
                </button>
            )}

            {isAdmin && (
                <>
                    <button className="edit-btn" onClick={() => navigate("/admin/edit/" + props.vacation.vacationId)}>Edit</button>
                    <button className="delete-btn" onClick={deleteMe}>Delete</button>
                </>
            )}
        </div>
    );
}
