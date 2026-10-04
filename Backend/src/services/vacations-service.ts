import { OkPacketParams } from "mysql2";
import { dal } from "../utils/dal";
import { VacationModel } from "../models/vacation-model";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { fileSaver } from "uploaded-file-saver";

class VacationsService {

    //  Signature. It takes the logged-in user's id, which page they want, and which filter is active, and returns that page of vacations plus the total count.
    // The two filter slots. WHERE filters on the vacation's own date columns. HAVING filters on isLiked, which doesn't exist until after the grouping, so it can't go in WHERE.
    // The join and the grouping. The join attaches every like row to its vacation, which multiplies the rows. GROUP BY collapses them back to one row per vacation, and COUNT gives me the like total.
    // isLiked. EXISTS checks whether a row is present in the likes table for this vacation and this user. One if yes, zero if no.
    // LIMIT and OFFSET. Nine per page as the spec requires. OFFSET skips the earlier pages.
    // The second query. The first returns nine rows, so the client can't tell how many exist. The count query runs the same filter without the limit and returns the total, so React knows how many page buttons to draw.



    public async getAllVacations(userId: number, page: number, filter: string): Promise<{ vacations: VacationModel[], total: number }> {
        const PageLimit = 9;
        const OFFSET = (page - 1) * PageLimit;  /// (2-1)*9=9

        //initialize where & having as empty till a filter is selected
        let where = "";
        let having = "";

        //filters
        if (filter === "active") where = "WHERE v.startDate <= CURDATE() AND v.endDate >= CURDATE()";
        if (filter === "upcoming") where = "WHERE v.startDate > CURDATE()";
        if (filter === "liked") having = "HAVING isLiked >= 1";

        //Get each vacation with its like count and whether I liked it,
        // filter by date if asked, if asked keep only liked,
        // sort by start date, return 9 from this page's position.
        const sql = `SELECT v.*, COUNT(l.userId) AS likesCount,
                    EXISTS(SELECT 1 FROM likes WHERE vacationId = v.vacationId AND userId = ?) AS isLiked
                    FROM vacations AS v LEFT JOIN likes AS l ON l.vacationId = v.vacationId
                    ${where} GROUP BY v.vacationId ${having} ORDER BY v.startDate ASC LIMIT ? OFFSET ?`;

        //Run the query with the user's id, the page size and the page position,
        // and get back an array of up to 9 vacations.
        const vacations = await dal.execute(sql, [userId, PageLimit, OFFSET]) as VacationModel[];

        //filter matching in order for the client knows the page counting
        const sqlCounts = `SELECT COUNT(*) AS total FROM ( SELECT v.vacationId,
                            EXISTS(SELECT 1 FROM likes WHERE vacationId = v.vacationId AND userId = ?) AS isLiked
                            FROM vacations AS v LEFT JOIN likes AS l ON l.vacationId = v.vacationId
                            ${where} GROUP BY v.vacationId ${having}) AS filtered`;

        //// How many vacations match the filter in total, not just this page.
        const countingResult = await dal.execute(sqlCounts, [userId]) as { total: number }[];
        // Send back this page of vacations plus the total count,
        // so the client can work out how many pages there are.
        return { vacations, total: countingResult[0].total }

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
        //stop instead of crashing. Null value - use 0.
        return result[0]?.averagePrice ?? 0;
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
        //must add img
        if (!vacation.image) throw new ClientError(StatusCode.UnprocessableContent, "Please add an image")
        //past-date
        if (vacation.startDate <= new Date().toISOString().slice(0, 10)) {
            throw new ClientError(StatusCode.UnprocessableContent, "Start date must be after today")
        }
        //same-day
        if (vacation.endDate <= vacation.startDate) {
            throw new ClientError(StatusCode.UnprocessableContent, "End date must be after start date(at least a day gap)")
        }

        // Save the file first - outside the try, so the catch only deletes a file that exists
        const imageName = await fileSaver.add(vacation.image);
        vacation.imageName = imageName;

        try {
            const sql = "INSERT INTO vacations (destination, continent, description, startDate, endDate, price, imageName) VALUES (?,?,?,?,?,?,?)";
            const info = await dal.execute(sql, [vacation.destination, vacation.continent, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName]) as OkPacketParams;
            vacation.vacationId = info.insertId;
        } catch (err) {
            await fileSaver.delete(imageName);
            throw err;
        }
        /// disable huge array of numbers in the response
        delete vacation.image;
        return vacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.validate();

        //same-day
        if (vacation.endDate <= vacation.startDate) {
            throw new ClientError(StatusCode.UnprocessableContent, "End date must be after start date(at least a day gap)")
        }

        const existing = await this.getOneVacation(vacation.vacationId!);

        if (vacation.image) {
            vacation.imageName = await fileSaver.update(existing.imageName!, vacation.image);
        } else {
            vacation.imageName = existing.imageName;
        }

        const sql = `UPDATE vacations SET destination = ?, continent = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageName = ? where vacationId = ?`;
        const info = await dal.execute(sql, [vacation.destination, vacation.continent, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId]) as OkPacketParams;
        if (info.affectedRows === 0) {
            throw new ClientError(StatusCode.NotFound, `Vacation ${vacation.vacationId} not found.`);
        }
        /// disable huge array of numbers in the response
        delete vacation.image;
        return vacation;
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        const imageName = (await this.getOneVacation(vacationId)).imageName;
        const sql = "DELETE FROM vacations where vacationId = ?";
        await dal.execute(sql, [vacationId]) as OkPacketParams;
        await fileSaver.delete(imageName!);
    }
}

export const vacationsService = new VacationsService();