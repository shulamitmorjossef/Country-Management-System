// import * as Yup from "yup";

// export const schema = Yup.object({
//     name: Yup.string().required("Required"),
//     population: Yup.number().min(0, "Must be greater than 0").required("Required"),
//     region: Yup.string().required("Required"),
//     flag: Yup.string().url("Invalid URL").required("Required"),
// });

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
    USER_CREATED_SUCCESS: "User created successfully.",
    USER_CREATED_ERROR: "Failed to create user.",
    LOGIN_SUCCESS: "Login successful.",
    WRONG_CREDENTIALS: "Wrong username or password. Please try again.",
    PROFILE_UPDATED_SUCCESS: "Profile updated successfully.",
    PROFILE_UPDATED_ERROR: "Failed to update profile.",
    CHANGES_DISCARDED: "Changes discarded",
    PASSWORD_UPDATED_SUCCESS: "Password updated successfully!",
    LINK_EXPIRED_OR_INVALID: "Link expired or invalid",
    
} as const;


export const SEVERITY = {
    SUCCESS: "success",
    ERROR: "error",
} as const;