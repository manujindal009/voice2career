import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <AdminTopbar />

        <div className="p-8 overflow-y-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
}