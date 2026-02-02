export default function ProductCard({ product }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <h3 className="font-medium">{product.name}</h3>
      <p className="text-sm text-gray-400">Category: {product.category}</p>
      <p className="text-sm">Qty: {product.quantity}</p>
      <p className="text-purple-400 font-semibold mt-1">₹{product.price}</p>
    </div>
  );
}
