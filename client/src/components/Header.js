import React from "react";
// import "../components/styles/Header.css"
import TerrainIcon from '@mui/icons-material/Terrain';
import { Typography } from "@mui/material";

function Header() {
    return (
        <div>
            <Typography variant="h1" sx={{display: "flex", justifyContent:"space-evenly", alignItems:"center"}}>GEAR<span><TerrainIcon sx={{fontSize: 150 }}/></span>BUCKET</Typography>
        </div>
    );
}

export default Header;