import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Paper } from "@mui/material";
import "./../styles/CountryForm.scss";
import type { Country } from "../types";

type Props = {
  initialValues: Country;
  onSubmit: (values: Country) => void;
  onCancel: () => void;
};

// TODO: move to constants file
export default function CountryForm({ initialValues, onSubmit, onCancel }: Props) {
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
    </Paper>
  );
}
