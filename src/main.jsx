import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import MyTickets from './Pages/MyTickets.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/ucuslarim',
                element: <MyTickets />
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
