import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { vacationsMcpServer } from "./mcp-server";

class McpClient {

    private client: Client;

    public async init(): Promise<void> {
        const mcpServer = vacationsMcpServer.create();
        const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

        this.client = new Client({ name: "vacations-mcp-client", version: "1.0.0" });
        await mcpServer.connect(serverTransport);
        await this.client.connect(clientTransport);

        console.log("MCP client connected");
    }

    public async listTools(): Promise<any[]> {
        const result = await this.client.listTools();
        return result.tools;
    }

    public async callTool(name: string, args: any): Promise<string> {
        const result: any = await this.client.callTool({name, arguments: args|| {} });
        return result.content.map((c: any)=>c.text).join("\n");
    }

}

export const mcpClient = new McpClient();