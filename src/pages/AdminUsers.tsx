import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc
} from "firebase/firestore";

export default function AdminUsers() {

    const ADMIN_EMAIL = "voice2career@yahoo.com";
    const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {

        const list: any[] = [];

        snapshot.forEach((docItem) => {

  console.log("USER DATA:", docItem.data());

  list.push({
    id: docItem.id,
    ...docItem.data()
  });

});

        setUsers(list);

      }
    );

    return () => unsubscribe();

  }, []);

  // 🔹 BAN USER
  const banUser = async (user: any) => {

    await updateDoc(
      doc(db, "users", user.id),
      {
        banned: true
      }
    );

  };

  // 🔹 UNBAN USER
  const unbanUser = async (user: any) => {

    await updateDoc(
      doc(db, "users", user.id),
      {
        banned: false
      }
    );

  };

  // 🔹 MAKE PRO
  const makePro = async (user: any) => {

    await updateDoc(
      doc(db, "users", user.id),
      {
        plan: "Pro"
      }
    );

  };

  // 🔹 MAKE FREE
  const makeFree = async (user: any) => {

    await updateDoc(
      doc(db, "users", user.id),
      {
        plan: "Free"
      }
    );

  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        User Management
      </h1>
      <input
  placeholder="Search users by email..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border px-4 py-2 rounded mb-6 w-80"
/>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr className="text-left">

              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.filter(u => u.email.toLowerCase().includes(search.toLowerCase())).map((user) => (

              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {user.name || "-"}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.plan || "Free"}
                </td>

                <td className="p-4">

                  {user.banned ? (
                    <span className="text-red-600">
                      Banned
                    </span>
                  ) : (
                    <span className="text-green-600">
                      Active
                    </span>
                  )}

                </td>

                <td className="p-4 flex gap-2 flex-wrap">

                  {user.banned ? (

                    <button
                      onClick={() => unbanUser(user)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Unban
                    </button>

                  ) : (

                    <button
  disabled={user.email === ADMIN_EMAIL}
  onClick={() => banUser(user)}
  className={`px-3 py-1 rounded text-white
  ${user.email === ADMIN_EMAIL
    ? "bg-gray-400 cursor-not-allowed"
    : "bg-red-600 hover:bg-red-700"}
  `}
>
  Ban
</button>

                  )}

                  {user.plan !== "Pro" && (

                    <button
                      onClick={() => makePro(user)}
                      className="bg-purple-600 text-white px-3 py-1 rounded"
                    >
                      Make Pro
                    </button>

                  )}

                  {user.plan === "Pro" && (

                    <button
                      onClick={() => makeFree(user)}
                      className="bg-gray-600 text-white px-3 py-1 rounded"
                    >
                      Make Free
                    </button>

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