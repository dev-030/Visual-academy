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
import AddClasses from './instructor/AddClass.jsx'
import MyClasses from './instructor/MyClasses.jsx'
import PaymentHistory from './student/PaymentHistory.jsx'


import CustomRoute from './authentication/CustomRoute.jsx'



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
            path:'/dashboard/student/enrolledclasses',
            element : <CustomRoute><Enrolledclasses/></CustomRoute>
          },
          {
            path : '/dashboard/student/selectedclasses',
            element: <CustomRoute><SelectedClasses/></CustomRoute>
          },
          {
            path : '/dashboard/student/payment',
            element: <CustomRoute><Payments/></CustomRoute>
          },
          {
            path : '/dashboard/student/paymenthistory',
            element: <PaymentHistory/>
          },
          {
            path : '/dashboard/admin/allusers',
            element: <CustomRoute><ManageUsers role={'admin'}/></CustomRoute>
          },
          {
            path : '/dashboard/admin/manageclasses',
            element: <CustomRoute><ManageClasses role={'admin'}/></CustomRoute>
          },
          {
            path : '/dashboard/instructor/addclass',
            element: <CustomRoute><AddClasses role={'instructor'}/></CustomRoute>
          },
          {
            path : '/dashboard/instructor/myclasses',
            element: <CustomRoute><MyClasses role={'instructor'}/></CustomRoute>
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
      },
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
