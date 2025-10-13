"use client";

import { DataTable } from "@/components/reusable/data-table";
import { columns } from "./users-datatable-columns";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/lib/query-keys";

export default function UsersDataTable() {
  const getData = async () => {
    const res = await fetch("/api/list/users");
    const data = await res.json();

    return data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: userKeys.lists(),
    queryFn: getData,
  });

  return (
    <DataTable
      columns={columns}
      data={data ? data.data : []}
      total={data ? data.pagination.total : 0}
    />
  );
}
