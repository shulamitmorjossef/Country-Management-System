import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconButton, Tooltip, Snackbar, Alert, CircularProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useRecoilValue } from "recoil";
import { useDeleteUserToast, useUsers } from "../api/userQueries";
import AppModal from "../components/AppModal";
import { authState } from "../state/auth.atom";
import type { FrontUser } from "../types";
import { SEVERITY, MESSAGES } from "../utils/constant";

export default function UsersManagement() {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);
  const token = auth.token || "";

  const [toast, setToast] = useState<{ severity: "success" | "error" | "info"; message: string } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const { data = [], isLoading } = useUsers();
  const deleteMutation = useDeleteUserToast(token, () => {
    setToast({ severity: SEVERITY.SUCCESS, message: MESSAGES.USER_DELETED_SUCCESS });
  });

  if (isLoading) return <CircularProgress style={{ display: "block", margin: "2rem auto" }} />;

  const rows = data.map((u: FrontUser) => ({
    id: u._id!,
    username: u.username,
    email: u.email,
    isAdmin: u.isAdmin,
  }));

  const canEdit = auth.user?.isAdmin;
  const canDelete = auth.user?.isAdmin;

  const columns: GridColDef[] = [
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Tooltip title={canEdit ? "Edit" : "No permission"}>
            <span>
              <IconButton
                onClick={() => navigate(`/users/${params.row.id}/edit`)}
                disabled={!canEdit}
                style={{ color: canEdit ? undefined : "#ccc" }}
              >
                <Edit />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={canDelete ? "Delete" : "No permission"}>
            <span>
              <IconButton
                onClick={() => setConfirmDeleteId(params.row.id)}
                disabled={!canDelete}
                style={{ color: canDelete ? undefined : "#ccc" }}
              >
                <Delete />
              </IconButton>
            </span>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: "70%", margin: "2rem auto" }}>
      <DataGrid rows={rows} columns={columns} autoHeight disableColumnMenu />

      <AppModal
        open={!!confirmDeleteId}
        title="Delete User"
        message={MESSAGES.USER_DELETE_CONFIRM}
        confirmText="Delete"
        onClose={() => {
          setConfirmDeleteId(null);
          setToast({ severity: SEVERITY.INFO, message: MESSAGES.USER_NOT_DELETED });
        }}
        onConfirm={() => {
          if (confirmDeleteId) deleteMutation.mutate(confirmDeleteId);
          setConfirmDeleteId(null);
        }}
      />

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setToast(null)} severity={toast?.severity} sx={{ width: "100%" }}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
