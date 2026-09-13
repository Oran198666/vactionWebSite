
class AppConfig {
    private readonly baseUrl = import.meta.env.VITE_API_URL;

    public readonly registerUrl = this.baseUrl + "register";
    public readonly vacationUrl = (id: number) => this.baseUrl + "vacations/" + id;
    public readonly loginUrl = this.baseUrl + "login";
    public readonly vacationsUrl = this.baseUrl + "vacations";
    public readonly imageUrl = (name: string) => this.baseUrl + "vacations/images/" + name;
    public readonly likeUrl = (id: number) => this.baseUrl + "vacations/" + id + "/like";
    public readonly reportUrl = this.baseUrl + "reports/likes";
    public readonly csvUrl = this.baseUrl + "reports/csv";
    public readonly aiUrl = (destination: string) => this.baseUrl + "ai/recommendation/" + encodeURIComponent(destination);
    public readonly mcpUrl = this.baseUrl + "mcp";
}

export const appConfig = new AppConfig();