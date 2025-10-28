"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import Table, { ConfigT } from "zvijude/table";

export default function ExampleTable({ data = [] }: any) {
  const [columns, setColumns] = useState(headers);
  const [state, setState] = useState(data);

  const config = {
    tblId: "someTable",
    columns,
    setColumns,
    data,
    state,
    setState,
  } as unknown as ConfigT;

  return (
    <div>
      <button
        onClick={() => {
          redirect("?page=1&status=active" as any);
        }}
      >
        status active
      </button>
      <Table config={config} tblCls="mb-0 rounded-b-none" />
    </div>
  );
}

const headers = [
  { key: "status", label: "status" },
  { key: "createdAt", label: "createdAt", format: "formatDate" },
];
