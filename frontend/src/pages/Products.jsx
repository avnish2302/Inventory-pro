import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import ProductFormModal from "../components/ProductFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${deleteProduct.id}`);
      toast.success("Product deleted");
      fetchProducts();
      setDeleteProduct(null); //close modal
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Products</h1>

        <button
          onClick={() => {
            setEditingProduct(null);
            setOpen(true);
          }}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-sm"
        >
          + Add Product
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search by name or category"
          className="bg-gray-800 border border-gray-700 px-3 py-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-gray-800 border border-gray-700 px-3 py-2 rounded"
          onChange={(e) => setSupplierFilter(e.target.value)}
        >
          <option value="">All Suppliers</option>
          {[
            ...new Set(products.map((p) => p.supplier?.name).filter(Boolean)),
          ].map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>

        <select
          className="bg-gray-800 border border-gray-700 px-3 py-2 rounded"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort</option>

          <option value="price_asc">Price (Low → High)</option>

          <option value="price_desc">Price (High → Low)</option>

          <option value="qty_asc">Quantity (Low → High)</option>

          <option value="qty_desc">Quantity (High → Low)</option>
        </select>
      </div>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400">
          No products found. Click <b>“Add Product”</b> to create one.
        </p>
      ) : (
        <table className="w-full border border-gray-700 text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Supplier</th>
              <th className="p-2">Unit Price</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Value</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter(
                (p) =>
                  p.name.toLowerCase().includes(search.toLowerCase()) ||
                  p.category.toLowerCase().includes(search.toLowerCase()),
              )
              .filter((p) =>
                supplierFilter ? p.supplier?.name === supplierFilter : true,
              )
              .sort((a, b) => {
                switch (sortBy) {
                  case "price_asc":
                    return a.price - b.price;

                  case "price_desc":
                    return b.price - a.price;

                  case "qty_asc":
                    return a.quantity - b.quantity;

                  case "qty_desc":
                    return b.quantity - a.quantity;

                  default:
                    return 0;
                }
              })

              .map((p) => (
                <tr key={p.id} className="border-t border-gray-700">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2 text-center">{p.category}</td>
                  <td className="p-2 text-center">{p.supplier?.name || "—"}</td>
                  <td className="p-2 text-center">₹{p.price}</td>
                  <td className="p-2 text-center">{p.quantity}</td>
                  <td className="p-2 text-center">₹{p.price * p.quantity}</td>
                  <td className="p-2 text-center space-x-3">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setOpen(true);
                      }}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteProduct(p)}
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

      {/* Modal */}
      {open && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setOpen(false)}
          onSuccess={fetchProducts}
        />
      )}

      {deleteProduct && (
        <DeleteConfirmModal
          title="Delete Product"
          message={`Are you sure you want to delete "${deleteProduct.name}"?`}
          onClose={() => setDeleteProduct(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
