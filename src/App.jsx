import React, { useState, useEffect } from "react";

import Aurora from "./components/Aurora";
import NavBar from "./components/NavBar";
import ProfileCard from "./components/ProfileCard";
import FAQ from "./components/FAQ";
import Grade from "./components/Grade";
import Chart from "./components/Chart";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import Aviso from "./components/Aviso";
import SubscriptionModal from "./components/SubscriptionModal";
import { AnimatePresence } from "framer-motion";
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

import foto1 from "../src/assets/foto1.jpeg";
import foto2 from "../src/assets/foto2.jpg";
import foto3 from "../src/assets/foto3.jpg";
import foto4 from "../src/assets/foto4.jpg";
import foto7 from "../src/assets/foto7.jpg";
import foto6 from "../src/assets/foto6.jpg";

const EX_ALUNOS = [
  { nome: "Amanda Almeida", foto: foto3, dataformacao: "2021", data: "2022", empresa: "Coamo" },
  { nome: "Patrick Maciel", foto: foto4, dataformacao: "2017", data: "2018", empresa: "Coamo" },
  { nome: "Lucineia Vedovoto", foto: foto7, dataformacao: "2021", data: "2022", empresa: "Santa Casa" },
  { nome: "Marcos Maioli", foto: foto6, dataformacao: "2019", data: "2020", empresa: "Mamoru Soluções" },
];

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const isAdmin = window.location.search.includes("p=admin");

  useEffect(() => {
    logEvent(analytics, "page_view");
  }, []);
  if (isAdmin) {
    return (
      <div className="App" style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
        <Admin />
      </div>
    );
  }

  return (
    <div className="App">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <Aurora colorStops={["#000000", "#1a202c", "#0f172a"]} speed={0.5} />
      </div>

      <NavBar />

      <Aviso />

      <div className="main-wrapper">
        <section className="hero">
          <h1>Técnico em Segurança do Trabalho</h1>
          <p>
            Uma das profissões que mais crescem no Brasil. Curso gratuito, presencial e de alta qualidade no Colégio
            Estadual.
          </p>
          <button className="cta-button" onClick={() => setShowModal(true)}>
            Quero me inscrever
          </button>
        </section>

        <AnimatePresence>{showModal && <SubscriptionModal onClose={() => setShowModal(false)} />}</AnimatePresence>

        <section id="sobre" className="section-container glass-card">
          <div className="info-text">
            <h2 className="info-title">O Guardião da Vida</h2>
            <p>
              Mais do que fiscalizar regras, o Técnico de Segurança é o agente da mudança que protege o ativo mais
              valioso de qualquer empresa: a vida humana. Sua missão é antecipar perigos, educar equipes e construir uma
              cultura onde a segurança é inegociável, garantindo que cada trabalhador retorne bem para sua família.
            </p>
          </div>
          <img src={foto1} alt="Técnico trabalhando" className="info-img" />
        </section>

        <section className="section-container glass-card inverted">
          <div className="info-text">
            <h2 className="info-title">Mercado em Alta e Disputado</h2>
            <p>
              O Brasil vive um "apagão" de mão de obra qualificada nesta área. A retomada industrial e as novas
              exigências legais criaram uma disputa acirrada por bons técnicos. A previsão é de um crescimento de 20%
              nas vagas até 2026, com oportunidades sobrando na indústria, construção civil, hospitais e agronegócio.
            </p>
          </div>
          <img src={foto2} alt="Obra segura" className="info-img" />
        </section>

        <section className="section-container glass-card">
          <div className="info-text">
            <h2 className="info-title">Empregabilidade Recorde</h2>
            <p>
              Enquanto outras áreas sofrem com crises, a Segurança do Trabalho não para.
              <strong> Por quê?</strong> Porque é lei. Toda empresa média ou grande é obrigada a ter esse profissional.
            </p>

            <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
              Isso gera um volume massivo de contratações todos os anos, garantindo que você tenha opções de sobra no
              mercado de trabalho.
            </p>

            <div className="destaque-box">
              <p>
                <strong>Fato:</strong> Segundo o CAGED, foram mais de
                <strong> 170.000 contratações</strong> formais apenas no último ano.
              </p>
            </div>
          </div>

          <div className="info-img" style={{ height: "320px", background: "rgba(0,0,0,0.2)", padding: "10px" }}>
            <Chart />
          </div>
        </section>

        <section id="grade">
          <Grade />
        </section>

        <section id="alunos" className="alunos-section">
          <h2 className="alunos-title">Quem se formou aqui?</h2>
          <div className="alunos-grid">
            {EX_ALUNOS.map((aluno, index) => (
              <ProfileCard key={index} aluno={aluno} />
            ))}
          </div>
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <section id="contato">
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default App;
