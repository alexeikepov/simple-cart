"use client";

import { redirect } from "next/navigation";
import type { Route } from "next";
import { getFormData } from "zvijude/form/funcs";

export default function FilterOrders() {
  const baseStatuses = ["active", "purchased"];

  function clearFilters() {
    redirect("/");
  }

  function handleSubmit(e: FormDataEvent) {
    const data = getFormData(e);
    redirect(`?filter=${JSON.stringify(data)}`);
  }

  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow">
      <div className="flex gap-4 items-center">
        <form onSubmit={() => handleSubmit} className="flex gap-4 items-center">
          <div className="w-48">
            <select
              name="status"
              className="w-full border rounded px-3 py-2 text-right"
            >
              <option value="">All Statuses</option>
              {baseStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <input
            name="user"
            type="text"
            placeholder="Filter by name..."
            className="border rounded px-3 py-2 w-64"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
        </form>

        <button
          onClick={clearFilters}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
