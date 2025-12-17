import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, updateDoc, getDoc, collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import * as XLSX from "xlsx";

const Admin = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [avisoAtivo, setAvisoAtivo] = useState(false);
  const [textoDatas, setTextoDatas] = useState("");
  const [msg, setMsg] = useState("");

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "configuracoes", "geral");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dados = docSnap.data();
          setAvisoAtivo(dados.mostrarAviso);
          setTextoDatas(dados.textoDatas || "");
        }
      }
    });
    return () => unsub();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (error) {
      setMsg("Erro ao logar: " + error.message);
    }
  };

  const salvarConfiguracao = async () => {
    try {
      await updateDoc(doc(db, "configuracoes", "geral"), {
        mostrarAviso: avisoAtivo,
        textoDatas: textoDatas,
      });
      setMsg("Configurações salvas com sucesso!");
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      setMsg("❌ Erro ao salvar");
    }
  };

  const baixarExcel = async () => {
    if (!dataInicio || !dataFim) {
      alert("Por favor, selecione a data de início e fim.");
      return;
    }

    setLoadingExcel(true);
    try {
      const start = new Date(dataInicio);
      start.setHours(0, 0, 0, 0);

      const end = new Date(dataFim);
      end.setHours(23, 59, 59, 999);

      const q = query(collection(db, "interessados"), where("data", ">=", start), where("data", "<=", end));

      const querySnapshot = await getDocs(q);

      const dadosParaExcel = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          Nome: data.nome,
          Telefone: data.telefone,
          Email: data.email,
          Data_Inscricao: data.data ? new Date(data.data.seconds * 1000).toLocaleString() : "Sem data",
        };
      });

      if (dadosParaExcel.length === 0) {
        alert("Nenhum inscrito encontrado neste período.");
        setLoadingExcel(false);
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(dadosParaExcel);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Inscritos");

      XLSX.writeFile(workbook, `Inscritos_${dataInicio}_ate_${dataFim}.xlsx`);
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar Excel: " + error.message);
    } finally {
      setLoadingExcel(false);
    }
  };

  if (!user) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "white" }}>
        <h2> Login Admin</h2>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "20px auto" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px" }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px" }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              background: "#f97316",
              border: "none",
              color: "white",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Entrar
          </button>
        </form>
        <p>{msg}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <h2>⚙️ Painel de Controle</h2>
        <button
          onClick={() => signOut(auth)}
          style={{
            background: "transparent",
            border: "1px solid #ef4444",
            color: "#ef4444",
            padding: "5px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "30px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h3 style={{ color: "#f97316", marginBottom: "20px" }}> Banner do Site</h3>

        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
          <label className="switch">
            <input type="checkbox" checked={avisoAtivo} onChange={(e) => setAvisoAtivo(e.target.checked)} />
            <span
              style={{
                marginLeft: "10px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: avisoAtivo ? "#4ade80" : "#ef4444",
              }}
            >
              {avisoAtivo ? "VISÍVEL NO SITE" : "OCULTO"}
            </span>
          </label>
        </div>

        <label style={{ display: "block", marginBottom: "10px" }}>Texto das Datas (Opcional):</label>
        <input
          type="text"
          placeholder="Ex: De 20/01 até 30/01"
          value={textoDatas}
          onChange={(e) => setTextoDatas(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "5px", border: "none" }}
        />

        <button
          onClick={salvarConfiguracao}
          style={{
            width: "100%",
            padding: "12px",
            background: "#f97316",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          SALVAR ALTERAÇÕES
        </button>
        {msg && <p style={{ marginTop: "10px", textAlign: "center", color: "#fbbf24" }}>{msg}</p>}
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          padding: "25px",
          borderRadius: "15px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h3 style={{ color: "#22c55e", marginBottom: "20px" }}>Exportar Inscritos </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Data Início:</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Data Fim:</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            />
          </div>
        </div>

        <button
          onClick={baixarExcel}
          disabled={loadingExcel}
          style={{
            width: "100%",
            padding: "12px",
            background: loadingExcel ? "#64748b" : "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loadingExcel ? "Gerando planilha..." : "BAIXAR PLANILHA AGORA"}
        </button>
      </div>
    </div>
  );
};

export default Admin;
