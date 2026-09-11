import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { vacationsService } from "../services/vacations-service";

class McpTools {
    public async getAllActiveVacationsTool():Promise<CallToolResult>{
        console.log("using tool:getAllActiveVacationsTool");
        const vacations = await vacationsService.getAllActiveVacations();
        return {
            content:[{
                type:"text",
                text:JSON.stringify(vacations)
            }]
        };
    }

    public async getAveragePriceTool():Promise<CallToolResult>{
        console.log("using tool:getAveragePriceTool");
        const averagePrice = await vacationsService.getAveragePrice();
        return{
            content:[{
                type:"text",
                text:JSON.stringify(averagePrice)
            }]
        };
    }

    public async getAllVacationsTool():Promise<CallToolResult>{
        console.log("using tool:getAllVacationsSimple");
        const vacationsSimple = await vacationsService.getAllVacationsSimple();
        return{
            content:[{
                type:"text",
                text:JSON.stringify(vacationsSimple)
            }]
        };
    }

    public async getFutureVacationsByRegionTool(args: {region:string}):Promise<CallToolResult>{
        console.log("using tool:getFutureVacationsByRegion");
        const vacations = await vacationsService.getFutureVacationsByRegion(args.region);
        return{
            content:[{
                type:"text",
                text:JSON.stringify(vacations)
            }]
        };
    }

}

export const mcpTools = new McpTools();