import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBars/Sidebar";
import Navbar from "../NavBar/NavBar";

const MasterLayout: React.FC = () => {
  const [isCollapsed, setIsCollapse] = React.useState(false);

  return (
    <>
    <Navbar />
    <div className="flex h-screen shadow-2xl">
      {/* Sidebar */}
      
     

      {/* Main Content Area */}
      <div className="flex  flex-1 shadow-md">
        {/* Navbar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapse={setIsCollapse} />
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
