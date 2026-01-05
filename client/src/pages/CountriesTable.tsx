import { DataGrid } from "@mui/x-data-grid";
import type { GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../api/countries";
import { CircularProgress, IconButton, Snackbar, Alert, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./../styles/CountriesTable.scss";
import AppModal from "../components/AppModal";
import { useState } from "react";
import type { Country } from "../types";
import { MESSAGES } from "../utils/constant";
import { useDeleteCountryToast } from "../api/countryQueries";

type RowType = {
  id: string;
  name: string;
  flag?: string;
  population?: number;
  region?: string;
};

export default function CountriesTable() {
  const navigate = useNavigate();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{severity: "success" | "error"; message: string} | null>(null);

  const { data = [], isLoading, isError } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
  const deleteMutation = useDeleteCountryToast(setToast);

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>{MESSAGES.FAILED_TO_FETCH_COUNTRIES}</p>;

  const rows: RowType[] = data.map((c) => ({
    id: c._id!,
    name: c.name,
    flag: c.flag,
    population: c.population,
    region: c.region,
  }));

  const columns: GridColDef<RowType>[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "flag", headerName: "Flag", flex: 1, renderCell: (params: GridRenderCellParams<RowType>) => (
      <img src={params.value} alt="flag" style={{ width: "50px", height: "30px", padding: "10px" }} />
    ) },
    { field: "population", headerName: "Population", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    {
    field: "actions",
    headerName: "Actions",
    renderCell: (params: GridRenderCellParams<RowType>) => (
      <>
        <Tooltip title="Edit">
          <IconButton onClick={() => navigate(`/edit/${params.row.id}`)} color="default">
              <Edit />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={() => setConfirmDeleteId(params.row.id)} color="default">
            <Delete />
          </IconButton>

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
        <button className="add-country-button" onClick={() => navigate("/add")}>
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
            sx={{ width: '100%' }}
          >
            {toast?.message}
          </Alert>
        </Snackbar>
    </div>
  );
}
