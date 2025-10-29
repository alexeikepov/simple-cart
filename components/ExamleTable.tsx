"use client";

import { useState } from "react";
import Table, { ConfigT } from "zvijude/table";

const headers = [
  { key: "user", label: "Name" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created At", format: "formatDate" },
];

export default function ExampleTable({ data = [] }: any) {
  const [columns, setColumns] = useState(headers);

  const [state, setState] = useState(data);

  const config = {
    tblId: "someTable",
    columns,
    setColumns,
    data: data,
    state: data,
    setState,
  } as unknown as ConfigT;

  return (
    <div>
      <Table config={config} tblCls="mb-0 rounded-b-none" />
    </div>
  );
}
