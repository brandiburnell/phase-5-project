import { Typography } from "@mui/material";
import React, {useEffect, useState} from "react";

function CommentCard({ itemId, description, subject, userId }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`/users/${userId}`)
            .then(r => r.json())
            .then(user => setUser(user))
            .catch(error => console.error(error));
    //eslint-disable-next-line
    }, [])

    return (
        <div className="comment">
            <Typography variant="body1" sx={{textDecoration: "underline"}}>{subject}</Typography>
            <Typography variant="body2" sx={{fontStyle: "italic"}}>by: {user.username}</Typography>
            <Typography variant="body1">{description}</Typography>
         </div>
    );
}

export default CommentCard;