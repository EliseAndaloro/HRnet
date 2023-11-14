import React from "react";
import "./form.css";
import { useState } from "react";
import { states } from "../../data/states";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useDispatch } from "react-redux";
import {
    unvalidForm,
    validForm,
    checkValidForm,
    submitForm,
} from "../../redux/actions";
import Modal from "../modal/Modal";
//import { Modal } from "simple-modal-hrnet";


/**
 * Départements disponibles.
 * @type {Array.<string>}
 */
const departments = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
];

/**
 * Etats filtrés.
 * @type {any[]}
 *
 */
let tabStatesFilter = [];

/**
 * Récupère les noms des États à partir d'une liste d'états.
 * @param {Array.<Object>} states - Liste d'objets représentant les États.
 * @return {Array.<string>} - Tableau contenant les noms des États.
 */
const getStatesNames = (states) => {
    states.map((state) => tabStatesFilter.push(state.name));
    return tabStatesFilter;
};

/**
 * Tableau contenant les noms des États.
 * @type {Array.<string>}
 */
const statesNames = getStatesNames(states);

/**
 *
 * Cette fonction prend en entrée une date et la formate au format "MM/JJ/AAAA".
 * @param {string} date - La date à formater au format "AAAA-MM-JJ".
 * @throws {Error} Lance une erreur si la date en entrée n'est pas valide.
 * @returns {string} La date formatée au format "MM/JJ/AAAA".
 */
function formatDate(date) {
    const dateNew = new Date(date);
    const dateISO = dateNew.toISOString().split("T")[0];
    const [year, month, day] = dateISO.split(".");

    return [day, month, year].join("");
}

let employee = [];

/**
 * Composant représentant un formulaire pour ajouter un employé
 * @returns {JSX.Element} Retourne le formulaire d'ajout d'employé
 *
 */
function Form() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [department, setDepartment] = useState("");
    const dispatch = useDispatch();

    //Erreurs
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [birthDateError, setBirthDateError] = useState("");
    const [startDateError, setStartDateError] = useState("");
    const [streetError, setStreetError] = useState("");
    const [cityError, setCityError] = useState("");
    const [stateError, setStateError] = useState("");
    const [zipCodeError, setZipCodeError] = useState("");
    const [departmentError, setDepartmentError] = useState("");

    const [modal, setModal] = useState(false);

    /**
     * Validation formulaire et affichage des erreurs.
     * @returns {boolean} Retourne true si erreurs, sinon false.
     **/
    const validateForm = () => {
        let isError = false;
        if (!firstName) {
            setFirstNameError("Provide a firstname.");
            isError = true;
        } else {
            setFirstNameError("");
        }
        if (!lastName) {
            setLastNameError("Provide a lastname.");
            isError = true;
        } else {
            setLastNameError("");
        }
        if (!birthDate) {
            setBirthDateError("Select a date of birth.");
            isError = true;
        } else {
            const now = new Date();
            if (birthDate > now) {
                setBirthDateError("The birth date cannot be a futur date.");
                isError = true;
            } else {
                const ageDiffMs = now.getTime() - birthDate.getTime();
                const ageDate = new Date(ageDiffMs);
                const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                if (age < 18) {
                    setBirthDateError("You must be of legal age.");
                    isError = true;
                } else {
                    setBirthDateError("");
                }
            }
        }
        if (!startDate) {
            setStartDateError("Select a start date.");
            isError = true;
        } else {
            const ageDiffMs = startDate.getTime() - birthDate.getTime();
            const ageDate = new Date(ageDiffMs);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
            console.log(age);
            if (age < 18) {
                setStartDateError("You must be of legal age.");
                isError = true;
            } else if (startDate.getTime() === birthDate.getTime()) {
                setStartDateError("Start date and borth date cannot be the same.");
                isError = true;
            } else {
                setStartDateError("");
            }
        }
        if (!street) {
            setStreetError("Provide a street.");
            isError = true;
        } else {
            setStreetError("");
        }
        if (!city) {
            setCityError("Provide a city.");
            isError = true;
        } else {
            setCityError("");
        }
        if (!state) {
            setStateError("Provide a country.");
            isError = true;
        } else {
            setStateError("");
        }
        if (!zipCode) {
            setZipCodeError("Provide a ZIP code.");
            isError = true;
        } else {
            setZipCodeError("");
        }
        if (!department) {
            setDepartmentError("Provide a department.");
            isError = true;
        } else {
            setDepartmentError("");
        }

        return isError;
    };

    employee = {
        first: firstName.toLocaleLowerCase(),
        last: lastName.toLocaleLowerCase(),
        birth: formatDate(birthDate),
        start: formatDate(startDate),
        street: street.toLocaleLowerCase(),
        city: city.toLocaleLowerCase(),
        state: state.label,
        code: zipCode,
        department: department.label,
    };

    /**
     * Vérifie les champs d'un formulaire et envoie une action Redux en fonction de la validité du formulaire.
     */
    const checkForm = () => {
        if (
            firstName === "" ||
            lastName === "" ||
            street === "" ||
            city === "" ||
            state === "" ||
            zipCode === "" ||
            department === "" ||
            birthDate === new Date() ||
            startDate === new Date() ||
            birthDate.getFullYear() >= new Date().getFullYear() - 15
        ) {
            dispatch(unvalidForm());
        } else {
            dispatch(validForm());
        }
    };

    /**
     * Enregistre un employé en soumettant le formulaire.
     * @param {Event} e - L'événement de soumission du formulaire.
     * @returns {Promise<void>} Une promesse résolue une fois que l'enregistrement de l'employé est terminé.
     */
    const saveEmployee = async (e) => {
        e.preventDefault();
        const isError = validateForm();
        checkForm();
        if (!isError) {
            const submit = dispatch(checkValidForm());
            if (submit) {
                dispatch(submitForm(employee));
                setModal(true);
            }
        }
    };

    /**
     * Fermeture de la modal et réinitialisation du formulaire
     * @function
     * @return {void}
     */
    const resetForm = () => {
        document.getElementById("formulaire").reset();
        setModal(false);
        setFirstName("");
        setLastName("");
        setCity("");
        setBirthDate(new Date());
        setStartDate(new Date());
        setDepartment("");
        setState("");
    }

    /**
     * Le prénom doit être composé de lettres.
     * @param {Event} e - L'événement de changement.
     * @returns {void}
     */
    const handleChangeFirstName = (e) => {
        const value = e.target.value;
        const alphaRegex = /^[a-zA-Z]*$/;

        if (alphaRegex.test(value)) {
            setFirstName(value);
        }
    };

    /**
     * Le nom doit être composé de lettres.
     * @param {Event} e - L'événement de changement.
     * @returns {void}
     */
    const handleChangeLastName = (e) => {
        const value = e.target.value;
        const alphaRegex = /^[a-zA-Z]*$/;

        if (alphaRegex.test(value)) {
            setLastName(value);
        }
    };

    /**
     * La ville doit être composé de lettres.
     * @param {Event} e - L'événement de changement.
     * @returns {void}
     */
    const handleChangeCity = (e) => {
        const value = e.target.value;
        const alphaRegex = /^[a-zA-Z]*$/;

        if (alphaRegex.test(value)) {
            setCity(value);
        }
    };

    return (
        <>
            <form id="formulaire">
                <section className="employee">
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first"
                        name="first"
                        maxLength={50}
                        value={firstName}
                        onChange={handleChangeFirstName}
                    />
                    {firstNameError && <p className="error-message">{firstNameError}</p>}

                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last"
                        name="last"
                        maxLength={50}
                        value={lastName}
                        onChange={handleChangeLastName}
                    />
                    {lastNameError && <p className="error-message">{lastNameError}</p>}

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <DatePicker
                        name="birth"
                        selected={birthDate}
                        onChange={setBirthDate}
                        value={birthDate}
                    />
                    {birthDateError && <p className="error-message">{birthDateError}</p>}

                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker
                        name="start"
                        selected={startDate}
                        onChange={setStartDate}
                        value={startDate}
                    />
                    {startDateError && <p className="error-message">{startDateError}</p>}
                </section>

                <section className="adresse">
                    <label htmlFor="street">Street</label>
                    <input
                        id="street"
                        type="text"
                        name="street"
                        maxLength={50}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    {streetError && <p className="error-message">{streetError}</p>}

                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        type="text"
                        name="city"
                        maxLength={50}
                        value={city}
                        onChange={handleChangeCity}
                    />
                    {cityError && <p className="error-message">{cityError}</p>}

                    <label htmlFor="state">State</label>
                    <Dropdown
                        placeholder="Select an option"
                        name="stateList"
                        options={statesNames}
                        onChange={setState}
                        value={state}
                    />
                    {stateError && <p className="error-message">{stateError}</p>}

                    <label htmlFor="zip-code">Zip Code</label>
                    <input
                        id="zip-code"
                        type="number"
                        name="code"
                        maxLength={10}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                    {zipCodeError && <p className="error-message">{zipCodeError}</p>}

                    <Dropdown
                        placeholder="Departments"
                        name="departments"
                        options={departments}
                        onChange={setDepartment}
                        value={department}
                    />
                    {departmentError && (
                        <p className="error-message">{departmentError}</p>
                    )}
                </section>
            </form>
            {/**
             * Composant qui affiche un bouton "Sauvegarder" et un Modal en fonction de l'état de la variable 'modal'
             * @component
             * @param {Function} saveEmployee - Fonction qui sera exécutée lors du clic sur le bouton 'Save'
             * @param {Boolean} modal - Booléen qui indique si le Modal doit être affiché ou non
             * @param {Function} resetFormCloseModal - Fonction qui remet à zéro le formulaire et ferme le Modal
             * @returns {JSX.Element} Composant react qui affiche un bouton "Sauvegarder" et un Modal
             */}
            <div className="button-save">
                <button className="button_btn" onClick={saveEmployee}>
                    {" "}
                    Save{" "}
                </button>
                {modal && (
                    <Modal
                        message={"employee created"}
                        closeModal={resetForm}
                    />
                )}
            </div>
        </>
    );
}

export default Form;
