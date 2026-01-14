export const MESSAGES = {
    COUNTRY_CREATED_SUCCESS: "Country created successfully.",
    COUNTRY_CREATED_ERROR: "Failed to create country.",
    COUNTRY_UPDATED_SUCCESS: "Country updated successfully.",
    COUNTRY_UPDATED_ERROR: "Failed to update country.",
    COUNTRY_DELETED_SUCCESS: "Country deleted successfully.",
    COUNTRY_DELETED_ERROR: "Failed to delete country.",
    COUNTRY_DELETE_CONFIRM: "Are you sure you want to delete this country?",
    FAILED_TO_FETCH_COUNTRIES: "Failed to fetch countries",
    COUNTRY_NOT_FOUND: "Country not found",


    DEFAULT_NAVBAR_TITLE: "Country Management System",

    USER_CREATED_SUCCESS: "User created successfully.",
    USER_CREATED_ERROR: "Failed to create user.",
    LOGIN_SUCCESS: "Login successful.",
    WRONG_CREDENTIALS: "Wrong username or password. Please try again.",
    PROFILE_UPDATED_SUCCESS: "Profile updated successfully.",
    PROFILE_UPDATED_ERROR: "Failed to update profile.",
    CHANGES_DISCARDED: "Changes discarded",
    USER_DELETED_SUCCESS: "User deleted successfully.",
    USER_DELETED_ERROR: "Failed to delete user.",
    USER_DELETE_CONFIRM: "Are you sure you want to delete this user?",
    USER_NOT_DELETED: "User was not deleted.",
    USER_NOT_UPDATED: "User not updated.",

    PASSWORD_UPDATED_SUCCESS: "Password updated successfully!",
    LINK_EXPIRED_OR_INVALID: "Link expired or invalid",

    CITY_CREATED_SUCCESS: "City created successfully.",
    CITY_CREATED_ERROR: "Failed to create city.",
    CITY_UPDATED_SUCCESS: "City updated successfully.",
    CITY_UPDATED_ERROR: "Failed to update city.",
    CITY_DELETED_SUCCESS: "City deleted successfully.",
    CITY_DELETED_ERROR: "Failed to delete city.",
    CITY_DELETE_CONFIRM: "Are you sure you want to delete this city?",

    FORGOT_PASSWORD_SUCCESS: "If the email exists in our system, a reset link has been sent",
    FORGOT_PASSWORD_ERROR: "Failed to send reset email"
    
} as const;


export const SEVERITY = {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info",
} as const;