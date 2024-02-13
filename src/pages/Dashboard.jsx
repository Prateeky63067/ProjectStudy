import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { IoMdChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom";

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
        <div className="flex justify-end sticky bottom-3 mr-4 hover:cursor-pointer">
        <Link to="dashboard/chat">
         <IoMdChatbubbles  className="text-blue-5 text-5xl "/>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
