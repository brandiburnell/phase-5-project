import React from "react";
import ItemCard from "./ItemCard";
import { useOutletContext } from "react-router-dom";
import "../components/styles/AllItems.css"

function AllItems() {
    const [items] = useOutletContext();

    const itemsToDisplay = items.map((item) => {
        return (
            <ItemCard
                name={item.name}
                image_url={item.image_url}
                key={item.id}
                id={item.id}
            />
        );
    });

    return (
        <div className="item-container">
            {itemsToDisplay}
        </div>
    );
}

export default AllItems;