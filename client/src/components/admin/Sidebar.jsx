import { NavLink } from "react-router-dom";
import {
  Home,
  FilePlus,
  List,
  Users,
  ClipboardEdit,
  ClipboardList,
} from "lucide-react";
import useUserStore from "../../store/userStore";

export default function Sidebar() {
  const { user } = useUserStore();
  const userType = user?.type || "user";
  const menuItems = [
    {
      label: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
      roles: ["admin", "user"],
    },
    {
      label: "Add Blog",
      icon: <FilePlus size={20} />,
      path: "/dashboard/addBlog",
      roles: ["admin"],
    },
    {
      label: "Blogs",
      icon: <List size={20} />,
      path: "/dashboard/listBlog",
      roles: ["admin"],
    },
    {
      label: "Users",
      icon: <Users size={20} />,
      path: "/dashboard/listUsers",
      roles: ["admin"],
    },
    // {
    //   label: "Comments",
    //   icon: <MessageSquare size={20} />,
    //   path: "/dashboard/comments",
    //   roles: ["admin"],
    // },
    {
      label: "Submit Test",
      icon: <ClipboardEdit size={20} />,
      path: "/dashboard/dementia/submit",
      roles: ["user"],
    },
    {
      label: "My Results",
      icon: <ClipboardList size={20} />,
      path: "/dashboard/dementia/all",
      roles: ["user"],
    },
  ];

  const visibleItems = menuItems.filter((item) =>
    item.roles.includes(userType),
  );

  return (
    <div className="border-r border-gray-200 flex flex-col min-h-full pt-6">
      {visibleItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/dashboard"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
              isActive ? "bg-primary/10 border-r-4 border-primary" : ""
            }`
          }
        >
          {item.icon}
          <p>{item.label}</p>
        </NavLink>
      ))}
    </div>
  );
}
