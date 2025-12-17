import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import "./aviso.css";

const AvisoTopo = () => {
  const [config, setConfig] = useState({ visivel: false, textoDatas: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "configuracoes", "geral"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const dados = docSnapshot.data();
        setConfig({
          visivel: dados.mostrarAviso,
          textoDatas: dados.textoDatas || "",
        });
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null;

  return (
    <AnimatePresence>
      {config.visivel && (
        <motion.div
          className="aviso-wrapper"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="electric-card">
            <div className="electric-content">
              <span className="gradient-text">⚠️ INSCRIÇÕES ABERTAS {new Date().getFullYear()}</span>
              <p>
                {config.textoDatas && (
                  <span style={{ color: "#fbbf24", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                    📅 {config.textoDatas}
                  </span>
                )}
                Garanta seu futuro agora mesmo.
              </p>
              <span className="clique-aqui"> Role para baixo e inscreva-se</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvisoTopo;
