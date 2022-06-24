import React from "react";
import "./thumbnail.css"

const Thumbnail = ({
                       src = "",
                       title = ""
                   }) => {
    return (
        <div className={"thumbnail-container"}>
            <img src={src} alt={title}/>
        </div>
    )
}
export default Thumbnail;
