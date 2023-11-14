import React from "react";
import "./modal.css";

/**
 * Composant Modal qui affiche une fenêtre modale avec un message et un bouton de fermeture.
 * @param {object} props - Les propriétés du composant.
 * @param {function} props.closeModal - Fonction qui ferme la fenêtre modale.
 * @param {string} props.message - Message à afficher dans la fenêtre modale.
 * @returns {JSX.Element} Composant Modal
 *
 */
function Modal({ closeModal, message }) {
    return (
        <>
            <div className="modal-body">
                <div className="modal-wrapper">
                    <div className="modal">
                        <button
                            type="button"
                            className="modal-close-button"
                            onClick={() => closeModal(false)}
                        >
                            {" "}
                            X{" "}
                        </button>

                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
