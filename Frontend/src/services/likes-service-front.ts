import axios from "axios";
import { appConfig } from "../utils/app-config";
import { store } from "../redux/store";
import { vacationsSlice } from "../redux/vacations-slice";

class LikesService {
    public async addLike(vacationId: number): Promise<void> {
        await axios.post(appConfig.likeUrl(vacationId));
        store.dispatch(vacationsSlice.actions.toggleLike(vacationId))
    }

    public async removeLike(vacationId: number): Promise<void> {
        await axios.delete(appConfig.likeUrl(vacationId));
        store.dispatch(vacationsSlice.actions.toggleLike(vacationId));
    }
}

export const likesService = new LikesService();