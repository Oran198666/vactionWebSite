import z from "zod";
import { UploadedFile } from "express-fileupload";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";

// Vacation Schema - matches the DB columns:
export const VacationSchema = z.object({
    vacationId: z.number().int().positive().optional(),
    destination: z.string().min(2).max(100),
    continent: z.string().min(2).max(30),
    description: z.string().min(2).max(1000),
    startDate: z.string(),
    endDate: z.string(),
    price: z.number().min(0).max(10000),
    imageName: z.string().max(255).optional()
});

// Vacation Interface:
export type IVacationModel = z.infer<typeof VacationSchema>;

// Vacation Model:
export class VacationModel implements IVacationModel {
    public vacationId?: number;
    public destination: string;
    public continent: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName?: string;

    // Not DB columns:
    public image?: UploadedFile;   // Uploaded img
    public likesCount?: number;    // query count
    public isLiked?: number;       // 1(like) or 0

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.continent = vacation.continent;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.likesCount = vacation.likesCount;
        this.isLiked = vacation.isLiked;
    }

    public validate(): void {
        const result = VacationSchema.safeParse(this);
        if (!result.success) {
            const issue = result.error.issues[0];
            const message = `${issue.path.join(".")}: ${issue.message}`;
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }
}