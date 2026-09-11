import { OkPacketParams } from "mysql2";
import { dal } from "../utils/dal";
import { VacationModel } from "../models/vacation-model";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { fileSaver } from "uploaded-file-saver";

class VacationsService {

    public async getAllVacations(userId: number): Promise<VacationModel[]> {
        const sql = `SELECT v.*,COUNT(l.userId) AS likesCount,
        MAX(l.userId = ?) IS TRUE AS isLiked
        FROM vacations AS v LEFT JOIN likes AS l ON l.vacationId = v.vacationId
        GROUP BY v.vacationId ORDER BY v.startDate ASC`;
        const vacations = await dal.execute(sql, [userId]) as VacationModel[];
        return vacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const sql = "SELECT * from vacations where vacationId = ?";
        const vacations = await dal.execute(sql, [vacationId]) as VacationModel[];
        const vacation = vacations[0];
        if (!vacation) {
            throw new ClientError(StatusCode.NotFound, `Vacation ${vacationId} not found.`);
        }
        return vacation;
    }

    public async getAllActiveVacations(): Promise<VacationModel[]> {
        const sql = `SELECT * FROM vacations
                    WHERE startDate <= CURDATE() AND endDate >= CURDATE()
                    ORDER BY startDate`;
        return await dal.execute(sql) as VacationModel[];
    }

    public async getAveragePrice(): Promise<number> {
        const sql = "SELECT ROUND(AVG(price), 2) AS averagePrice FROM vacations";
        const result = await dal.execute(sql) as { averagePrice: number }[];
        return result[0].averagePrice;
    }

    public async getFutureVacationsByRegion(region: string): Promise<VacationModel[]> {
        const sql = `SELECT * FROM vacations
            WHERE startDate > CURDATE() AND continent = ?
            ORDER BY startDate`;
        return await dal.execute(sql, [region]) as VacationModel[];
    }

    public async getAllVacationsSimple(): Promise<VacationModel[]> {
        const sql = `SELECT * FROM vacations ORDER BY startDate`;
        return await dal.execute(sql) as VacationModel[];
    }


    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.validate();
        vacation.imageName = await fileSaver.add(vacation.image!);
        const sql = "INSERT INTO vacations (destination, continent, description, startDate, endDate, price, imageName) VALUES (?,?,?,?,?,?,?)";
        const info = await dal.execute(sql, [vacation.destination, vacation.continent, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName]) as OkPacketParams;
        vacation.vacationId = info.insertId;
        return vacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.validate();
        if (vacation.image) {
            const oldName = (await this.getOneVacation(vacation.vacationId!)).imageName;
            vacation.imageName = await fileSaver.update(oldName!, vacation.image);
        } else {
            vacation.imageName = (await this.getOneVacation(vacation.vacationId!)).imageName;
        }
        const sql = `UPDATE vacations SET destination = ?, continent = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageName = ? where vacationId = ?`;
const info = await dal.execute(sql, [vacation.destination, vacation.continent, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId]) as OkPacketParams;
        if (info.affectedRows === 0) {
            throw new ClientError(StatusCode.NotFound, `Vacation ${vacation.vacationId} not found.`);
        }
        return vacation;
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        const imageName = (await this.getOneVacation(vacationId)).imageName;
        await fileSaver.delete(imageName!);
        const sql = "DELETE FROM vacations where vacationId = ?";
        await dal.execute(sql, [vacationId]) as OkPacketParams;
    }
}

export const vacationsService = new VacationsService();