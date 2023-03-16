import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddJob from "../pages/AddJob";
import EditJob from "../pages/EditJob";
import Jobs from "../pages/Jobs";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Jobs></Jobs>
            },
            {
                path: '/addJob',
                element: <AddJob></AddJob>
            },
            {
                path: '/editJob/:id',
                element: <EditJob></EditJob>
            }
        ]
    }
])