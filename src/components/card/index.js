import React from "react";
import Thumbnail from "../thumbnail";
import "./card.css";

const Card = ({
                  item = {}
              }) => {
    return (
        <a href={item?.url} target={"_blank"} rel={"noopener noreferrer"}>
            <div className={"card-body"}>
                <Thumbnail
                    src={item?.["thumbnailUrl"]}
                    title={item?.title || ""}
                />
                <h2 className={"card-title"} title={item?.title || ""}>
                    {item?.title || ""}
                </h2>
            </div>
        </a>
    )
}

export default Card;

