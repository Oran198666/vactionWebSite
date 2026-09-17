import {  useState } from "react";
import "./ai-page.css";
import { notify } from "../../../utils/notify";
import { Spinner } from "../../shared-area/spinner/spinner";
import ReactMarkdown from "react-markdown";
import { aiService } from "../../../services/ai-service-front";

export function AiPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>("");
    const [destination, setDestination] = useState<string>("");

    async function send(args: React.FormEvent<HTMLFormElement>) {
        try {
            args.preventDefault();
            setLoading(true);
            setAnswer("");
            const answer = await aiService.getRecommendation(destination);
            setAnswer(answer);
        } catch (err: any) {
            notify.error(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="AiPage">
            <h2>AI recommendation</h2>
            <p>Type a destination and get a short travel recommendation.</p>

            <form onSubmit={send}>
                <input type="text" value={destination} onChange={args => setDestination(args.target.value)} required />
                <button>Ask</button>
            </form>

            {loading && <Spinner />}
            {answer && <div className="Answer"><ReactMarkdown>{answer}</ReactMarkdown></div>}
        </div>
    );
}
