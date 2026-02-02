import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value="—" />
        <StatCard title="Low Stock Items" value="—" />
        <StatCard title="Total Sales" value="—" />
      </div>
    </div>
  );
}
