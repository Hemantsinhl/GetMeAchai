"use client"

import React, { useState, useEffect } from "react"
import { fetchuser, updateProfile } from "@/actions/useractions"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Dashboard = () => {
  const [form, setform] = useState({})
  const router = useRouter()
  const { data: session } = useSession()


  useEffect(() => {
    
    if(!session){
      router.push('/login')
    }
    else{
      getData()
    }
  }, [router, session])
  

  const getData = async () => {
    let u = await fetchuser(session.user.name)
    setform(u)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setform((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    let a = await updateProfile(e, session.user.name)
    alert("Profile updated")
  }

  return (
    <div className="text-white flex justify-center px-6">
      {/* Container */}
      <div className="w-full max-w-xl rounded-xl p-6 shadow-lg">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-3">
           Welcome to your dashboard page
        </h1>

        {/* Form */}
        <form action={handleSubmit} className="space-y-3">

          {/* Name */}
          <div>
            <label className="block mb-1 text-xs">Name</label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="w-full p-1 text-sm rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-xs">Email</label>
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              className="w-full p-1 text-sm rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 text-xs">Username</label>
            <input
              type="text"
              name="username"
              value={form.username || ""}
              onChange={handleChange}
              className="w-full p-1 text-sm rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Public Picture */}
          <div>
            <label className="block mb-1 text-xs">Profile Picture URL</label>
            <input
              type="text"
              name="profilepic"
              value={form.profilepic || ""}
              onChange={handleChange}
              className="w-full p-1 text-sm rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Cover Picture */}
          <div>
            <label className="block mb-1 text-xs">Cover Picture URL</label>
            <input
              type="text"
              name="coverpic"
              value={form.coverpic || ""}
              onChange={handleChange}
              className="w-full p-1 text-sm rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Razorpay ID */}
          <div>
            <label className="block mb-1 text-xs">Razorpay Key ID</label>
            <input
              type="text"
              name="razorpayKey"
              value={form.razorpayKey || ""}
              onChange={handleChange}
              className="w-full p-1 text-sm rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Razorpay Secret */}
          <div>
            <label className="block mb-1 text-xs">Razorpay Key Secret</label>
            <input
              type="password"
              name="razorpaySecret"
              value={form.razorpaySecret || ""}
              onChange={handleChange}
              className="w-full p-1 text-sm rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Save */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 rounded-md mt-2 mb-0"
          >
            Save
          </button>

        </form>
      </div>
    </div>
  )
}

export default Dashboard

