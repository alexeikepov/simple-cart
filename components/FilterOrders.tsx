import { redirect, useRouter, useSearchParams } from "next/navigation";

export default function FilterOrders({ orders }) {
  const baseStatuses = ["active", "purchased"];
  const clearFilters = () => {
    router.push("?");
  };
  function onStatus(e) {
    const status = e.target.value;
    redirect(`?status=${status}`);
  }
  function onUser(e) {
    const user = e.target.value;
    redirect(`?user=${user}`);
  }
  // //   const updateFilter = (key: string, value: string) => {
  // //     const params = new URLSearchParams(searchParams.toString());
  // //     if (value) params.set(key, value);
  // //     else params.delete(key);

  //     router.push(`?${params.toString()}`);
  //   };
  const searchParams = useSearchParams();

  const router = useRouter();

  const statusFilter = searchParams.get("status") || "";
  const nameFilter = searchParams.get("name") || "";

  return (
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
          onChange={onUser}
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
  );
}
