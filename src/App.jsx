import React, { useState } from "react";
import foto1 from "../src/assets/foto1.jpeg";
import foto2 from "../src/assets/foto2.jpg";
import foto3 from "../src/assets/foto3.jpg";
import foto4 from "../src/assets/foto4.jpg";
import foto7 from "../src/assets/foto7.jpg";
import foto6 from "../src/assets/foto6.jpg";
import { FaInstagram } from 'react-icons/fa';

import Alunos from "./components/alunos";

const App = () => {

  const [exAlunos, setExalunos] = useState([
    {
      nome: "Amanda Almeida",
      foto: foto3,
      dataformacao: "2021",
      data: "2022",
      empresa: "Coamo",
    },
    {
      nome: "Patrick Maciel",
      foto: foto4,
      dataformacao: "2017",
      data: "2018",
      empresa: "Coamo",
    },
    {
      nome: "Lucineia Vedovoto",
      dataformacao: "2021",
      foto: foto7,
      data: "2022",
      empresa: "Santa Casa",
    },
    {
      nome: "Marcos Maioli",
      dataformacao: "2019",
      foto: foto6,
      data: "2020",
      empresa: "Mamoru - Soluções em Segurança do Trabalho",
    },
  ]);
  return (
    <>
      <div className="App">
        <div className="nav-bar">
        <a target="_blank" href="https://www.instagram.com/tst__cm?igsh=MXFpM3AyYW1jbXNzNA=="><FaInstagram size={36} color="#E4405F" style={{ marginRight: '20px', marginTop: '5px' }} /></a>
          <h1>Curso de Técnico em Segurança do Trabalho</h1>
        </div>
        <div className="content">
          <h1>Seja bem vindo!</h1>
          <p>
            O Colégio Estadual oferece gratuitamente o curso de Técnico em
            Segurança do Trabalho, uma profissão que as empresas sempre procuram
            profissionais qualificados, venha descobrir um pouco sobre a
            profissão.
          </p>
          <p classname="convite">
            Quer fazer parte de uma das profissões mais buscadas pelas empresas?
          </p>
        </div>
        <div className="info">
          <div className="texto1">
            <h1>O que faz um Técnico de Segurança do Trabalho?</h1>
            <p>
              O Técnico de Segurança do Trabalho desempenha um papel fundamental
              na promoção de ambientes de trabalho seguros e saudáveis. Suas
              responsabilidades incluem a identificação, avaliação e controle de
              riscos ambientais e ocupacionais nos locais de trabalho. Para
              isso, ele realiza inspeções regulares, investiga acidentes e
              incidentes, e implementa medidas preventivas para garantir a
              segurança dos trabalhadores.
            </p>
          </div>
          <img src={foto1} alt="" />
        </div>
        <div className="info">
          <img src={foto2} alt="" />
          <div className="texto2">
            <h1>Existe mercado para essa profissão?</h1>
            <p>
              O mercado para Técnico em Segurança do Trabalho está em alta e com
              boas perspectivas de crescimento.Empresas da construção civil e
              indústrias em geral (como as alimentícias, navais,
              automobilísticas e farmacêuticas) são áreas que buscam esse
              profissional. A demanda por Técnicos em Segurança do Trabalho
              deverá crescer 20% até 2025 tendo mais de 25 mil vagas abertas por
              todo o brasil. Veja você mesmo{" "}
              <a target="_blank "href="https://encurtador.com.br/0nv31">aqui</a>
            </p>
          </div>
        </div>
        <div className="ex-alunos">
          <h1>Profissionais na área que se formaram conosco</h1>
        </div>
        <Alunos slides={exAlunos} />
        <h1 className="perguntas-titulo">Perguntas frequentes</h1>
        <div className="perguntas">
          <div className="pergunta">
            <h3>Qual a duração do curso?</h3>
            <p>O curso tem duração de 3 semestres, ou seja 1 ano e meio.</p>
          </div>
          <div className="pergunta">
            <h3>Qual a carga horária?</h3>
            <p>
              A carga horária total é de 1200 horas. Aula de segunda a sexta-feira presencial no período noturno, com objetivo de atender a comunidade escolar.
            </p>
          </div>
          <div className="pergunta">
            <h3>É preciso alguma formação para iniciar o curso?</h3>
            <p>
              É necessário ter concluído o ensino médio e 18 anos ou mais para ingressar no curso.
            </p>
          </div>
          <div className="pergunta">
            <h3>
              Qual a média salarial de um Técnico em Segurança do Trabalho?
            </h3>
            <p>
              A média salarial de um técnico em segurança do trabalho varia
              bastante de acordo com a região e o setor de atuação. No entanto,
              a média salarial nacional é de R$ 2.500,00 a R$ 4.000,00.
            </p>
          </div>
          <div className="pergunta">
            <h3>Qual a modalidade do curso, é online?</h3>
            <p>Não, durante o curso as aulas serão integralmente presencial, das 18:45 ate as 23h.</p>
          </div>
          <div className="pergunta">
            <h3>Como me inscrever?</h3>
            <p>
              Novas turmas são abertas todo semestre, fique atento no instagram
              para não perder o período de inscrição, você poderá fazer a
              inscrição diretamente na secretária do Colégio Estadual de Campo
              Mourão. Em caso de dúvida entre em contato pelo instagram.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
