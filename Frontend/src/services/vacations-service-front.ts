import { VacationModel } from "../models/vacation-model";
import axios from "axios";
import { appConfig } from "../utils/app-config";
import { formUtil } from "../utils/form-util";
import { store } from "../redux/store";
import { vacationsSlice } from "../redux/vacations-slice";


class VacationService {
    public async getAllVacations(page: number, filter: string): Promise<{ vacations: VacationModel[], total: number }> {
        const url = appConfig.vacationsUrl + "?page=" + page + "&filter=" + filter;
        const response = await axios.get<{ vacations: VacationModel[], total: number }>(url);
        store.dispatch(vacationsSlice.actions.initVacations(response.data.vacations));
        return response.data;
    }

    public async getOneVacation(vacationId:number):Promise<VacationModel>{
        const vacation = store.getState().vacations.find(v => v.vacationId === vacationId);
        if(vacation){ return vacation};
        const response = await axios.get<VacationModel>(appConfig.vacationUrl(vacationId))
        const dbVacation = response.data;
        return dbVacation;
    }
    public async addVacation(vacation:VacationModel):Promise<void>{
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, formUtil.toFormData(vacation));
        const dbVacation = response.data;
        const action = vacationsSlice.actions.addVacation(dbVacation);
        store.dispatch(action);
    }

    public async updateVacation(vacation:VacationModel):Promise<void>{
        const response = await axios.put<VacationModel>(appConfig.vacationUrl(vacation.vacationId!), formUtil.toFormData(vacation));
        const dbVacation = response.data;
        const action = vacationsSlice.actions.updateVacation(dbVacation);
        store.dispatch(action);
    }

    public async deleteVacation(vacationId:number):Promise<void>{
        await axios.delete(appConfig.vacationUrl(vacationId));
        const action = vacationsSlice.actions.deleteVacation(vacationId);
        store.dispatch(action);
    }
}

export const vacationService = new VacationService();