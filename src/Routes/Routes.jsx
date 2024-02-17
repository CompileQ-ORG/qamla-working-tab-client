import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret/Secret";
import EmployeeRoute from "./EmployeeRoute/EmployeeRoute";
import EmployeeTime from "../pages/ManageTimes/EmployeeTime/EmployeeTime";
import ManagerAcceptance from "../pages/ManageTimes/ManagerAcceptance/ManagerAcceptance";
import ManagerRoute from "./ManagerRoute/ManagerRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import AdminEye from "../pages/ManageTimes/AdminEye/AdminEye";
import EmployeeEndTime from "../pages/ManageTimes/EmployeeTime/EmployeeEndTime";
import EmployeeTotalTIme from "../pages/ManageTimes/EmployeeTime/EmployeeTotalTIme";
import EmployeesTimeList from "../pages/ManageTimes/ManagerAcceptance/EmployeesTimeList";
import EmployeeSingleProfile from "../pages/ManageTimes/AdminEye/EmployeeSingleProfile";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            },
            {
                path: '/worktab',
                element: <PrivateRoute><EmployeeRoute><EmployeeTime></EmployeeTime></EmployeeRoute></PrivateRoute>
            },
            {
                path: '/totaltime',
                element: <PrivateRoute><EmployeeRoute><EmployeeTotalTIme></EmployeeTotalTIme></EmployeeRoute></PrivateRoute>
            },
            {
                path: '/worktabend',
                element: <PrivateRoute><EmployeeRoute><EmployeeEndTime></EmployeeEndTime></EmployeeRoute></PrivateRoute>
            },
            {
                path: '/manageracceptance',
                element: <PrivateRoute><ManagerRoute><ManagerAcceptance></ManagerAcceptance></ManagerRoute></PrivateRoute>
            },
            {
                path: '/employeeworktimelist',
                element: <PrivateRoute><ManagerRoute><EmployeesTimeList></EmployeesTimeList></ManagerRoute></PrivateRoute>
            },
            {
                path: '/adminway',
                element: <PrivateRoute><AdminRoute><AdminEye></AdminEye></AdminRoute></PrivateRoute>
            },
            {
                path: '/profile/:id',
                element: <PrivateRoute><AdminRoute><EmployeeSingleProfile></EmployeeSingleProfile></AdminRoute></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_mainapi}/employeeprofile/${params.id}`)
            }
        ]
    },
]);