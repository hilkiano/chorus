"use client";

import { DataTable } from "@/components/reusable/data-table";
import { columns } from "./users-datatable-columns";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/lib/query-keys";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

export default function UsersDataTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  interface GetDataProps {
    pagination: PaginationState;
  }

  const getData = async (props: GetDataProps) => {
    const page = props.pagination.pageIndex + 1;
    const limit = props.pagination.pageSize;
    const params = {
      page: page.toString(),
      limit: limit.toString(),
    };

    const res = await fetch(`/api/list/users?${new URLSearchParams(params)}`);
    const data = await res.json();

    return data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: userKeys.list({ pagination }),
    queryFn: () => getData({ pagination }),
  });

  return (
    <DataTable
      columns={columns}
      data={data ? data.data : []}
      total={data ? data.pagination.total : 0}
      initialState={{
        columnPinning: {
          right: ["actions"],
        },
      }}
      manualPagination={{ pagination, setPagination }}
    />
  );
}
