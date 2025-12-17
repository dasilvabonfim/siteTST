import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import "./subscriptionmodal.css";

const SubscriptionModal = ({ onClose }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erroValidacao, setErroValidacao] = useState("");

  const handlePhoneChange = (e) => {
    let valor = e.target.value;

    valor = valor.replace(/\D/g, "");

    valor = valor.slice(0, 11);

    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");

    setTelefone(valor);
  };

  const validarFormulario = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErroValidacao("Por favor, digite um e-mail válido (ex: nome@gmail.com).");
      return false;
    }

    if (telefone.length < 14) {
      setErroValidacao("O telefone parece incompleto. Digite o DDD + Número.");
      return false;
    }

    setErroValidacao("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "interessados"), {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone: telefone,
        data: serverTimestamp(),
      });

      setSucesso(true);
      setNome("");
      setEmail("");
      setTelefone("");

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      alert("Erro ao enviar. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleBackgroundClick}
    >
      <motion.div
        className="modal-content glass-card"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {sucesso ? (
          <div className="sucesso-msg">
            <h3>Recebido!</h3>
            <p>Seus dados foram salvos com sucesso. Avisaremos você!</p>
          </div>
        ) : (
          <>
            <h2>Lista de Espera</h2>
            <p className="modal-desc">Garanta sua vaga! Preencha seus dados corretamente para entrarmos em contato.</p>
            {erroValidacao && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.2)",
                  color: "#fca5a5",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  border: "1px solid rgba(239, 68, 68, 0.5)",
                  fontSize: "0.9rem",
                }}
              >
                {erroValidacao}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome Completo</label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="João da Silva"
                />
              </div>

              <div className="form-group">
                <label>WhatsApp (com DDD)</label>
                <input
                  type="tel"
                  required
                  value={telefone}
                  onChange={handlePhoneChange}
                  placeholder="(44) 9999-9999"
                  maxLength="15"
                />
              </div>

              <div className="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="joao@exemplo.com"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Enviando..." : "Quero ser avisado!"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SubscriptionModal;
