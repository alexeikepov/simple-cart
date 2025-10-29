"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterOrders() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const baseStatuses = ["active", "purchased"];

  function onStatus(e) {
    const status = e.target.value;
    router.push(`?status=${status}`);
  }

  function onUser(user) {
    router.push(`?user=${user}`);
  }

  function clearFilters() {
    router.push("/");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = e.target.user.value;
    onUser(user);
  }

  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow">
      <div className="flex gap-4 items-center">
        <div className="w-48">
          <select
            onChange={onStatus}
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

        <form onSubmit={handleSubmit} className="flex gap-4 items-center">
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
