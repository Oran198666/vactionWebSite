import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mcpTools } from "./mcp-tools";
import z from "zod";

class McpRegister {

    public registerGetAllActiveVacationsTool(mcpServer: McpServer): void {
        const uniqueName = "get_active_vacations";
        const config = {
            description: "Vacations running right now: today is between the start and end dates."
        };
        mcpServer.registerTool(uniqueName,config, mcpTools.getAllActiveVacationsTool)
    }

    public registerGetAveragePriceTool(mcpServer: McpServer): void {
        const uniqueName = "get_average_price";
        const config = {
            description: "The average price of all vacations, as a single number."
        };
        mcpServer.registerTool(uniqueName,config, mcpTools.getAveragePriceTool);
    }

    public registerGetAllVacationsTool(mcpServer: McpServer): void {
        const uniqueName = "get_all_vacations";
        const config = {
            description: "Every vacation with destination, continent, description, dates and price. Use for anything the other tools do not cover."
        };
        mcpServer.registerTool(uniqueName,config, mcpTools.getAllVacationsTool);
    }

    public registerGetFutureVacationsByRegionTool(mcpServer: McpServer): void {
        const uniqueName = "get_future_vacations_by_region";
        const config = {
            description: "Vacations that have not started yet, filtered by continent. Region must be Europe, Asia, Africa or North America.",
            inputSchema: { region: z.string() }
        };
        mcpServer.registerTool(uniqueName,config, mcpTools.getFutureVacationsByRegionTool)
    }


}

export const mcpRegister = new McpRegister();