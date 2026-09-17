import "./home.css";
import homePage from "../../../assets/images/homePage.jpg";

export function Home() {
    return (
        <div className="Home">
            <div>
                <h2>Welcome</h2>

                <p>
                    Browse the catalogue, mark the trips you like, and see what everyone
                    else is booking.
                </p>

                <h3>Ask the AI</h3>
                <p>
                    Type any destination and get a short, practical recommendation: what to
                    see, the best time to go, a rough daily budget, and one thing most
                    tourists miss.
                </p>

                <h3>Ask about our trips</h3>
                <p>
                    Ask a question in plain English and get a real answer from the catalogue
                    itself. How many vacations are running right now, what the average price
                    is, which upcoming trips are in Europe. The answers come from live
                    queries, not from a model guessing.
                </p>

            </div>
            <img src={homePage} alt="" />
        </div>
    );
}