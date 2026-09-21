import "./copyrights.css";

export function Copyrights() {
    return (
        <div className="Copyrights">
            <span>A student project. Vacations, prices and images are fictional and not offered for sale.</span>
            <span>&copy; {new Date().getFullYear()} Oran Sasson</span>
        </div>
    );
}