import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import SupplierFormModal from "../components/SupplierFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [deleteSupplier, setDeleteSupplier] = useState(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/suppliers");
      setSuppliers(res.data);
    } catch {
      toast.error("Failed to load suppliers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const confirmDelete = async () => {
    try {
      await api.delete(`/suppliers/${deleteSupplier.id}`);
      toast.success("Supplier deleted");
      fetchSuppliers();
      setDeleteSupplier(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Suppliers</h1>

        <button
          onClick={() => {
            setEditingSupplier(null);
            setOpen(true);
          }}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-sm"
        >
          + Add Supplier
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search by name or email"
          className="bg-gray-800 border border-gray-700 px-3 py-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-gray-800 border border-gray-700 px-3 py-2 rounded"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : suppliers.length === 0 ? (
        <p className="text-gray-400">
          No suppliers found. Click <b>“Add Supplier”</b> to create one.
        </p>
      ) : (
        <table className="w-full border border-gray-700 text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers
              .filter(
                (s) =>
                  s.name.toLowerCase().includes(search.toLowerCase()) ||
                  s.email.toLowerCase().includes(search.toLowerCase()),
              )
              .sort((a, b) =>
                sort === "name" ? a.name.localeCompare(b.name) : 0,
              )
              .map((s) => (
                <tr key={s.id} className="border-t border-gray-700">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2 text-center">{s.email}</td>
                  <td className="p-2 text-center space-x-3">
                    <button
                      onClick={() => {
                        setEditingSupplier(s);
                        setOpen(true);
                      }}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteSupplier(s)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {open && (
        <SupplierFormModal
          supplier={editingSupplier}
          onClose={() => setOpen(false)}
          onSuccess={fetchSuppliers}
        />
      )}

      {deleteSupplier && (
        <DeleteConfirmModal
          title="Delete Supplier"
          message={`Are you sure you want to delete "${deleteSupplier.name}"?`}
          onClose={() => setDeleteSupplier(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
