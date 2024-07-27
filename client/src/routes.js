import App from "./components/App";

const routes = [
    {
        path:"/",
        element: <App/>,
        children: [
            // {
            //     path: "/",
            //     element: <AllBooks />
            // },
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