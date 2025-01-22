import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({
  isCollapsed,
  setIsCollapse,
  isSidebarOpen,
  setSidebarOpen,
}: {
  isCollapsed: boolean;
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Reports", path: "/reports" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } hidden lg:block bg-white  h-full transition-all duration-300 drop-shadow-xl`}
      >
       
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
        <button
          onClick={() => setIsCollapse(!isCollapsed)}
          className="w-full p-2  rounded hover:bg-gray-300 border-black"
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative w-64 bg-white h-full">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <ul className="p-4 space-y-2">
              {menuItems.map((menuItem, index) => (
                <li key={index}>
                  <Link
                    to={menuItem.path}
                    className="block py-2 px-4 rounded hover:bg-gray-200"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {menuItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
