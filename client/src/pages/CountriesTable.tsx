import { DataGrid } from "@mui/x-data-grid";
import type { GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, IconButton, Snackbar, Alert, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./../styles/CountriesTable.scss";
import AppModal from "../components/AppModal";
import { useState, useEffect } from "react";
import { MESSAGES } from "../utils/constant";
import { useDeleteCountryToast, useCountries  } from "../api/countryQueries";
import { useRecoilValue } from "recoil";
import { authState } from "../state/auth.atom";

type RowType = {
  id: string;
  name: string;
  flag?: string;
  population?: number;
  region?: string;
  cities?: string[];
};

export default function CountriesTable() {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);

  const { data = [], isLoading, isError } = useCountries();

  const deleteMutation = useDeleteCountryToast(setToast);

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    }
  }, [auth, navigate]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>{MESSAGES.FAILED_TO_FETCH_COUNTRIES}</p>;

  const rows: RowType[] = data.map((c) => ({
    id: c._id!,
    name: c.name,
    flag: c.flag,
    population: c.population,
    region: c.region,
    cities: c.cities?.map(city => city.name) || [],
  }));

  const canEdit = auth.user?.isAdmin || auth.user?.permissions?.canEdit;
  const canDelete = auth.user?.isAdmin || auth.user?.permissions?.canDelete;
  const canAdd = auth.user?.isAdmin || auth.user?.permissions?.canAdd;

  const columns: GridColDef<RowType>[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "flag",
      headerName: "Flag",
      flex: 1,
      renderCell: (params: GridRenderCellParams<RowType>) => (
        <img src={params.value} alt="flag" style={{ width: "50px", height: "30px", padding: "10px" }} />
      ),
    },
    { field: "population", headerName: "Population", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    {
      field: "cities",
      headerName: "Cities",
      flex: 1,
      renderCell: (params: GridRenderCellParams<RowType>) => (
        <div>{params.value?.join(", ") || "No cities"}</div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params: GridRenderCellParams<RowType>) => (
        <>
          <Tooltip title={canEdit ? "Edit" : "No permission"}>
            <span>
              <IconButton
                onClick={() => navigate(`/edit/${params.row.id}`)}
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
    <div className="countries-table-container">
      <div className="data-grid-wrapper">
        <DataGrid rows={rows} columns={columns} />
      </div>

      <button
        className="add-country-button"
        onClick={() => canAdd && navigate("/add")}
        disabled={!canAdd}
        style={{ opacity: canAdd ? 1 : 0.5, cursor: canAdd ? "pointer" : "not-allowed" }}
      >
        + Add Country
      </button>

      <AppModal
        open={!!confirmDeleteId}
        title="Delete Country"
        message={MESSAGES.COUNTRY_DELETE_CONFIRM}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) deleteMutation.mutate(confirmDeleteId);
          setConfirmDeleteId(null);
        }}
        confirmText="Delete"
      />

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast(null)}
          severity={toast?.severity}
          sx={{ width: "100%" }}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}