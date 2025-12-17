import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./faq.css";

const FAQ_DATA = [
  {
    pergunta: "Qual a duração e carga horária do curso?",
    resposta:
      "O curso tem duração de 3 semestres (1 ano e meio) com carga horária total de 1200 horas. As aulas acontecem de segunda a sexta-feira no período noturno (18:45 às 23:00).",
  },
  {
    pergunta: "Quem pode se inscrever? ",
    resposta:
      "Para ingressar, é necessário ter concluído o Ensino Médio e ter 18 anos completos ou mais no ato da matrícula.",
  },
  {
    pergunta: "Qual a média salarial da área?",
    resposta:
      "O mercado é muito promissor! A média salarial nacional varia entre R$ 2.500,00 e R$ 4.000,00, podendo ser maior dependendo da região e do porte da empresa (como indústrias petroquímicas e construção civil).",
  },
  {
    pergunta: "O curso é online ou presencial?",
    resposta:
      "O curso é 100% presencial. Acreditamos que a vivência prática e o contato direto com professores e equipamentos são essenciais para formar um bom Técnico em Segurança.",
  },
  {
    pergunta: "Como e onde faço minha matrícula?",
    resposta:
      "As turmas abrem semestralmente. A inscrição deve ser feita presencialmente na secretaria do Colégio Estadual de Campo Mourão. Fique atento ao nosso Instagram para as datas exatas!",
  },
  {
    pergunta: "O curso tem algum custo?",
    resposta: "Não! O curso é ofertado pelo Colégio Estadual e é totalmente gratuito para a comunidade.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Dúvidas Frequentes</h2>
      <div className="faq-grid">
        {FAQ_DATA.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.pergunta}</span>
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="faq-answer">{item.resposta}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
