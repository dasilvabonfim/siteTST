import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-glass">
      <div className="footer-content">
        <div className="footer-info">
          <h3>Venha nos visitar</h3>
          <p className="footer-desc">
            Faça sua matrícula presencialmente na secretaria do colégio. Estamos prontos para te receber.
          </p>

          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <strong>Colégio Estadual de Campo Mourão</strong>
              <p>Av. Guilherme de Paula Xavier 795, Centro</p>
            </div>
          </div>

          <div className="contact-item">
            <FaWhatsapp className="icon" />
            <div>
              <strong>Dúvidas?</strong>
              <p>(44) 9927-8477</p>
            </div>
          </div>

          <div className="contact-item">
            <FaEnvelope className="icon" />
            <div>
              <strong>E-mail</strong>
              <p>col.estadual@gmail.comr</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        © {new Date().getFullYear()} Curso Técnico em Segurança do Trabalho - Campo Mourão
      </div>
    </footer>
  );
};

export default Footer;
