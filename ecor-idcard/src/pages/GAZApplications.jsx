import React, { useState } from 'react';
import pendingWN from '../data/pendingWN'; // Replace with your gazetted data file if needed

export default function GAZApplications() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [status, setStatus] = useState('');

  // 👉 You can implement actual filtering logic here based on date/status
  const filteredData = pendingWN.filter(user => {
    return true; // Just a placeholder for now
  });

  return (
    <div>
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-1">📂 Pending Applications (Gazetted Officers)</h2>
        <p className="text-sm text-gray-600">Below are all pending identity card requests (Gazetted staff).</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 items-center bg-white p-4 mb-6 rounded-lg shadow-sm">
        <div>
          <label className="block text-xs text-gray-500 mb-1">From Date</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="p-2 border rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">To Date</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="p-2 border rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded-md text-sm"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="to-be-sent">To Be Sent</option>
            <option value="approved">Closed</option>
          </select>
        </div>
        <button
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          onClick={() => {
            console.log('Filters:', { dateFrom, dateTo, status });
            // You can apply real filtering logic here
          }}
        >
          Filter
        </button>
      </div>

      {/* Data Table */}
      <table className="min-w-full table-auto text-sm text-gray-700 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-700 text-white text-left text-xs uppercase tracking-wider">
          <tr>
            <th className="px-5 py-3">Photo</th>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Designation</th>
            <th className="px-5 py-3">Phone</th>
            <th className="px-5 py-3">Address</th>
            <th className="px-5 py-3">QR</th>
            <th className="px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id} className="border-b hover:bg-blue-50 transition">
              <td className="px-5 py-3">
                <img src={user.photo} alt="User" className="h-10 w-10 rounded-full border" />
              </td>
              <td className="px-5 py-3 font-medium">{user.name}</td>
              <td className="px-5 py-3">{user.designation}</td>
              <td className="px-5 py-3">{user.phone}</td>
              <td className="px-5 py-3">{user.address}</td>
              <td className="px-5 py-3">
                <img src={user.qr} alt="QR Code" className="h-10 w-10" />
              </td>
              <td className="px-5 py-3 space-x-2">
                <button className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition">
                  View
                </button>
                <button className="inline-flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-800 text-white text-xs font-medium rounded transition">
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
