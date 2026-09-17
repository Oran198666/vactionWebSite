import "./filters.css";

type FiltersProps = {
    filter: string;
    onFilterChange: (filter: string) => void;
}

export function Filters(props: FiltersProps) {
    return (
        <div className="Filters">
            <button onClick={()=>props.onFilterChange("")}>All</button>
            <button onClick={()=>props.onFilterChange("liked")}>All</button>
            <button onClick={()=>props.onFilterChange("active")}>All</button>
            <button onClick={()=>props.onFilterChange("upcoming")}>All</button>
        </div>
    );
}