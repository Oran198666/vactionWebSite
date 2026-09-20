import "./filters.css";

type FiltersProps = {
    filter: string;
    onFilterChange: (filter: string) => void;
}

export function Filters(props: FiltersProps) {
    return (
        <div className="Filters">
            <button className={props.filter === "" ? "active" : ""}
                onClick={() => props.onFilterChange("")}> All
            </button>

            <button className={props.filter === "liked" ? "active" : ""}
                onClick={() => props.onFilterChange("liked")}> Liked
            </button>

            <button
                className={props.filter === "active" ? "active" : ""}
                onClick={() => props.onFilterChange("active")}> Active now
            </button>

            <button
                className={props.filter === "upcoming" ? "active" : ""}
                onClick={() => props.onFilterChange("upcoming")}> Not started
            </button>
        </div>
    );
}