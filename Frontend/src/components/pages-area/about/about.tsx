import "./about.css";

export function About() {
    return (
        <div className="About">

            <h2>About this system</h2>

            <p>
                A vacation catalogue where registered users browse trips, mark the ones
                they like, and see how many other people liked each one. Vacations can be
                filtered by the ones you liked, the ones running now, and the ones that
                have not started yet, nine per page.
            </p>

            <p>
                An administrator manages the catalogue: adding, editing and deleting
                vacations with their images, viewing a chart of likes per destination,
                and downloading that data as a CSV file.
            </p>

            <p>
                Two extra pages use AI. One returns a travel recommendation for any
                destination you type. The other answers plain-English questions about the
                data itself, through an MCP server built into the backend that runs the
                queries and returns real results rather than invented ones.
            </p>

            <h3>Built with</h3>

            <p>
                MySQL, Node.js and Express in TypeScript on the server, React and Redux
                Toolkit in TypeScript on the client, packaged with Docker.
            </p>

            <h3>Developer</h3>
            <p>Oran Sasson</p>
            <p>oran86@gmail.com</p>

        </div>
    );
}