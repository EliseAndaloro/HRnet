import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

/**
 * Composant Home qui affiche la page d'accueil de l'application HRnet.
 * @returns {JSX.Element} Composant Home
 *
 */
const Home = () => {
    return (
        <main>
            <div className="home-header">
                <h2 className="home-title">Bienvenue sur la version React de HRnet</h2>
            </div>
            <div className="card">
                <Link to="/create_employees">
                    <button className="home-card-button">
                         Create employee
                    </button>
                </Link>
                <Link to="/employees">
                    <button className="home-card-button">
                        Current employees
                    </button>
                </Link>
            </div>
        </main>
    );
};

export default Home;
