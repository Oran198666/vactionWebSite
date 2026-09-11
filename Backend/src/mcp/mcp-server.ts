import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mcpRegister } from "./mcp-register";

class VacationsMcpServer {

    public create(): McpServer{
        const mcpServer = new McpServer({
            name: "vacations-mcp-server",
            version: "1.0.0"
        });

        mcpRegister.registerGetAllActiveVacationsTool(mcpServer);
        mcpRegister.registerGetAveragePriceTool(mcpServer);
        mcpRegister.registerGetAllVacationsTool(mcpServer);
        mcpRegister.registerGetFutureVacationsByRegionTool(mcpServer);

        console.log("4 tools were registered");
        return mcpServer
    }
}

export const vacationsMcpServer = new VacationsMcpServer();