import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ProtectedAuthLayout from "@/layouts/ProtectedAuthLayout";
import CreateAssignment from "@/pages/CreateAssignment";
import PrivateLayout from "@/layouts/PrivateLayout";
import UpdateAssignment from "@/pages/UpdateAssignment";
import Assignments from "@/pages/Assignments";
import AssignmentDetailsPage from "@/pages/AssignmentDetailsPage";
import PendingAssignmentPage from "@/pages/PendingAssignmentPage";
import AttemptedAssignmentsPage from "@/pages/AttemptedAssignmentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <PrivateLayout />,
        children: [
          { path: "/create-assignment", element: <CreateAssignment /> },
          { path: "/assignments", element: <Assignments /> },
          { path: "/pending-assignments", element: <PendingAssignmentPage /> },
          { path: "/my-assignments", element: <AttemptedAssignmentsPage /> },
          { path: "/assignment/:id", element: <AssignmentDetailsPage /> },
          { path: "/update-assignment/:id", element: <UpdateAssignment /> },
        ],
      },
      {
        element: <ProtectedAuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
