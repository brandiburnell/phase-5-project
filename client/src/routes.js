import App from "./components/App";
import AllItems from "./components/AllItems";

const routes = [
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <AllItems />
            }
            // {
            //     path: "/newbook",
            //     element: <BookForm />
            // },
            // {
            //     path: "/books/:id",
            //     element: <BookDetails />
            // },
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