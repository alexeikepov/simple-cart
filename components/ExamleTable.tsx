"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Table, { ConfigT } from "zvijude/table";

const headers = [
  { key: "user", label: "Name" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created At", format: "formatDate" },
];

export default function ExampleTable({ data = [] }: any) {
  const [columns, setColumns] = useState(headers);
  const searchParams = useSearchParams();

  const router = useRouter();

  const statusFilter = searchParams.get("status") || "";
  const nameFilter = searchParams.get("name") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`?${params.toString()}`);
  };

  function onStatus(e) {
    const status = e.event.value;
  }

  const clearFilters = () => {
    router.push("?");
  };

  const [state, setState] = useState(data);

  const config = {
    tblId: "someTable",
    columns,
    setColumns,
    data: data,
    state: data,
    setState,
  } as unknown as ConfigT;

  const baseStatuses = ["active", "purchased"];

  return (
    <div>
      <div className="mb-4 bg-white p-4 rounded-lg shadow">
        <div className="flex gap-4 items-center">
          <div className="w-48">
            <select
              value={statusFilter}
              onChange={onStatus}
              className="w-full border rounded px-3 py-2 text-right"
            >
              <option value="">All Statuses</option>
              {baseStatuses.map((status) => (
                <option key={status as string} value={status as string}>
                  {status as string}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={nameFilter}
            onChange={(e) => updateFilter("name", e.target.value)}
            placeholder="Filter by name..."
            className="border rounded px-3 py-2 w-64"
          />

          <button
            onClick={clearFilters}
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
