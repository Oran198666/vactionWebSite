import axios from "axios";
import { appConfig } from "../utils/app-config";

class AiService {
    public async getRecommendation(destination: string): Promise<string> {
        const response = await axios.get<string>(appConfig.aiUrl(destination));
        return response.data;
    }

}

export const aiService = new AiService();