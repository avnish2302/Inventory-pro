import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-purple-400">
        Inventory pro
      </h1>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">
            {user.name}
          </span>
          <button
            onClick={logout}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
