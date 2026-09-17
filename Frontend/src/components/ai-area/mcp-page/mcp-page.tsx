import { useState } from "react";
import "./mcp-page.css";
import { notify } from "../../../utils/notify";
import { Spinner } from "../../shared-area/spinner/spinner";
import { mcpService } from "../../../services/mcp-service-front";
import ReactMarkdown from "react-markdown";

export function McpPage() {

    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function send(args: React.FormEvent<HTMLFormElement>) {
        try {
            args.preventDefault();
            setLoading(true);
            setAnswer("");
            const answer = await mcpService.ask(question);
            setAnswer(answer)
        }
        catch (err: any) {
            notify.error(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="McpPage">

            <h2>Ask about our trips</h2>
            <p>Ask a question in plain English — prices, dates, destinations, anything in the catalogue.</p>

            <form onSubmit={send}>
                <input type="text" value={question} onChange={args => setQuestion(args.target.value)} required />
                <button>Ask</button>
            </form>

            {loading && <Spinner />}

            {answer && <div className="Answer"><ReactMarkdown>{answer}</ReactMarkdown></div>}        </div>
    );
}
