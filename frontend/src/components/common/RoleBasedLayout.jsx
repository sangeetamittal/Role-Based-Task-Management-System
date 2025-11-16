import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import AdminLayout from "../../layouts/AdminLayout";
import ManagerLayout from "../../layouts/ManagerLayout";
import UserLayout from "../../layouts/UserLayout";

const RoleBasedLayout = () => {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    if (user.role === "Admin") {
        return (
            <AdminLayout>
                <Outlet />
            </AdminLayout>
        );
    }

    if (user.role === "Manager") {
        return (
            <ManagerLayout>
                <Outlet />
            </ManagerLayout>
        );
    }

    return (
        <UserLayout>
            <Outlet />
        </UserLayout>
    );
};


export default RoleBasedLayout;
