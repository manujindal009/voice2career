import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

export default function AdminAnalytics(){

  const [users,setUsers] = useState<any[]>([]);

  useEffect(()=>{

    const unsub = onSnapshot(
      collection(db,"users"),
      (snapshot)=>{

        const list:any[] = [];

        snapshot.forEach((doc)=>{
          list.push({
            id:doc.id,
            ...doc.data()
          })
        });

        setUsers(list);

      }
    );

    return ()=>unsub();

  },[]);

  const totalUsers = users.length;

  const proUsers =
    users.filter(u=>u.plan==="Pro").length;

  const freeUsers =
    users.filter(u=>u.plan!=="Pro").length;

  const bannedUsers =
    users.filter(u=>u.banned).length;

  // NEW USERS TODAY

  const today = new Date().toDateString();

  const newToday =
    users.filter(u=>{

      if(!u.createdAt) return false;

      const d =
        new Date(
          u.createdAt.seconds * 1000
        ).toDateString();

      return d === today;

    }).length;

  // DAILY ACTIVE USERS

  const activeToday =
    users.filter(u=>{

      if(!u.lastLoginDate) return false;

      const d =
        new Date(
          u.lastLoginDate.seconds * 1000
        ).toDateString();

      return d === today;

    }).length;

  // USER GROWTH DATA

  const growthData = [
    {
      name:"Users",
      value:totalUsers
    },
    {
      name:"Pro",
      value:proUsers
    },
    {
      name:"Free",
      value:freeUsers
    },
    {
      name:"Banned",
      value:bannedUsers
    }
  ];

  const planData = [
    {name:"Pro",value:proUsers},
    {name:"Free",value:freeUsers}
  ];

  const COLORS = ["#7c3aed","#22c55e"];

  return(

    <div>

      <h1 className="text-3xl font-bold mb-10">
        Admin Analytics
      </h1>

      {/* STAT CARDS */}

      <div className="grid grid-cols-5 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Total Users
          </p>
          <p className="text-3xl font-bold">
            {totalUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Pro Users
          </p>
          <p className="text-3xl font-bold text-purple-600">
            {proUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Free Users
          </p>
          <p className="text-3xl font-bold text-green-600">
            {freeUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            New Users Today
          </p>
          <p className="text-3xl font-bold text-blue-600">
            {newToday}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Active Today
          </p>
          <p className="text-3xl font-bold text-orange-600">
            {activeToday}
          </p>
        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-2 gap-8">

        {/* BAR */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4">
            User Statistics
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={growthData}>

              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>

              <Bar
                dataKey="value"
                fill="#7c3aed"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* PIE */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4">
            Plan Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={planData}
                dataKey="value"
                outerRadius={110}
                label
              >

                {planData.map((entry,index)=>(
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );
}