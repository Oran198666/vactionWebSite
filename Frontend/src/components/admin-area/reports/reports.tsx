import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";
import { reportsService } from "../../../services/reports-service-front";
import { notify } from "../../../utils/notify";
import "./reports.css";

type LikesReportRow = { destination: string, likes: number };

export function Reports() {

    const [report, setReport] = useState<LikesReportRow[]>([]);

    useEffect(() => {
        reportsService.getLikesReport()
            .then(data => setReport(data))
            .catch(err => {
                console.error(err);
                notify.error(err);
            });
    }, []);

    async function download() {
        try {
            await reportsService.downloadCsv();
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Reports">

            <div className="report-header">
                <h2>Vacations Report</h2>
                <p className="subtitle">Only vacations with at least one like are displayed</p>
            </div>

            <div className="report-chart-container">
                <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={report} margin={{ bottom: 20 }}>
                        <CartesianGrid />
                        <XAxis dataKey="destination" angle={-45} textAnchor="end" interval={0} height={140}>
                            <Label value="Destination" position="bottom" offset={0} style={{ fill: "#d4af37" }} />
                        </XAxis>
                        <YAxis allowDecimals={false}>
                            <Label value="Likes" angle={-90} position="insideLeft" style={{ fill: "#d4af37" }} />
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="likes" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <hr className="report-divider" />

            <div className="report-actions">
                <button onClick={download}>Download CSV</button>
            </div>

        </div>
    );
}