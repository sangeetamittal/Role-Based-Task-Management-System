import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/login/Login";
import Signup from "../pages/Auth/signup/Signup";

import RoleBasedLayout from "../components/common/RoleBasedLayout";

import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ManagerDashboard from "../pages/Dashboard/ManagerDashboard";
import UserDashboard from "../pages/Dashboard/userDashboard";

import TaskList from "../pages/Tasks/TaskList";
import TaskCreate from "../pages/Tasks/TaskCreate";
import TaskEdit from "../pages/Tasks/TaskEdit";

import UserManagement from "../pages/Users/UserManagement";
import TaskCalendar from "../pages/calendar/TaskCalendar";

import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleRedirect from "../components/common/RoleRedirect";

import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleRedirect />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          element={
            <ProtectedRoute roles={["Admin", "Manager", "User"]}>
              <RoleBasedLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/dashboard"
            element={
              <ProtectedRoute roles={["Manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute roles={["User"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute roles={["Admin", "Manager", "User"]}>
                <TaskList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks/create"
            element={
              <ProtectedRoute roles={["Admin", "Manager"]}>
                <TaskCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks/edit/:id"
            element={
              <ProtectedRoute roles={["Admin", "Manager", "User"]}>
                <TaskEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute roles={["Admin", "Manager"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute roles={["Admin", "Manager", "User"]}>
                <TaskCalendar />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
