import App from "./components/App";
import AllItems from "./components/AllItems";
import ItemDetails from "./components/ItemDetails";
import ItemForm from "./components/ItemForm";
import UpdateItemForm from "./components/UpdateItemForm";
import CommentForm from "./components/CommentForm";

const routes = [
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <AllItems />
            },
            {
                path: "/newitem",
                element: <ItemForm />
            },
            {
                path: "/items/:id",
                element: <ItemDetails />
            },
            {
                path: "/newcomment/:itemId",
                element: <CommentForm />
            },
            {
                path: "/updateitem/:itemId",
                element: <UpdateItemForm />
            }
        ]
    }
];

export default routes;