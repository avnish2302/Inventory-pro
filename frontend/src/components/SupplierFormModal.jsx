import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function SupplierFormModal({ supplier, onClose, onSuccess }) {
  const isEdit = Boolean(supplier);

  const [form, setForm] = useState({
    name: supplier?.name || "",
    email: supplier?.email || "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await api.put(`/suppliers/${supplier.id}`, form);
        toast.success("Supplier updated");
      } else {
        await api.post("/suppliers", form);
        toast.success("Supplier created");
      }

      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 p-6 rounded w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Supplier" : "Add Supplier"}
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Supplier Name
            </label>
            <input
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-purple-600 rounded">
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
