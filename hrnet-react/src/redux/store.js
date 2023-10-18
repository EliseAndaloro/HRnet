import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./reducer";

/**
 * Crée un store Redux configuré avec le reducer des employés
 * @function
 * @returns {Object} - Le store Redux
 */
export default configureStore({
    reducer: {
        employees: employeesReducer,
    },
});
