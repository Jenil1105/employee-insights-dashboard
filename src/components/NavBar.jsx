import { Link } from "react-router-dom";

export default function Navbar({ }) {

  return (
    <nav className="sticky top-0 z-50 bg-orange-50 border-b border-gray-200 shadow-sm px-6 py-3 flex items-center justify-between">

      <h1 className="text-lg font-semibold text-gray-800">Employee Insights</h1>

      <div className="flex items-center gap-6">
        <Link to="/list" className="text-gray-600 hover:text-orange-500 font-medium transition">List</Link>
        <Link to="/analytics" className="text-gray-600 hover:text-orange-500 font-medium transition">Analytics</Link>
      </div>

      <button
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
}