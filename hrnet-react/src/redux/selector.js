/**
 * Sélectionne les employés à partir de l'état global de l'application
 * @function
 * @param {Object} state - L'état global de l'application
 * @returns {Object} - Les employés de l'état global de l'application
 */
export const selectEmployees = (state) => state.employees;
