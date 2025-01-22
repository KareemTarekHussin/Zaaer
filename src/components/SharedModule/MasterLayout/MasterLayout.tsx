import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBars/Sidebar";
import Navbar from "../NavBar/NavBar";

const MasterLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapse] = useState(false);
  return (
    <>
    <Navbar isCollapsed={isCollapsed}
        setIsCollapse={setIsCollapse}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}/>
    <div className="flex h-screen shadow-2xl">
      {/* Sidebar */}
      
     

      {/* Main Content Area */}
      <div className="flex  flex-1 shadow-md">
        {/* Navbar */}
        <Sidebar isCollapsed={isCollapsed}
          setIsCollapse={setIsCollapse}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}/>
        {/* Dynamic Page Content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  );
};

export default MasterLayout;