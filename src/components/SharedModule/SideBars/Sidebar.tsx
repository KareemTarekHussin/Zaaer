import { ArrowDownLeftIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isCollapsed, setIsCollapse }: { 
  isCollapsed: boolean; 
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>; 
}) => {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Reports", path: "/reports" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white border-r h-full transition-all duration-300`}
    >
      <button
        onClick={() => setIsCollapse(!isCollapsed)}
        className="p-2 m-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        {isCollapsed ? <ArrowLeftIcon/>: "Collapse"}
      </button>
      <ul className="p-4 space-y-2">
        {menuItems.map((menuItem, index) => (
          <li key={index}>
            <Link
              to={menuItem.path}
              className="block py-2 px-4 rounded hover:bg-gray-200"
            >
              {menuItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;