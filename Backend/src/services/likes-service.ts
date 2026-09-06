import { dal } from "../utils/dal";

class LikesService {

    public async addLike(userId: number, vacationId: number): Promise<void>{
        const sql = `INSERT INTO likes (userId, vacationId) VALUES (?, ?)
        ON DUPLICATE KEY UPDATE userId = userId`;
        await dal.execute(sql, [userId,vacationId]);
    }

    public async removeLike(userId: number, vacationId: number): Promise<void>{
        const sql = "DELETE FROM likes WHERE userId = ? AND vacationId = ?";
        await dal.execute(sql, [userId, vacationId]);
    }
}
export const likesService = new LikesService();
