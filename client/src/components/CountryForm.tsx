import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Paper, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import "./../styles/CountryForm.scss";
import type { Country, City } from "../types";
import { MESSAGES } from "../utils/constant";
import { useState, useEffect } from "react";

type Props = {
  initialValues: Country;
  onSubmit: (values: Country) => void;
  onCancel: () => void;
};


export default function CountryForm({ initialValues, onSubmit, onCancel }: Props) {
  const [cities, setCities] = useState<City[]>(initialValues.cities || []);
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [cityName, setCityName] = useState("");

  const [cityToDelete, setCityToDelete] = useState<City | null>(null);
  const [toast, setToast] = useState<{
    severity: "success" | "info";
    message: string;
  } | null>(null);


  useEffect(() => {
    setCities(initialValues.cities || []);
  }, [initialValues.cities]);

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
  const schema = Yup.object({
    name: Yup.string().required("Required"),
    population: Yup.number().min(0, "Must be greater than 0").required("Required"),
    region: Yup.string().required("Required"),
    flag: Yup.string().url("Invalid URL").required("Required"),
  });

  return (
    <Paper className="country-form-container">
      <Formik
        initialValues={{ ...initialValues, cities: initialValues.cities || [] }}
        validationSchema={schema}
        enableReinitialize
        onSubmit={(values) => onSubmit({ ...values, cities })}
      >
        {({ values, handleChange, handleSubmit, errors, touched, dirty, setFieldValue }) => {
          const handleSaveCityInternal = () => {
            if (editingCity) {
              const updatedCities = cities.map(c => c._id === editingCity._id ? { ...c, name: cityName } : c);
              setCities(updatedCities);
              setFieldValue('cities', updatedCities);
            } else {
              const newCity: City = { _id: Date.now().toString(), name: cityName };
              const updatedCities = [...cities, newCity];
              setCities(updatedCities);
              setFieldValue('cities', updatedCities);
            }
            setCityDialogOpen(false);
          };
          const handleDeleteCityRequest = (city: City) => {
            setCityToDelete(city);
          };


          return ( 
            <>
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

              <div className="cities-section">
                <h3>Cities</h3>
                <Button variant="contained" startIcon={<Add />} onClick={handleAddCity} className="add-city-button">
                  Add City
                </Button>
                <List>
                  {cities.map((city) => (
                    <ListItem key={city._id} secondaryAction={
                      <>
                        <IconButton edge="end" onClick={() => handleEditCity(city)}>
                          <Edit />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleDeleteCityRequest(city)}>
                          <Delete />
                        </IconButton>
                      </>
                    }>
                      <ListItemText primary={city.name} />
                    </ListItem>
                  ))}
                </List>
              </div>

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
                  <Button onClick={handleSaveCityInternal}>Save</Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={!!cityToDelete}
                onClose={() => setCityToDelete(null)}
              >
                <DialogTitle>Delete City</DialogTitle>
                <DialogContent>
                  {MESSAGES.CITY_DELETE_CONFIRM}
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setCityToDelete(null);
                      setToast({
                        severity: "info",
                        message: MESSAGES.CITY_DELETE_CANCELLED,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      if (!cityToDelete) return;

                      const updatedCities = cities.filter(
                        c => c._id !== cityToDelete._id
                      );

                      setCities(updatedCities);
                      setFieldValue("cities", updatedCities);

                      setCityToDelete(null);
                      setToast({
                        severity: "success",
                        message: MESSAGES.CITY_DELETED_SUCCESS,
                      });
                    }}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
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
            </>
          );
        }}
      </Formik>
    </Paper>
  );
}
