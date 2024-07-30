import App from "./components/App";
import AllItems from "./components/AllItems";
import ItemDetails from "./components/ItemDetails";
import ItemForm from "./components/ItemForm";

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
            // {
            //     path: "/newreview/:bookID",
            //     element: <ReviewForm />
            // },
            // {
            //     path: "/updatebook/:bookID",
            //     element: <UpdateBookForm />
            // }
        ]
    }
];

export default routes;