import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBars/Sidebar";
import Navbar from "../NavBar/NavBar";

const MasterLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // for mobile
  const [isCollapsed, setIsCollapse] = useState(false);    // for desktop collapse

  return (
    <div className="h-screen flex flex-col">
      {/* NAVBAR AT TOP */}
      <nav className="drop-shadow-xl">
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
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MasterLayout;
