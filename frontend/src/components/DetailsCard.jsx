import { XCircle } from "lucide-react";

const DetailsCard = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-6 w-full max-w-lg relative border border-gray-300 dark:border-gray-700">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <XCircle className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Appointment Details</h2>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Description:</strong> {data.description}
        </p>
      </div>
    </div>
  );
};

export default DetailsCard;
