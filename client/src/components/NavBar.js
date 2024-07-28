import React from "react";
import { NavLink } from "react-router-dom";
import "../components/styles/NavBar.css";
import { Typography } from "@mui/material";

function NavBar() {
    return (
        <nav>
            <NavLink
                to="/"
                className="nav-link"
            >
                <Typography variant="h6">home</Typography>
            </NavLink>
            <NavLink
                to="/schedule"
                className="nav-link"
            >
             <Typography variant="h6">view schedule</Typography>
            </NavLink>
            <NavLink
                to="/newitem"
                className="nav-link"
            >
             <Typography variant="h6">add gear</Typography>
            </NavLink>

        </nav>
    );
}

export default NavBar;