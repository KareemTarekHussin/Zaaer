import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  ChevronDownIcon,
  PlusIcon,
  BellIcon,
  BuildingOfficeIcon,
  CogIcon,
  UsersIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import logo from "../../../assets/Images/icons/Zaaer-PMS.svg";
import icon1 from "../../../assets/Images/icons/icon-1.svg";
import icon2 from "../../../assets/Images/icons/icon-2.svg";
import axios from "axios";
import { SquarePlus } from 'lucide-react';
// 1) Define props for the Navbar
interface NavbarProps {
  isCollapsed: boolean;
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({
  isCollapsed,
  setIsCollapse,
  isSidebarOpen,
  setSidebarOpen,
}) => {
  // Local states for dropdowns
  const [showMore, setShowMore] = useState(false);
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const [tibaDropdownOpen, setTibaDropdownOpen] = useState(false);
//static for now but will be dynamic
  // const modules = [
  //   { name: "Admin", href: "/admin" },
  //   { name: "Reservations", href: "/reservations" },
  //   { name: "HRMS", href: "/hrms" },
  //   { name: "Housekeeping", href: "/housekeeping" },
  //   { name: "Outlets", href: "/outlets" },
  //   { name: "Finance", href: "/finance" },
  //   { name: "Reports", href: "/reports" },
  // ];
  //dynamic 
  const [modules, setModules] = useState<any[]>([]);
useEffect(() => {
  axios.get("/mock-api/second-navbar.json")
    .then(res => setModules(res.data.secondNavbar || []))
    .catch(err => console.error(err));
}, []);


const IconMapping: Record<string, React.ElementType> = {
  gear: CogIcon,       // "gear" -> CogIcon
  users: UsersIcon,    // "users" -> UsersIcon
  calendar: CalendarIcon
  // etc.
};

  const visibleModules = modules.slice(0, 4);
  const hiddenModules = modules.slice(4);

  const createNewOptions = [
    { label: "New Booking", action: () => alert("New Booking") },
    { label: "New Report", action: () => alert("New Report") },
  ];

  return (
    <>
      {/* Main Navbar */}
<div className="sticky top-0 z-20 shadow-lg drop-shadow-md">


      <header className="bg-white ">
        <div className="mx-auto max-w-14xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between py-4 ">
            {/* Left Section: Logo & Mobile Sidebar Toggle */}
            <div className="flex items-center gap-x-4 ">
              {/* Show sidebar toggle only on mobile */}
              <button
                className="lg:hidden p-2 text-gray-500 hover:bg-[#D9EBFF] rounded-lg shadow-lg bg-white border"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              {/* Desktop Logo */}
              <Link to="/" className="hidden lg:flex items-center gap-x-2">
                <img src={logo} alt="ZAAER PMS" className="h-10 w-auto" />
              </Link>
            </div>

            {/* Right Section: Create, Notifications, Tiba Dropdown, Profile */}
            <div className="flex items-center gap-x-4 lg:divide-x-2 divide-gray-300 pl-">
              {/* Create New Button + Dropdown */}
              <div className="relative">
  {/* Desktop button */}
  <button
    className="hidden lg:inline-flex items-center rounded-lg bg-white px-3 border border-[#DBDBDB] py-2 text-sm font-semibold text-[#223A77] shadow-sm ring-1 ring-inset hover:bg-[#D9EBFF] ring-gray-300"
    onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
  >
    {/* Plus Icon */}
    <SquarePlus className="h-5 w-5 mr-2" aria-hidden="true" strokeWidth={1}/>

    {/* Text */}
    <span className="">Create New</span>

    {/* Divider Line */}
    <div className="h-5 border-l border-gray-300 mx-2"></div>

    {/* Chevron Icon */}
    <ChevronDownIcon className="h-5 w-5 text-[#4D4D4D]" aria-hidden="true" />
  </button>

  {/* Mobile button */}
  <button
    className="lg:hidden inline-flex items-center justify-center rounded-md bg-white px-2 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
  >
    <SquarePlus className="h-5 w-5 text-[#223A77]" aria-hidden="true" strokeWidth={1}/>

    {/* Divider Line for Mobile */}
    <div className="h-5 border-l border-gray-300 mx-2"></div>

    <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />
  </button>

  {/* Dropdown */}
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
              <div className="relative pl-2">
              <button className=" rounded-full p-2   text-gray-500 hover:bg-[#D9EBFF]">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex h-6 w-6 items-center justify-center rounded-3xl bg-red-600 text-white text-xs font-bold">
                99+
                </span>
              </button>
              </div>
              

              {/* 2 icons functionality later */}
              <div className="relative hidden lg:inline-flex p-1 px-2 pr-0 pl-4 space-x-1">
              <button className="rounded-full text-gray-500 hover:bg-[#D9EBFF]">
               <img src={icon1} alt="" />
                
              </button>
              <button className="rounded-full text-gray-500 hover:bg-[#D9EBFF]">
                <img src={icon2} alt="" />
              </button>
              </div>
             

              {/* Tiba International dropdown */}
              <div className="relative pl-4">
                {/* Desktop button */}
                <button
                  className="hidden lg:inline-flex items-center  bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-[#D9EBFF] rounded-md  "
                  onClick={() => setTibaDropdownOpen(!tibaDropdownOpen)}
                >
                  <span>Tiba International</span>
                  <BuildingOfficeIcon
                    className="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
                {/* Mobile button */}
                <button
                  className="lg:hidden inline-flex items-center justify-center  bg-white px-2 py-2 text-gray-700 shadow-sm  hover:bg-gray-50"
                  onClick={() => setTibaDropdownOpen(!tibaDropdownOpen)}
                >
                  <BuildingOfficeIcon
                    className="h-6 w-6 text-gray-700"
                    aria-hidden="true"
                  />
                </button>

                {/* Dropdown */}
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
              <div className="pl-4">
              <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </header>

      {/* Second Navbar (Desktop) */}
      <nav className="bg-white  hidden lg:block ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10  overflow-x-auto">
          <div className="flex space-x-20 py-2 sm:px-10">
            {modules.map((module) => {
              const IconComp = module.icon ? IconMapping[module.icon] : null;

              return (
                // TODO: Add active class for the current icon and make the icons combine with text
                <Link
                  key={module.name}
                  to={module.href}
                  className="text-sm font-medium text-gray-900 hover:text-[#3860C7] flex items-center gap-1 "
                >
                  {/* If there's a mapped icon, render it */}
                  {IconComp && <IconComp className="h-5 w-5 text-gray-600 " />}
                  {module.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      </div>
       {/* Second Navbar (Mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-20 bg-white  py-2 shadow-2xl lg:hidden drop-shadow-[40px_40px_140px_rgba(0,0,0,0.25)] ">
        <div className="flex justify-around">
          {visibleModules.map((module) => {
            const IconComp = module.icon ? IconMapping[module.icon] : null;
            return (
              <Link
                key={module.name}
                to={module.href}
                className="flex flex-col items-center space-y-1 text-xs text-gray-700 hover:text-[#3860C7]"
              >
                {IconComp ? (
                  <IconComp className="h-5 w-5 text-gray-600" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
                <span>{module.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

/** 
 * A small sub-component for the mobile footer. 
 * It shows `visibleModules` in the bottom bar, 
 * and if there are more modules, they go in a popover.
 */

