import loading from "../../../assets/images/loading.gif";
import "./spinner.css";

export function Spinner() {
    return (
        <div className="Spinner">
            <img src={loading} alt="Loading..." />
        </div>
    );
}