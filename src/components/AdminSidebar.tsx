import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  return (

    <div className="w-64 bg-gray-900 text-white flex flex-col p-6">

      <h1 className="text-2xl font-bold mb-10">
        Voice2Career
      </h1>


    <button
  onClick={() => navigate("/admin")}
  className="text-left mb-4 hover:text-purple-400"
>
  Dashboard
</button>

      <button
        onClick={() => navigate("/admin/requests")}
        className={`text-left mb-4 px-3 py-2 rounded ${
          location.pathname === "/admin/requests"
            ? "bg-purple-600"
            : "hover:text-purple-400"
        }`}
      >
        Subscription Requests
      </button>

        <button
        onClick={() => navigate("/admin/analytics")}
        className={`text-left mb-4 px-3 py-2 rounded ${
          location.pathname === "/admin/analytics"
            ? "bg-purple-600"
            : "hover:text-purple-400"
        }`}
      >
        Analytics
      </button>

      <button
        onClick={() => navigate("/admin/users")}
        className={`text-left mb-4 px-3 py-2 rounded ${
          location.pathname === "/admin/users"
            ? "bg-purple-600"
            : "hover:text-purple-400"
        }`}
      >
        Users
      </button>

      <button
        onClick={() => navigate("/app")}
        className="mt-auto bg-red-500 px-4 py-2 rounded-lg"
      >
        Exit Admin
      </button>

    </div>
  );
}