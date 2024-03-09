import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Chat_page from './components/Chat_page.jsx'

const routes = createBrowserRouter([
    {path: "/", element: <App/>, children: [
        {path: "/login", element: <Login/>},
        {path: "/register", element: <Register/>},
        {path: "/Chat", element: <Chat_page/>}
    ]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={routes}/>
)