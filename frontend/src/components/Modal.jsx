export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="text-sm text-purple-400 mb-4"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
