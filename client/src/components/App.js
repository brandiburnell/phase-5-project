import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import { Typography } from "@mui/material";


function App() {
    const [items, setItems] = useState([]);
    const location = useLocation();

    // useEffect to get all items
    useEffect(() => {
        fetch('http://localhost:5555/items')
            .then(r => r.json())
            .then(items => setItems(items))
    }, [location.key]);

    return (
        <div className="body">
            <Header />
            <NavBar />
            <Outlet context={[items, setItems]} />
        </div>
    );
}

export default App;
