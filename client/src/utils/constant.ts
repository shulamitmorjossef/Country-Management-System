import * as Yup from "yup";

export const schema = Yup.object({
    name: Yup.string().required("Required"),
    population: Yup.number().min(0, "Must be greater than 0").required("Required"),
    region: Yup.string().required("Required"),
    flag: Yup.string().url("Invalid URL").required("Required"),
});

export const MESSAGES = {
    COUNTRY_CREATED_SUCCESS: "Country created successfully.",
    COUNTRY_CREATED_ERROR: "Failed to create country.",
    COUNTRY_UPDATED_SUCCESS: "Country updated successfully.",
    COUNTRY_UPDATED_ERROR: "Failed to update country.",
    COUNTRY_DELETED_SUCCESS: "Country deleted successfully.",
    COUNTRY_DELETED_ERROR: "Failed to delete country.",
    COUNTRY_DELETE_CONFIRM: "Are you sure you want to delete this country?",
    DEFAULT_NAVBAR_TITLE: "Country Management System",
    FAILED_TO_FETCH_COUNTRIES: "Failed to fetch countries",
    COUNTRY_NOT_FOUND: "Country not found",

} as const;


export const SEVERITY = {
    SUCCESS: "success",
    ERROR: "error",
} as const;