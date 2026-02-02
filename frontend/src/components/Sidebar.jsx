import { NavLink } from "react-router-dom";

const linkClass =
  "block px-4 py-2 rounded hover:bg-gray-700 transition";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-800 border-r border-gray-700 min-h-[calc(100vh-56px)] p-4">
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-purple-600 text-white" : "text-gray-300"}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-purple-600 text-white" : "text-gray-300"}`
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/suppliers"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-purple-600 text-white" : "text-gray-300"}`
          }
        >
          Suppliers
        </NavLink>

        <NavLink
          to="/sales"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-purple-600 text-white" : "text-gray-300"}`
          }
        >
          Sales
        </NavLink>
      </nav>
    </aside>
  );
}
