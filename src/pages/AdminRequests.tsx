import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { db } from "@/lib/firebase";
  import { setDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

export default function AdminRequests() {

  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  if (!user) {
    return <div className="p-10">Loading...</div>;
  }

  if (user.email !== "voice2career@yahoo.com") {
    return <Navigate to="/app" />;
  }

  // 🔹 LOAD REQUESTS
  const loadRequests = async () => {
    try {

      const snap = await getDocs(collection(db, "subscriptionRequests"));

      const list: any[] = [];

      snap.forEach((docItem) => {
        list.push({
          id: docItem.id,
          ...docItem.data()
        });
      });

      setRequests(list);
      setLoading(false);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // 🔹 APPROVE USER

const approveUser = async (req: any) => {
  try {

    // 🔹 find user by email
    const userSnap = await getDocs(collection(db, "users"));

    let userDocId: string | null = null;

    userSnap.forEach((docItem) => {
      const data = docItem.data();

      if (data.email === req.email) {
        userDocId = docItem.id;
      }
    });

    if (!userDocId) {
      alert("User not found in users collection");
      return;
    }

    // 🔹 update user plan
    await updateDoc(doc(db, "users", userDocId), {
      plan: "Pro"
    });

    // 🔹 update request status
    await updateDoc(doc(db, "subscriptionRequests", req.id), {
      status: "approved"
    });

    alert("User upgraded to Pro");

    loadRequests();

  } catch (err) {
    console.error("APPROVE ERROR:", err);
  }
};

  // 🔹 REJECT USER
  const rejectUser = async (req: any) => {

    try {

      await updateDoc(doc(db, "subscriptionRequests", req.id), {
        status: "rejected"
      });

      alert("Request rejected");

      loadRequests();

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-3xl font-bold">
            Admin Panel
          </h1>
          <p className="text-gray-500">
            Manage subscription requests
          </p>
        </div>

        <button
          onClick={loadRequests}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Refresh
        </button>

      </div>


      {/* STATS CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">
            Total Requests
          </p>
          <p className="text-3xl font-bold">
            {requests.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">
            Pending
          </p>
          <p className="text-3xl font-bold text-yellow-600">
            {requests.filter(r => r.status === "pending").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">
            Approved
          </p>
          <p className="text-3xl font-bold text-green-600">
            {requests.filter(r => r.status === "approved").length}
          </p>
        </div>

      </div>


      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 border-b">
            <tr className="text-left text-gray-600">

              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>

            </tr>
          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan={5} className="text-center p-8 text-gray-400">
                  Loading requests...
                </td>
              </tr>
            )}

            {!loading && requests.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-8 text-gray-400">
                  No subscription requests found
                </td>
              </tr>
            )}

            {requests.map((req) => (

              <tr
                key={req.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-medium">
                  {req.name}
                </td>

                <td className="p-4 text-gray-600">
                  {req.email}
                </td>

                <td className="p-4">
                  {req.plan}
                </td>

                <td className="p-4">

                  {req.status === "pending" && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      Pending
                    </span>
                  )}

                  {req.status === "approved" && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Approved
                    </span>
                  )}

                  {req.status === "rejected" && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      Rejected
                    </span>
                  )}

                </td>

                <td className="p-4 flex gap-2">

                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => approveUser(req)}
                        className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectUser(req)}
                        className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
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