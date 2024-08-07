import { Typography } from "@mui/material";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
import '../components/styles/ItemDetails.css'
import CommentCard from "./CommentCard";

function ItemDetails() {
    const [item, setItem] = useState({});
    const params = useParams();
    const itemId = params.id;
    const navigate = useNavigate();
    const [items, setItems] = useOutletContext();
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        fetch(`/items/${itemId}`)
            .then(r => r.json())
            .then(item => setItem(item))
            .catch(error => console.error(error));
    //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (refreshPage) {
            navigate('/');
        }
    // eslint-disable-next-line
    }, [refreshPage])

    // FIND WAY TO GET USER NAME FROM USER FETCH 

    // useEffect(() => {
    //     fetch(`/users/${item.owner_id}`)
    //         .then(r => r.json())
    //         .then(user => setUser(user))
    //         .catch(error => console.error(error));
    // //eslint-disable-next-line
    // }, [item])

    function handleDelete() {
        if (window.confirm("are you sure you want to delete this item?")) {
            fetch(`/items/${itemId}`, {
                method: "DELETE",
            })
                .then(() => {
                    const newItems = items.filter((item) => item.id !== itemId);
                    setItems(newItems); 
                    window.alert(`${item.name} has been removed from the gear bucket`)
                    setRefreshPage(!refreshPage);
                });
        }
    }

    if (!item.name) {
        return <h1>loading...</h1>;
    };

    const itemComments = item.comments.map(comment => {
        return (
            <CommentCard
                itemId={itemId}
                description={comment.description}
                subject={comment.subject}
                userId={comment.user_id}
                key={comment.id}
            />
        );
    });

    return (
        <div className="item-details-container">
            <Typography variant="h2">gear details</Typography>
            <div className="item">
                <div className="item-details">
                    <img
                        className="item-detail-image"
                        src={item.image_url}
                        alt={`${item.name}`}
                        style={{width: "500px", height: "500px", objectFit: "cover", padding: "5%", borderRadius: "80px"}}
                    >
                    </img>
                    <div className="item-attributes"> 
                        <p className="attribute-label">name: </p>
                        <p className="item-attribute">{item.name}</p>
                        <p className="attribute-label">description: </p>
                        <p className="item-attribute">{item.description}</p>
                        <p className="attribute-label">year purchased: </p>
                        <p className="item-attribute">{item.year_purchased}</p>
                        <p className="attribute-label">item owner: </p>
                        <p className="item-attribute">{item.owner_id}</p>
                        <p className="attribute-label">item actions: </p>
                        <button className="delete-button" onClick={() => navigate(`/updateitem/${itemId}`)} style={{backgroundColor: "grey" , marginBottom: '10px'}}>update item</button>
                        <button className="delete-button" onClick={handleDelete}>delete item</button>
                    </div>
                </div>
                <div className="comment-container">
                    <div className="comment-heading">
                        <Typography variant="h4">comments</Typography>
                        <button className="add-comment" onClick={() => navigate(`/newcomment/${itemId}`)}><Typography variant="h4">add a comment</Typography></button>
                    </div>
                    {itemComments.length === 0? <div className="comment" style={{justifyItems: "center"}}>no comments yet</div> : itemComments}
                </div>
            </div>
        </div>
    );
}

export default ItemDetails;