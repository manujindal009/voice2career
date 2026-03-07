import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const [users, setUsers] = useState(0);
  const [proUsers, setProUsers] = useState(0);
  const [requests, setRequests] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {

    // 🔹 REALTIME USERS
    const unsubscribeUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {

        let proCount = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();

          if (data.plan === "Pro") {
            proCount++;
          }
        });

        setUsers(snapshot.size);
        setProUsers(proCount);

      }
    );

    // 🔹 REALTIME REQUESTS
    const unsubscribeRequests = onSnapshot(
      collection(db, "subscriptionRequests"),
      (snapshot) => {

        const list: any[] = [];

        snapshot.forEach((docItem) => {
          list.push({
            id: docItem.id,
            ...docItem.data()
          });
        });

        setRequests(list);

      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribeRequests();
    };

  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-10">

  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Total Users</p>
    <p className="text-3xl font-bold">{users}</p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Pro Users</p>
    <p className="text-3xl font-bold text-purple-600">{proUsers}</p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Pending Requests</p>
    <p className="text-3xl font-bold text-yellow-600">
      {requests.filter(r => r.status === "pending").length}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Banned Users</p>
    <p className="text-3xl font-bold text-red-600">
      {requests.filter(r => r.banned === true).length}
    </p>
  </div>

</div>

      {/* QUICK ACTIONS */}
      <div className="flex gap-4 mb-10">

        <button
          onClick={() => navigate("/admin/requests")}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Manage Requests
        </button>

      </div>

      {/* RECENT REQUESTS */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-6 border-b font-semibold">
          Recent Subscription Requests
        </div>

        <table className="w-full">

          <thead className="bg-gray-100 text-left">

            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Status</th>
            </tr>

          </thead>

          <tbody>

            {requests.slice(0,5).map((req) => (

              <tr
                key={req.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {req.name}
                </td>

                <td className="p-4">
                  {req.email}
                </td>

                <td className="p-4">
                  {req.plan}
                </td>

                <td className="p-4">

                  {req.status === "pending" && (
                    <span className="text-yellow-600">
                      Pending
                    </span>
                  )}

                  {req.status === "approved" && (
                    <span className="text-green-600">
                      Approved
                    </span>
                  )}

                  {req.status === "rejected" && (
                    <span className="text-red-600">
                      Rejected
                    </span>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}