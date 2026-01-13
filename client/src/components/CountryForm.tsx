import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Paper, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { getCitiesByCountryId } from "../api/cities";
import { useCreateCityToast, useUpdateCityToast, useDeleteCityToast } from "../api/cityQueries";
import "./../styles/CountryForm.scss";
import type { Country, City } from "../types";
import { MESSAGES } from "../utils/constant";
import { useState } from "react";

type Props = {
  initialValues: Country;
  onSubmit: (values: Country) => void;
  onCancel: () => void;
  countryId?: string;
};


export default function CountryForm({ initialValues, onSubmit, onCancel, countryId }: Props) {
  const [toast, setToast] = useState<{ severity: "success" | "error"; message: string } | null>(null);
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [cityName, setCityName] = useState("");

  const { data: cities = [], isLoading: citiesLoading } = useQuery<City[]>({
    queryKey: ["cities", countryId],
    queryFn: () => getCitiesByCountryId(countryId!),
    enabled: !!countryId,
  });

  const createCityMutation = useCreateCityToast(setToast, countryId || "");
  const updateCityMutation = useUpdateCityToast(setToast, countryId || "");
  const deleteCityMutation = useDeleteCityToast(setToast, countryId || "");

  const handleAddCity = () => {
    setEditingCity(null);
    setCityName("");
    setCityDialogOpen(true);
  };

  const handleEditCity = (city: City) => {
    setEditingCity(city);
    setCityName(city.name);
    setCityDialogOpen(true);
  };

  const handleSaveCity = () => {
    if (editingCity) {
      updateCityMutation.mutate({ id: editingCity._id, name: cityName });
    } else {
      createCityMutation.mutate(cityName);
    }
    setCityDialogOpen(false);
  };

  const handleDeleteCity = (cityId: string) => {
    if (window.confirm(MESSAGES.CITY_DELETE_CONFIRM)) {
      deleteCityMutation.mutate(cityId);
    }
  };
  const schema = Yup.object({
    name: Yup.string().required("Required"),
    population: Yup.number().min(0, "Must be greater than 0").required("Required"),
    region: Yup.string().required("Required"),
    flag: Yup.string().url("Invalid URL").required("Required"),
  });

  return (
    <Paper className="country-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched, dirty }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name ? String(errors.name) : ""}
            />

            <TextField
              label="Population"
              name="population"
              type="number"
              fullWidth
              margin="normal"
              value={values.population}
              onChange={handleChange}
              error={touched.population && Boolean(errors.population)}
              helperText={touched.population && errors.population ? String(errors.population) : ""}
            />

            <TextField
              label="Region"
              name="region"
              fullWidth
              margin="normal"
              value={values.region}
              onChange={handleChange}
              error={touched.region && Boolean(errors.region)}
              helperText={touched.region && errors.region ? String(errors.region) : ""}
            />

            <TextField
              label="Flag URL"
              name="flag"
              fullWidth
              margin="normal"
              value={values.flag}
              onChange={handleChange}
              error={touched.flag && Boolean(errors.flag)}
              helperText={touched.flag && errors.flag ? String(errors.flag) : ""}
            />

            <button type="submit" disabled={!dirty}>
              Save
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </form>
        )}
      </Formik>

      {countryId && (
        <div className="cities-section">
          <h3>Cities</h3>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddCity}>
            Add City
          </Button>
          {citiesLoading ? (
            <p>Loading cities...</p>
          ) : (
            <List>
              {cities.map((city) => (
                <ListItem key={city._id} secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleEditCity(city)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteCity(city._id)}>
                      <Delete />
                    </IconButton>
                  </>
                }>
                  <ListItemText primary={city.name} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      )}

      <Dialog open={cityDialogOpen} onClose={() => setCityDialogOpen(false)}>
        <DialogTitle>{editingCity ? "Edit City" : "Add City"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="City Name"
            fullWidth
            variant="standard"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCityDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveCity}>Save</Button>
        </DialogActions>
      </Dialog>

      {toast && (
        <div className={`toast ${toast.severity}`}>
          {toast.message}
        </div>
      )}
    </Paper>
  );
}
