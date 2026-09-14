import axios from "axios";
import { appConfig } from "../utils/app-config";


class ReportsService {

    public async getLikesReport(): Promise<{ destination: string, likes: number }[]> {
        const response = await axios.get<{ destination: string, likes: number }[]>(appConfig.reportUrl)
        return response.data;
    }

    public async downloadCsv(): Promise<void> {

        // responseType "blob" - tell axios this is a file, not JSON to parse
        const response = await axios.get(appConfig.csvUrl, { responseType: "blob" });

        // Wrap the blob in a temporary URL the browser can point at
        const url = URL.createObjectURL(response.data);

        // Build a link, set the filename, click it programmatically.
        const link = document.createElement("a");
        link.href = url;
        link.download = "vacations-report.csv";
        link.click();

        // Release the temporary URL - it holds the file in memory until revoked.
        URL.revokeObjectURL(url);
    }
}

export const reportsService = new ReportsService();