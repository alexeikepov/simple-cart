"use client";

import { useState, useMemo } from "react";
import Table, { ConfigT } from "zvijude/table";

const headers = [
  { key: "user", label: "Name" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created At", format: "formatDate" },
];

export default function ExampleTable({ data = [] }: any) {
  const [columns, setColumns] = useState(headers);
  const [statusFilter, setStatusFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((cart: any) => {
      const statusMatch = statusFilter === "" || cart.status === statusFilter;
      const nameMatch =
        nameFilter === "" ||
        cart.user.toLowerCase().includes(nameFilter.toLowerCase());
      return statusMatch && nameMatch;
    });
  }, [data, statusFilter, nameFilter]);

  const [, setState] = useState(filteredData);

  const config = {
    tblId: "someTable",
    columns,
    setColumns,
    data: filteredData,
    state: filteredData,
    setState,
  } as unknown as ConfigT;

  const uniqueStatuses = [...new Set(data.map((cart: any) => cart.status))];

  return (
    <div>
      <div className="mb-4 bg-white p-4 rounded-lg shadow">
        <div className="flex gap-4 items-center">
          {/* Status Filter */}
          <div className="w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border rounded px-3 py-2 text-right"
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.map((status) => (
                <option key={status as string} value={status as string}>
                  {status as string}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Filter by name..."
            className="border rounded px-3 py-2 w-64"
          />

          <button
            onClick={() => {
              setStatusFilter("");
              setNameFilter("");
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      <Table config={config} tblCls="mb-0 rounded-b-none" />
    </div>
  );
}
