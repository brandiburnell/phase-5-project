import React from "react";
import "../components/styles/ItemCard.css"
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

function ItemCard({ name, image_url, id }) {
    const navigate = useNavigate();

    return (
        <div className="item-card" onClick={() => navigate(`/items/${id}`)}>
            <Typography variant="h5" sx={{color: "white"}}>{name}</Typography>
            <img
                src={image_url}
                alt={`${name}`}
                className="item-image"
            />
        </div>
    );
}

export default ItemCard;