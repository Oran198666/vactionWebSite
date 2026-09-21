import OpenAI from "openai";
import { appConfig } from "../utils/app-config";
import { mcpClient } from "../mcp/mcp-client";


class McpService {
    private readonly openai = new OpenAI({ apiKey: appConfig.openaiApiKey });

    public ask = async (question: string): Promise<string> => {
        // Take the tools from the MCP server and convert them to OpenAI's format:
        const tools = (await mcpClient.listTools()).map(t => ({
            type: "function" as const,
            function: {
                name: t.name,
                description: t.description,
                parameters: t.inputSchema
            }
        }));
        const messages: any[] = [
            { role: "system", content: `Today is ${new Date().toLocaleDateString("en-CA")}. You answer questions about a vacations database. Use the tools to get real data - never invent numbers. For a count or an average, answer in one sentence. For a list, use a markdown bullet list with one vacation per line, sorted by start date, in the form: Destination - start date to end date - price$. All prices are in US dollars. Write all dates as DD.MM.YYYY. No table.` },
            { role: "user", content: question }
        ];

        //safety cap - 5
        for (let i = 0; i < 5; i++) {
            const response = await this.openai.chat.completions.create({
                model: appConfig.openaiModel,
                messages,
                tools
            });

            const choice = response.choices[0].message;


            //No tools requested means the model is giving the final answer
            if (!choice.tool_calls?.length) return choice.content ?? "";

            messages.push(choice);

            for (const call of choice.tool_calls) {
                const args = JSON.parse((call as any).function.arguments || "{}");
                const result = await mcpClient.callTool((call as any).function.name, args); messages.push({
                    role: "tool",
                    tool_call_id: call.id,
                    content: result
                });
            }
        }
        return "Couldn't answer within the tool call limit."
    }
}

export const mcpService = new McpService();