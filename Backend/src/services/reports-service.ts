import { dal } from "../utils/dal";

class ReportsService {

    public getLikesReport = async (): Promise<{ destination: string, likes: number }[]> => {
        const sql = `SELECT v.destination, COUNT(l.userId) AS likes
                 FROM vacations AS v
                 LEFT JOIN likes AS l ON l.vacationId = v.vacationId
                 GROUP BY v.vacationId HAVING likes > 0
                 ORDER BY likes DESC`;
        const report = await dal.execute(sql) as { destination: string, likes: number }[];
        return report;
    }

    public getCsvReport = async (): Promise<string> => {
        const report = await this.getLikesReport();
        const header = "destination,likes";
        const rows = report.map(row => `"${row.destination}",${row.likes}`);
        const total = report.reduce((sum, row) => sum + row.likes, 0);
        return [header, ...rows, `"TOTAL",${total}`].join("\n");
    }
}

export const reportsService = new ReportsService();