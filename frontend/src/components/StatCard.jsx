export default function StatCard({ title, value }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-semibold text-purple-400 mt-1">
        {value}
      </p>
    </div>
  );
}
