import React from "react";
import "./alunos.css";

const Alunos = ({ slides }) => {
  return (
    <div className="exalunos">
      {slides.map((slide, index) => (
        <div key={index} className="aluno">
          <div className="foto">
            <img src={slide.foto} alt={slide.nome} />
          </div>
          <div className="nome">
            <h3>{slide.nome}</h3>
            <p><u>Formação concluida em {slide.dataformacao}</u></p>
            <p>Local de trabalho: {slide.empresa} (desde {slide.data})</p>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Alunos;
