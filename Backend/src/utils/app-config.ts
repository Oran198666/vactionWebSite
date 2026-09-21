import dotenv from "dotenv";

dotenv.config({ quiet: true })

class AppConfig {
    public readonly environment = process.env.ENVIRONMENT!;
    public readonly isDevelopment = this.environment === "development";
    public readonly isProduction = this.environment === "production";
    public readonly mysqlPort = +(process.env.MYSQL_PORT!);
    public readonly mysqlHost = process.env.MYSQL_HOST!;
    public readonly mysqlUser = process.env.MYSQL_USER!;
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD!;
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE!;
    public readonly jwtSecret = process.env.JWT_SECRET!;
    public readonly hashSalt = process.env.HASH_SALT!;
    public readonly openaiApiKey = process.env.OPENAI_API_KEY!;
    public readonly openaiModel = process.env.OPENAI_MODEL!;
    public readonly port = process.env.PORT!;
}
export const appConfig = new AppConfig();
