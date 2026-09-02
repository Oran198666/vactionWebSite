import dotenv from "dotenv";

dotenv.config({ quiet: true })

class AppConfig {
    public readonly environment = process.env.ENVIRONMENT!;
    public readonly mysqlPort = +(process.env.MYSQL_PORT!);
    public readonly mysqlHost = process.env.MYSQL_HOST!;
    public readonly mysqlUser = process.env.MYSQL_USER!;
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD!;
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE!;
    public readonly jwtSecret = process.env.JWT_SECRET!;
    public readonly hashSalt = process.env.HASH_SALT!;
    public readonly recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY!;
    public readonly openaiApiKey = process.env.OPENAI_API_KEY!;
    public readonly port = process.env.PORT!;
}
export const appConfig = new AppConfig();
