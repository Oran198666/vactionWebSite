import z from "zod";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";

// Credentials Schema:
const CredentialsSchema = z.object({
    email: z.email("Please enter a valid email").max(100, "Email is too long"),
    password: z.string().min(4, "Password must be at least 4 characters").max(100, "Password is too long")
});

// Credentials Interface (I = Interface):
type ICredentialsModel = z.infer<typeof CredentialsSchema>;

export class CredentialsModel implements ICredentialsModel {

    public email: string;
    public password: string;

    public constructor(credential: CredentialsModel) {
        this.email = credential.email;
        this.password = credential.password;
    }

    public validate(): void {
        const result = CredentialsSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues[0].message;
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }
}
