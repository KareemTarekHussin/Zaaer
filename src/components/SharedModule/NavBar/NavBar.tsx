// Full Navbar with Two Distinct Sections and Sticky Mobile Footer

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, ChevronDownIcon, PlusIcon, BellIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import Sidebar from "../SideBars/Sidebar"; // Assuming your Sidebar component is here
import logo from "../../../assets/Images/icons/sidebar-full.svg"
const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const [tibaDropdownOpen, setTibaDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapse] = useState(false);   // Desktop sidebar collapse
  const modules = [
    { name: "Admin", href: "/admin" },
    { name: "Reservations", href: "/reservations" },
    { name: "HRMS", href: "/hrms" },
    { name: "Housekeeping", href: "/housekeeping" },
    { name: "Outlets", href: "/outlets" },
    { name: "Finance", href: "/finance" },
    { name: "Reports", href: "/reports" },
  ];

  const visibleModules = modules.slice(0, 4);
  const hiddenModules = modules.slice(4);

  const createNewOptions = [
    { label: "New Booking", action: () => alert("New Booking") },
    { label: "New Report", action: () => alert("New Report") },
  ];

  return (
    <>
      {/* Main Navbar */}
      <header className="bg-white  sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Left Section: Logo & Sidebar Toggle */}
            <div className="flex items-center gap-x-4">
              <button
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <Link to="/" className="hidden lg:flex items-center gap-x-2">
                <img src={logo} alt="ZAAER PMS" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-x-4">
              {/* Create New Button */}
              <div className="relative">
                <button
                  className="hidden lg:inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
                >
                  <PlusIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <span>Create New</span>
                  <ChevronDownIcon
                    className="ml-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
                <button
                  className="lg:hidden inline-flex items-center justify-center rounded-md bg-white px-2 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
                >
                  <PlusIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <ChevronDownIcon
                    className="ml-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
                {createDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {createNewOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={option.action}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-full text-gray-500 hover:text-gray-700">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
                  99+
                </span>
              </button>

              {/* Tiba International Dropdown */}
              <div className="relative">
                <button
                  className="hidden lg:inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => setTibaDropdownOpen(!tibaDropdownOpen)}
                >
                  <span>Tiba International</span>
                  <BuildingOfficeIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
                <button
                  className="lg:hidden inline-flex items-center justify-center rounded-md bg-white px-2 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => setTibaDropdownOpen(!tibaDropdownOpen)}
                >
                  <BuildingOfficeIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
                </button>
                {tibaDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-4">
                      <input
                        type="text"
                        placeholder="Search branch"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Tiba International - Mecca, Saudi Arabia
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Picture */}
              <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                <img src="/profile.jpg" alt="Profile" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Second Navbar Below Main Navbar */}
      <nav className="bg-white drop-shadow-xl hidden lg:block z-100 sticky">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex space-x-20 py-2">
            {modules.map((module) => (
              <Link
                key={module.name}
                to={module.href}
                className="text-sm font-medium text-gray-900 hover:text-indigo-600"
              >
                {module.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Sticky Footer for Mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around bg-white py-3 shadow-lg lg:hidden">
        {visibleModules.map((module) => (
          <Link
            key={module.name}
            to={module.href}
            className="flex flex-col items-center space-y-1 text-sm text-gray-700 hover:text-indigo-600"
          >
            <Bars3Icon className="h-6 w-6" />
            <span>{module.name}</span>
          </Link>
        ))}
        {hiddenModules.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex flex-col items-center space-y-1 text-sm text-gray-700 hover:text-indigo-600"
            >
              <Bars3Icon className="h-6 w-6" />
              <span>More</span>
            </button>
            {showMore && (
              <div className="absolute bottom-full mb-2 w-40 bg-white border rounded shadow-lg">
                {hiddenModules.map((module) => (
                  <Link
                    key={module.name}
                    to={module.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {module.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
{/* TODO:when entering from mobile to desktop the sidebar is showing it should be hidden */}
      {/* Sidebar Logic */}
      {isSidebarOpen && (
         <Sidebar
         isCollapsed={isCollapsed}
         setIsCollapse={setIsCollapse}
         isSidebarOpen={isSidebarOpen}
         setSidebarOpen={setSidebarOpen}
       />
      )}

      {/* Fix for Full-Screen Issue */}
      <style>{`
        body {
          margin: 0;
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
};

export default Navbar;
