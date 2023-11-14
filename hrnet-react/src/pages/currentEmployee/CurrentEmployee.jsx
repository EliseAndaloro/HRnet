import React from "react";
import DataTable from "../../components/datatable/DataTable";
import "./currentEmployee.css";

/**
 * Composant pour afficher la liste des employés actuels
 * @function
 * @returns {JSX.Element} - Le composant pour afficher la liste des employés actuels
 */
const CurrentEmployees = () => {
    return (
        <>
            <section className="enteteTable">
                <h2 className="title">Current Employees</h2>
                <DataTable />
            </section>
        </>
    );
};

export default CurrentEmployees;
