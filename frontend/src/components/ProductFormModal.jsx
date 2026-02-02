import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function ProductFormModal({ onClose, onSuccess, product }) {
  const [suppliers, setSuppliers] = useState([]); // add supplier in products page
  const isEdit = Boolean(product);

  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
  });

  useEffect(() => {
    api.get("/suppliers").then((res) => {
      setSuppliers(res.data);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await api.put(`/products/${product.id}`, {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        });
        toast.success("Product updated");
      } else {
        await api.post("/products", {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        });
        toast.success("Product created");
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
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Product Name
            </label>
            <input
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <input
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Supplier</label>
            <select
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
              value={form.supplierId || ""}
              onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
            >
              <option value="">No supplier</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Unit Price
            </label>
            <input
              type="number"
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Quantity</label>
            <input
              type="number"
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
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
