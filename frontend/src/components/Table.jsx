export default function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            {headers.map(h => (
              <th
                key={h}
                className="text-left px-4 py-2 text-sm text-gray-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t border-gray-700 hover:bg-gray-800"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
