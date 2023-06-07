import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './Navbar/Navbar.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFoundPage from './NotFoundPage.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Instructors from './Instructors.jsx'
import Classes from './Classes.jsx'
import StudentDashboard from './Dashboard/StudentDashboard.jsx'
import AuthProvider from './authentication/AuthProvider.jsx'
import { Scrollbars } from 'rc-scrollbars';
import PrivateRoute from './authentication/PrivateRoute.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import Enrolledclasses from './student/EnrolledClasses.jsx'
import SelectedClasses from './student/SelectedClasses.jsx'
import Payments from './student/Payments.jsx'


import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import ManageUsers from './admin/ManageUsers.jsx'
import ManageClasses from './admin/ManageClasses.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    children : [
      {
        path : '/' ,
        element : <App/>
      },
      {
        path : 'instructors',
        element : <Instructors/>
      },
      {
        path : 'classes' ,
        element : <Classes/>
      },
      {
        path : 'dashboard' ,
        element : <PrivateRoute><Dashboard/></PrivateRoute>,
        children : [
          {
            path:'/dashboard/enrolledclasses',
            element : <Enrolledclasses/>
          },
          {
            path : '/dashboard/selectedclasses',
            element: <SelectedClasses/>
          },
          {
            path : '/dashboard/payments',
            element: <Payments/>
          },
          {
            path : '/dashboard/allusers',
            element: <ManageUsers/>
          },
          {
            path : '/dashboard/manageclasses',
            element: <ManageClasses/>
          }
        ]
      },
      {
        path : '/register' ,
        element : <Register/>
      },
      {
        path : '/login' ,
        element : <Login/>
      }
    ]
  },
  {
    path :"*" ,
    element : < NotFoundPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Scrollbars style={{ width:'100%', height: '100vh' }} autoHide>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </Scrollbars>
  </React.StrictMode>
)
