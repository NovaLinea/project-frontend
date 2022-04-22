import Popular from "../pages/Popular"
import New from "../pages/New"
import Categories from "../pages/Categories"
import Profile from "../pages/Profile"
import Home from "../pages/Home"
import Subs from "../pages/Subs"
import Favorite from "../pages/Favorite"
import Settings from "../pages/Settings"
import Project from "../pages/Project"


export const privateRoutes = [
    {path: '/', element: Popular},
    {path: '/popular', element: Popular},
    {path: '/new', element: New},
    {path: '/categories', element: Categories},
    {path: '/:userID', element: Profile},
    {path: '/:userID/:projectID', element: Project},
    {path: '/home', element: Home},
    {path: '/subs', element: Subs},
    {path: '/favorite', element: Favorite},
    {path: '/settings', element: Settings},
]

export const publicRoutes = [
    {path: '/', element: Popular},
    {path: '/popular', element: Popular},
    {path: '/new', element: New},
    {path: '/categories', element: Categories},
    {path: '/:userID', element: Profile},
    {path: '/:userID/:projectID', element: Project},
]