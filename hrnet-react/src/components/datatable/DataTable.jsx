import React from "react";
import DataTable from "react-data-table-component";
import "./dataTable.css";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectEmployees } from "../../redux/selector";

/**
 * Création des colonnes du tableau avec les noms des colonnes et les valeurs correspondantes pour chaque employé
 */
const columns = [
    {
        name: "First Name",
        selector: (row) => row.first,
        sortable: true,
        filterable: true,
        reorder: true,
    },
    {
        name: "Last Name",
        selector: (row) => row.last,
        sortable: true,
        filterable: true,
        reorder: true,
    },
    {
        name: "Date of Birth",
        selector: (row) => row.birth,
        sortable: true,
        filterable: true,
        reorder: true,
    },
    {
        name: "Start Date",
        selector: (row) => row.start,
        sortable: true,
        filterable: true,
        reorder: true,
    },
    {
        name: "Street",
        selector: (row) => row.street,
        sortable: true,
        filterable: true,
        reorder: true,
    },
    {
        name: "City",
        selector: (row) => row.city,
        sortable: true,
        filterable: true,
        reorder: true,
    },
    {
        name: "State",
        selector: (row) => row.state,
        sortable: true,
        filterable: true,
        reorder: true,
    },
    {
        name: "Zip Code",
        selector: (row) => row.code,
        sortable: true,
        filterable: true,
        reorder: true,
    },
    {
        name: "Department",
        selector: (row) => row.department,
        sortable: true,
        filterable: true,
        reorder: true,
    },
];

/**
 * Les données des employés stockées dans un tableau
 */
const data = [
  {
    id: 1,
    first: "Elise",
    last: "Andaloro",
    birth: "27/09/1995",
    start: "01/01/2020",
    street: "Paradise",
    city: "Paris",
    state: "France",
    code: "75006",
    department: "Engineering",
  },
  {
    id: 2,
    first: "John",
    last: "Doe",
    birth: "06/07/1946",
    start: "01/01/2001",
    street: "Hell",
    city: "Texas",
    state: "Etat-Uni",
    code: "77573",
    department: "Marketing",
  },
  {
    id: 3,
    first: "Lydia",
    last: "Darling",
    birth: "14/04/1980",
    start: "24/04/2014",
    street: "Méta",
    city: "Mexico",
    state: "Mexique",
    code: "00000",
    department: "Sales",
  },
];

/**
 *
 * Composant de filtre pour la recherche d'employés.
 * @param {string} filterText - Le texte de recherche actuel.
 * @param {function} onFilter - Fonction de rappel pour la mise à jour du filtre.
 * @param {function} onClear - Fonction de rappel pour effacer le filtre.
 * @returns {JSX.Element} - Composant de filtre de recherche.
 *
 */
const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <input
            id="search"
            type="text"
            placeholder="Search"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <button type="button" onClick={onClear}>
            X
        </button>
    </>
);

/**
 * Composant pour afficher la liste d'employés et les fonctionnalités de recherche.
 * @returns {JSX.Element} - Composant de liste d'employés.
 *
 */
function DataList() {
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const employees = useSelector(selectEmployees).dataEmployee;
    console.log(employees);

    const filteredItems = employees.filter(
        (data) =>
            data.first.toLowerCase().includes(filterText.toLowerCase()) ||
            data.last.toLowerCase().includes(filterText.toLowerCase()) ||
            data.start.toLowerCase().includes(filterText.toLowerCase()) ||
            data.department.toLowerCase().includes(filterText.toLowerCase()) ||
            data.birth.toLowerCase().includes(filterText.toLowerCase()) ||
            data.street.toLowerCase().includes(filterText.toLowerCase()) ||
            data.city.toLowerCase().includes(filterText.toLowerCase()) ||
            data.state.toLowerCase().includes(filterText.toLowerCase()) ||
            data.code.toLowerCase().includes(filterText.toLowerCase())
    );

    /**
     * Composant de filtre de recherche avec la fonction de gestion pour effacer le filtre.
     * @returns {JSX.Element} - Composant de filtre de recherche.
     *
     */
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
        />
    );
}

export default DataList;
