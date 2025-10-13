import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";

export default function Root() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto flex gap-6 px-4 py-6">
            <Sidebar />
            <main className="flex-1">
                <Outlet />
            </main>
            {/* <RightSidebar /> */}
            <div className="w-72"></div>
            </div>                                                          
        </div>

    )
}