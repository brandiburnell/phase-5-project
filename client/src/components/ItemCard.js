import React from "react";
import "../components/styles/ItemCard.css"
import { useNavigate } from "react-router-dom";

function ItemCard({ name, image_url, id }) {
    const navigate = useNavigate();

    return (
        <div className="item-card" onClick={() => navigate(`/items/${id}`)}>
            <h3 className="name">{name}</h3>
            <img
                src={image_url}
                alt={`${name}`}
                className="item-image"
            />
        </div>
    );
}

export default ItemCard;