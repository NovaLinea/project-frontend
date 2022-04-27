import Popular from "../pages/Popular"
import Messages from "../pages/Messages"
import Profile from "../pages/Profile"
import Home from "../pages/Home"
import Subs from "../pages/Subs"
import Favorite from "../pages/Favorite"
import Settings from "../pages/Settings"
import Project from "../pages/Project"


export const privateRoutes = [
    {path: '/', element: Popular},
    {path: '/popular', element: Popular},
    {path: '/messages', element: Messages},
    {path: '/profile/:userID', element: Profile},
    {path: '/project/:projectID', element: Project},
    {path: '/home', element: Home},
    {path: '/subs', element: Subs},
    {path: '/favorite', element: Favorite},
    {path: '/settings', element: Settings},
]

export const publicRoutes = [
    {path: '/', element: Popular},
    {path: '/popular', element: Popular},
    {path: '/subs', element: Subs},
    {path: '/profile/:userID', element: Profile},
    {path: '/project/:projectID', element: Project},
]