import axios from "axios";
import { appConfig } from "../utils/app-config";

class McpService {
    public async ask(question: string): Promise<string> {
    const response = await axios.post<{ answer: string }>(appConfig.mcpUrl, { question });
        return response.data.answer;
    }
}

export const mcpService = new McpService();