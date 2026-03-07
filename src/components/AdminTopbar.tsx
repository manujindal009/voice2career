import { useAuth } from "@/context/AuthContext";

export default function AdminTopbar() {

  const { user } = useAuth();

  return (

    <div className="bg-white shadow flex justify-between items-center px-8 py-4">

      <h2 className="text-xl font-semibold">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <span className="text-gray-600">
          {user?.email}
        </span>

        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>

      </div>

    </div>

  );
}