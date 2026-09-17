import "./copyrights.css";

export function Copyrights() {
    return (
        <div className="Copyrights">
            <span>&copy; {new Date().toLocaleDateString("en-GB")} MYvacations</span>
        </div>
    );
}