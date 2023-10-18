import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {Object} EmployeeData - Les données d'un employé
 * @property {Array<Object>} data - Les données de l'employé
 * @property {boolean} isValidForm - Indique si le formulaire de l'employé est valide ou non
 */

/**
 * @typedef {Object} FormState - L'état du formulaire des employés
 * @property {Array<EmployeeData>} dataEmployee - Les données de tous les employés
 * @property {boolean} isValidForm - Indique si le formulaire est valide ou non
 */

/**
 * Les actions du formulaire des employés
 * @namespace
 * @property {Function} setFormValid - Formulaire valide
 * @property {Function} setFormInvalid - Formulaire invalide
 * @property {Function} setFormSubmit - Envoie les données du formulaire
 * @property {Function} addEmployee - Ajoute un nouvel employé
 */

/**
 * Crée un slice Redux pour le formulaire des employés
 *
 * @function
 * @returns {Object} - L'objet contenant les actions et le reducer du slice
 */

const { actions, reducer } = createSlice({
    name: "form",
    initialState: {
        dataEmployee: [],
        isValidForm: false,
    },
    reducers: {
        /**
         * Formulaire valide
         *
         * @param {Object} state - L'état courant du slice
         */
        setFormValid: (state) => {
            state.isValidForm = true;
        },
        /**
         * Formulaire invalide
         *
         * @param {Object} state - L'état courant du slice
         */
        setFormInvalid: (state) => {
            state.isValidForm = false;
        },
        /**
         * Envoie les données du formulaire
         *
         * @param {Object} state - L'état courant du slice
         * @param {Object} action - L'action envoyée
         */
        setFormSubmit: (state, action) => {
            state.dataEmployee = action.payload;
        },
        /**
         * Ajoute un nouvel employé
         *
         * @param {Object} state - L'état courant du slice
         * @param {Object} action - L'action envoyée
         */
        addEmployee: {
            
            /**
             * Prépare les données à envoyer pour l'ajout d'un nouvel employé
             *
             * @param {Array<EmployeeData>} data - Les données des employés
             * @param {EmployeeData} newEmployee - Les données du nouvel employé à ajouter
             * @returns {Object} - Les données préparées pour l'action
             */
            prepare: (data, newEmployee) => ({ payload: { data, newEmployee } }),

            /**
             * Réduit les données pour ajouter un nouvel employé
             *
             * @param {Object} state - L'état courant du slice
             * @param {Object} action - L'action envoyée
             */
            reducer: (state, action) => {
                state.dataEmployee = [
                    ...action.payload.data,
                    action.payload.newEmployee,
                ];
            },
        },
    },
});

export { actions };
export default reducer;
