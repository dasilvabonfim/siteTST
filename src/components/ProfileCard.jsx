import React from "react";
import { FaBuilding, FaGraduationCap, FaCalendarAlt } from "react-icons/fa";
import "./profilecard.css";

const ProfileCard = ({ aluno }) => {
  return (
    <div className="aluno-card">
      <div className="foto-container">
        <img src={aluno.foto} alt={aluno.nome} className="aluno-foto" />
      </div>

      <div className="card-content">
        <h3 className="aluno-nome">{aluno.nome}</h3>

        <div className="info-row highlight">
          <FaGraduationCap className="icon" />
          <span>Formado em {aluno.dataformacao}</span>
        </div>

        <div className="divider"></div>

        <div className="info-row">
          <FaBuilding className="icon" />
          <p>
            <strong>{aluno.empresa}</strong>
          </p>
        </div>

        <div className="info-row small">
          <FaCalendarAlt className="icon" />
          <p>Desde {aluno.data}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
