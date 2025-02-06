import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBars/Sidebar";
import Navbar from "../NavBar/NavBar";

const MasterLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // for mobile
  const [isCollapsed, setIsCollapse] = useState(false);    // for desktop collapse
//to try a endpoint in phase 1 
// npm run dev
// check the mock-api folder
// try diffrent endpoints (json folders)
// example
// http://localhost:5173/dynamic/mega-page 

  return (
    <div className="h-screen flex flex-col select-none">
      {/* NAVBAR AT TOP */}
      <nav >
      <Navbar
        isCollapsed={isCollapsed}
        setIsCollapse={setIsCollapse}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      </nav>
     

      <div className="flex flex-1 overflow-hidden">
        {/* DESKTOP SIDEBAR (hidden on mobile, visible on lg screens) */}
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapse={setIsCollapse}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* MAIN CONTENT SCROLLABLE */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MasterLayout;
