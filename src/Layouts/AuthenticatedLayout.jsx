import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuhtenticatedHeader from "../components/AuhtenticatedHeader";

const AuthenticatedLayout = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = user?.acessToken;

    if (!token) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <AuhtenticatedHeader />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthenticatedLayout;