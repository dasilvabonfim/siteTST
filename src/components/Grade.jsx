import React from "react";
import { FaFireExtinguisher, FaBriefcaseMedical, FaHardHat, FaGavel, FaLeaf, FaUserShield } from "react-icons/fa";
import "./grade.css";
const MATERIAS = [
  {
    icone: <FaFireExtinguisher />,
    titulo: "Prevenção e Combate a Incêndios",
    desc: "Conceitos de prevenção contra incêndios, classificação dos tipos de fogo, métodos de combate a princípios de incêndio, uso adequado de extintores e procedimentos de abandono de área.",
  },
  {
    icone: <FaBriefcaseMedical />,
    titulo: "Primeiros Socorros",
    desc: "Noções de suporte básico de vida, atendimento inicial a vítimas, controle de hemorragias, imobilização e procedimentos em situações de emergência.",
  },
  {
    icone: <FaGavel />,
    titulo: "Legislação Aplicada e Normas Regulamentadoras",
    desc: "Fundamentos da legislação trabalhista aplicada à Segurança e Saúde no Trabalho, estudo das Normas Regulamentadoras e responsabilidades legais do empregador e do trabalhador.",
  },
  {
    icone: <FaHardHat />,
    titulo: "Higiene Ocupacional",
    desc: "Reconhecimento, avaliação e controle dos agentes físicos, químicos e biológicos conforme diretrizes das NRs e boas práticas de higiene ocupacional.",
  },
  {
    icone: <FaLeaf />,
    titulo: "Gestão Ambiental",
    desc: "Princípios de gestão ambiental, controle de aspectos e impactos ambientais, gerenciamento de resíduos sólidos e práticas de sustentabilidade no ambiente de trabalho.",
  },
  {
    icone: <FaUserShield />,
    titulo: "Gestão de Riscos Ocupacionais",
    desc: "Identificação de perigos e avaliação de riscos ocupacionais, elaboração e implementação do Programa de Gerenciamento de Riscos e aplicação da Análise Preliminar de Riscos.",
  },
];

const Grade = () => {
  return (
    <div className="grade-container">
      <h2 className="section-title">O que você vai dominar</h2>
      <p className="section-subtitle">Uma formação completa teórica e prática</p>

      <div className="grade-grid">
        {MATERIAS.map((item, index) => (
          <div key={index} className="grade-card">
            <div className="icon-box">{item.icone}</div>
            <h3>{item.titulo}</h3>
            <p className="grade-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grade;
