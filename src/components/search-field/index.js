import React from "react";
import "./search-field.css";

const SearchField = ({
                         handleSearch,
                         searchValue = ""
                     }) => {

    return (
        <div className={"search-container"}>
            <input
                type={"text"}
                value={searchValue || ""}
                onChange={handleSearch}
                placeholder={"Search by title"}
            />
        </div>
    )
}

export default SearchField;
