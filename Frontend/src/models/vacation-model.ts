import { Continent } from "./continent"

export type VacationModel = {
    vacationId?: number
    destination: Continent
    continent: string
    description: string
    startDate: string
    endDate: string
    price: number
    imageName?: string
    image?: FileList     // from the file input, not in the DB
    likesCount?: number  // from query
    isLiked?: number     // 1 or 0, from query
}