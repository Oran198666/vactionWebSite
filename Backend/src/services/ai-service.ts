import OpenAI from "openai";
import { appConfig } from "../utils/app-config";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";

class AiService {
    private readonly openai = new OpenAI({ apiKey: appConfig.openaiApiKey });

    public getRecommendation = async (destination: string): Promise<string> => {
        //token waste prevention
        if(destination.length > 100) throw new ClientError(StatusCode.UnprocessableContent,"Destination is too long")
        const response = await this.openai.chat.completions.create({
            model: appConfig.openaiModel,
            messages: [
                {
                    role: "system", content: `You are a travel advisor. For the destination given,
                    reply with: two or three sites worth seeing, the best months to visit, a rough estimate daily budget,
                    and one tip a tourist would not know. Plain prose, no lists, under 120 words.
                    If the destination is not a real place, say so in one sentence.`},
                { role: "user", content: destination }
            ],
            max_tokens: 250
        });
        return response.choices[0].message.content ?? "";
    };
}

export const aiService = new AiService();