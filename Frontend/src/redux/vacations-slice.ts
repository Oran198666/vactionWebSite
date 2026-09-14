import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../models/vacation-model";

function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const vacationToAdd = action.payload;
    const newState = [...currentState];
    newState.push(vacationToAdd);
    return newState
}

function deleteVacation(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    const idToDelete = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(v => v.vacationId === idToDelete);
    if (index >= 0) {
        newState.splice(index, 1); //splice remove
    }
    return newState;
}

function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const vacationToUpdate = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(v => v.vacationId === vacationToUpdate.vacationId);
    if (index >= 0) {
        newState[index] = vacationToUpdate;
    }
    return newState;
}

function initVacations(_currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    const vacationsToInit = action.payload;
    const newState = vacationsToInit;
    return newState;
}

function toggleLike(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    return currentState.map(v => {
        if (v.vacationId !== action.payload) return v;
        return v.isLiked ? { ...v, isLiked: 0, likesCount: v.likesCount! - 1 }
            : { ...v, isLiked: 1, likesCount: v.likesCount! + 1 };
    });
}

export const vacationsSlice = createSlice({
    name: "vacations-slice",
    initialState: [] as VacationModel[],
    reducers: { addVacation, deleteVacation, updateVacation, initVacations, toggleLike }
});