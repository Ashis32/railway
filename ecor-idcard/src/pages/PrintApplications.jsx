
import { Link } from 'react-router-dom';

export default function PrintApplications() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-6">🖨️ Print Applications</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Non Gazetted */}
        <div className="bg-green-100 border border-green-300 p-6 rounded shadow-sm">
          <h3 className="text-md font-semibold text-green-800 mb-2">
            Print Application (Non Gaz)
          </h3>
          <Link
            to="/print/non-gazetted"
            className="text-blue-600 text-sm underline hover:text-blue-800"
          >
            Click here
          </Link>
        </div>

        {/* Gazetted */}
        <div className="bg-red-100 border border-red-300 p-6 rounded shadow-sm">
          <h3 className="text-md font-semibold text-red-800 mb-2">
            Print Application (Gaz)
          </h3>
          <Link
            to="/print/gazetted"
            className="text-blue-600 text-sm underline hover:text-blue-800"
          >
            Click here
          </Link>
        </div>
      </div>
    </div>
  );
}

