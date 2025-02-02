import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import {
  CalendarIcon,
  UsersIcon,
  CogIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

interface SidebarItem {
  title: string;
  link?: string;
  icon?: string;
  children: SidebarItem[];
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/** Map string icon names to Heroicons */
const IconMapping: Record<string, React.ElementType> = {
  dashboard: HomeIcon,
  calendar: CalendarIcon,
  users: UsersIcon,
  gear: CogIcon
};

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapse,
  isSidebarOpen,
  setSidebarOpen
}) => {
  const [items, setItems] = useState<SidebarItem[]>([]);

  useEffect(() => {
    axios
      .get("/mock-api/sidebar.json")
      .then((res) => {
        setItems(res.data.sidebar || []);
      })
      .catch((err) => {
        console.error("Failed to load sidebar data:", err);
      });
  }, []);

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div
        className={`
          ${isCollapsed ? "w-16" : "w-64"}
          hidden lg:block
          relative      
          h-screen     
          bg-white
          drop-shadow-xl
          transition-all
          duration-500
        `}
      >
        {/**
         * 1) SCROLLABLE AREA
         * We add a bottom padding so items don't overlap the absolute button
         */}
        <div className="overflow-y-auto h-full pb-16">
          <ul className="py-2 space-y-2">
            {items.map((item, idx) => (
              <MenuItem
                key={idx}
                item={item}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </div>

        {/**
         * 2) COLLAPSE BUTTON pinned at the bottom
         * By using absolute positioning and "bottom-0 w-full"
         */}
        <div className="absolute bottom-0 w-full  p-2   pb-[120px]">
          <button
            onClick={() => setIsCollapse(!isCollapsed)}
            className="w-full py-1 px-4 border border-[#DBDBDB] rounded-lg hover:bg-gray-200"
          >
            {/* TODO:replace with icons */}
            {isCollapsed ? ">" : "<"}
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Dark background */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Mobile sidebar content */}
          <div className="relative w-64 bg-white min-h-screen p-2 flex flex-col">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <ul className="mt-6 space-y-2 overflow-y-auto flex-1">
              {items.map((item, idx) => (
                <MenuItem
                  key={idx}
                  item={item}
                  isCollapsed={false} // always expanded on mobile
                  onItemClick={() => setSidebarOpen(false)}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

/**
 * A recursive menu item that supports collapsible text if `isCollapsed`.
 */
 {/* TODO:Move into a seperate componenet after UI complete */}
const MenuItem: React.FC<{
  item: SidebarItem;
  isCollapsed: boolean;
  onItemClick?: () => void;
}> = ({ item, isCollapsed, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else if (onItemClick) {
      onItemClick();
    }
  };

  const IconComponent = IconMapping[item.icon ?? ""] || HomeIcon;

  return (
    <li className="px-2">
      <div
        onClick={toggleOpen}
        className={`
          flex items-center
          rounded-lg
          hover:bg-blue-100
          transition-all
          duration-500
          cursor-pointer
          ${
            isCollapsed
              ? "pl-2 pr-1 py-2"
              : "px-3 py-2"
          }
        `}
      >
        {/* ICON always visible */}
        <IconComponent className="h-6 w-6 text-gray-700 flex-shrink-0" />

        {/* TEXT fades out on collapse */}
        <span
          className={`
            ml-2
            text-sm
            text-gray-800
            whitespace-nowrap
            overflow-hidden
            transition-all
            duration-500
            ${
              isCollapsed
                ? "w-0 opacity-0"
                : "w-auto opacity-100"
            }
          `}
        >
          {item.title}
        </span>
      </div>

      {hasChildren && isOpen && (
        <ul className="ml-4 border-l border-gray-200 pl-2 space-y-1">
          {item.children.map((child, idx) => (
            <MenuItem
              key={idx}
              item={child}
              isCollapsed={isCollapsed}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
