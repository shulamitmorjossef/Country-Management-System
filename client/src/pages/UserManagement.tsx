import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import type { FrontUser } from "../types";


export default function UsersManagement() {
  const navigate = useNavigate();

  const { data = [], isLoading } = useQuery<FrontUser[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <CircularProgress />;

  return (
    <DataGrid
      rows={data}
      getRowId={(row) => row._id!}
      columns={[
        { field: "username", headerName: "Username", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
          field: "actions",
          headerName: "Actions",
          renderCell: (params) => (
            <button onClick={() => navigate(`/users/${params.row._id}/edit`)}>
              Edit
            </button>
          ),
        },
      ]}
    />
  );
}
