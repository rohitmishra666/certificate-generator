import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Dashboard from './components/Dashboard.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PastCertificates from './components/PastCertificates.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: '/past',
        element: <PastCertificates />,
      }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
